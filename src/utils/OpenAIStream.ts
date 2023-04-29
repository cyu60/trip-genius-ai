import {
    createParser,
    type ParsedEvent,
    type ReconnectInterval,
  } from "eventsource-parser";
  
  export type ChatGPTAgent = "user" | "system";
  
  export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
  }
  
  export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    stream: boolean;
    // temperature: number;
    // top_p: number;
    // frequency_penalty: number;
    // presence_penalty: number;
    // max_tokens: number;
    // n: number;
  }
  
  export async function OpenAIStream(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
  
    let counter = 0;
  
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  
    const stream = new ReadableStream({
      async start(controller) {
        // callback
        function onParse(event: ParsedEvent | ReconnectInterval) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (event.type === "event") {
            const data = event.data;
            // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const json = JSON.parse(data);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              const text: string = json.choices[0].delta?.content || "";
              if (counter < 2 && (text.match(/\n/) || []).length) {
                // this is a prefix character (i.e., "\n\n"), do nothing
                return;
              }
              const queue = encoder.encode(text);
              controller.enqueue(queue);
              counter++;
            } catch (e) {
              // maybe parse error
              controller.error(e);
            }
          }
        }
  
        // stream response (SSE) from OpenAI may be fragmented into multiple chunks
        // this ensures we properly read chunks and invoke an event for each SSE event stream
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const parser = createParser(onParse);
        // https://web.dev/streams/#asynchronous-iteration
        for await (const chunk of res.body as any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          parser.feed(decoder.decode(chunk));
        }
      },
    });
  
    return stream;
  }