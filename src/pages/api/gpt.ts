
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

// don't want it exposed??? -- can't make trpc call?

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  console.log(req)
// should have system prompt be hidden!!
  const { userInput, messages, systemPrompt } = (await req.json()) as {
    userInput?: string;
    messages?: ChatGPTMessage[];
    systemPrompt?: string;
  };

  // console.log("new req", userInput, messages, systemPrompt);
  //     const { prompt } = (await req.json()) as {
  //     prompt?: string;
  //   };

  if (!messages) {
    return new Response("Not messages in the request", { status: 400 });
  }
  if (!systemPrompt) {
    return new Response("Not system prompt in the request", { status: 400 });
  }
  if (!userInput) {
    return new Response("Not userInput in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-4",
    // model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: systemPrompt },
        ...messages,
        { role: "user", content: userInput },
    ],
    // messages: [{ role: "user", content: prompt }],
    stream: true,
    // temperature: 0.7,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // max_tokens: 200,
    // n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
