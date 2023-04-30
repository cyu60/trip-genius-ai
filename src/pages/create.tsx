import { type NextPage } from "next";
import Head from "next/head";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  type ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "../utils/OpenAIStream";
import { Sidebar } from "~/components/Sidebar";

// if (!process.env.NEXT_PUBLIC_OPEN_AI_API_KEY) {
//   throw new Error("Missing API key");
// }
// const configuration = new Configuration({
//   apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const initialQuestion: ChatCompletionRequestMessage = {
  role: "assistant",
  content: "Where would you like visit?",
};
const systemPrompt: ChatCompletionRequestMessage = {
  role: "system",
  content: `As a helpful assistant, your role is to suggest useful itinerary information to users planning trips. This involves providing recommendations for activities, attractions, and events that match the user's interests and preferences. You should be knowledgeable about a wide range of destinations and have an understanding of the best times of year to visit them, as well as any local customs or traditions that may be of interest to the user.
  In addition to suggesting itinerary ideas, you should also be able to provide practical information such as transportation options, weather forecasts, and hotel recommendations. You should be able to answer questions about visa requirements, travel restrictions, and any other logistical issues that may arise during the trip planning process`,
};

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<
    ChatCompletionRequestMessage[]
  >([initialQuestion]);
  const [assistantResponse, setAssistantResponse] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // console.log(userInput);
  }, [userInput]);
  return (
    <>
      <Head>
        <title>Trip Planner App</title>
        <meta name="description" content="Trip Planner" />
        <link rel="icon" href="" />
      </Head>
      <Sidebar>
        <main className="flex h-screen w-full flex-grow  flex-col-reverse items-center justify-end">
          {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "> */}
          {/* <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Plan your next awesome trip!
            </h1> */}
          <div className="min-h-full w-full max-w-xl divide-y-4 divide-white bg-white">
            {conversation.map((c, i) => (
              <ConversationBox conversation={c} key={i} />
            ))}
            {isLoading && (
              <ConversationBox
                // addUserInput={addUserInput}
                conversation={{
                  role: "assistant",
                  content:
                    assistantResponse === "" ? "Loading..." : assistantResponse,
                }}
                // imgSrc={agentImage}
                // agent={agentAI}
                // date={""}
              />
            )}
            <UserInputBox
              // assistantResponse={assistantResponse}
              setAssistantResponse={setAssistantResponse}
              userInput={userInput}
              setUserInput={setUserInput}
              conversation={conversation}
              setConversation={setConversation}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          {/* </div> */}
        </main>
      </Sidebar>
    </>
  );
};

const ConversationBox: React.FC<{
  conversation: ChatCompletionRequestMessage;
}> = ({ conversation }) => {
  return (
    <div className="flex gap-4 p-3">
      {/* profile pic */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
        <div>
          {conversation.role === "user" ? (
            <UserIcon></UserIcon>
          ) : (
            <AssistantIcon />
          )}
        </div>
      </div>
      <div className="">
        <p className="italic text-slate-600">{conversation.role}</p>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {conversation.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const UserInputBox: React.FC<{
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  // assistantResponse: string;
  setAssistantResponse: Dispatch<SetStateAction<string>>;
  conversation: ChatCompletionRequestMessage[];
  setConversation: Dispatch<SetStateAction<ChatCompletionRequestMessage[]>>;
}> = ({
  userInput,
  setUserInput,
  conversation,
  setConversation,
  setAssistantResponse,
  isLoading,
  setIsLoading,
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    const payload = {
      userInput: userInput,
      messages: conversation as ChatGPTMessage[],
      systemPrompt: systemPrompt.content,
    };
    setUserInput("");
    setConversation([
      ...conversation,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: payload.userInput,
      },
    ]);
    // console.log("payload", JSON.stringify(payload))
    // { role: "user", content: userInput },
    const response = await fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    //     userInput?: string;
    // messages?: ChatGPTMessage[];
    // systemPrompt?: string;

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let staticAssistantResponse = "";

    while (!done) {
      // Why do we need to use staticAssistantResponse?
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAssistantResponse((prev: string) => prev + chunkValue);
      staticAssistantResponse += chunkValue;
      // console.log(chunkValue, doneReading, assistantResponse);
      if (done) {
        // console.log("assistant response", assistantResponse, staticAssistantResponse, "done", done);
        // const convoLog: UserConvoLog = {
        //   ...userInputNoAI,
        //   assistantResponse: staticAssistantResponse,
        // };
        setConversation([
          ...conversation,
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: payload.userInput,
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: staticAssistantResponse,
          },
        ]);
        setAssistantResponse("");
        // void logUserInputMutation.mutateAsync({
        //   userConvo: convoLog,
        // });
      }
    }
    // const assistantResponseObj = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     systemPrompt,
    //     ...conversation,
    //     { role: "user", content: userInput },
    //   ],
    // });

    // const assistantResponse =
    //   assistantResponseObj?.data?.choices[0]?.message?.content || "";
    // console.log(userInput, assistantResponse, [
    //   ...conversation,
    //   { role: "user", content: userInput },
    //   { role: "assistant", content: assistantResponse },
    // ]);

    // setConversation([
    //   ...conversation,
    //   { role: "user", content: userInput },
    //   { role: "assistant", content: assistantResponse },
    // ]);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center ">
      {/* User Input */}
      <textarea
        className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        disabled={isLoading}
      ></textarea>

      <div className="m-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div onClick={() => void handleClick()}>
            <NextIcon></NextIcon>
          </div>
        )}
      </div>
    </div>
  );
};

const UserIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      // strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
};

const Spinner: React.FC = () => {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const NextIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      // strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

const AssistantIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      // strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>
  );
};

export default Home;
