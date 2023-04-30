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
import { TripDetails } from "~/components/TripDetails";
import { Trip, trips } from "~/assets/constants";

const dummyConversation: ChatCompletionRequestMessage[] = [
  { role: "user", content: "Hi, I'm planning a trip to Europe." },
  {
    role: "assistant",
    content:
      "Great! I can help with that. Where in Europe are you planning to go?",
  },
  {
    role: "user",
    content: "I'm thinking of visiting Paris, Rome, and Barcelona.",
  },
  {
    role: "assistant",
    content: "Sounds like a fantastic trip! When are you planning to go?",
  },
  {
    role: "user",
    content: "I'm planning to go in the summer, around August.",
  },
  {
    role: "assistant",
    content:
      "That's a popular time to visit Europe. How long will you be staying?",
  },
  {
    role: "user",
    content: "I'm planning to stay for three weeks.",
  },
  {
    role: "assistant",
    content:
      "Three weeks should give you enough time to explore these cities thoroughly. Do you need help with booking flights or accommodations?",
  },
  {
    role: "user",
    content:
      "Yes, I would appreciate some recommendations for affordable accommodations.",
  },
  {
    role: "assistant",
    content:
      "Sure! For Paris, you can consider staying in budget hotels like Ibis or Holiday Inn Express. In Rome, budget options like Hotel Artemide or Hotel Quirinale are good choices. And in Barcelona, you can check out Hotel Acta Antibes or Hotel Ronda House. Would you like me to help with booking?",
  },
  {
    role: "user",
    content:
      "Yes, please! Can you find me the best deals for flights from my location to these cities?",
  },
  {
    role: "assistant",
    content:
      "Sure! Can you please provide me with your current location and travel dates? I'll find the best flight options for you.",
  },
  // ... continue with more conversation messages
];

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
          <div className=" overflow-scroll-y w-full divide-y-4 divide-white bg-white pb-20">
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
            {/* <div className="pl-20">
              <TripDetails trip={trips[0] as Trip}></TripDetails>
            </div> */}
            <div className="p-10"></div>
            {/* <ConversationBox
                conversation={{
                  role: "system",
                  content: "",
                }}
              /> */}
          </div>
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
    <div className="">
      {/* <div className="group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]"> */}
      <div className="flex gap-4 p-3">
        {/* profile pic */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 p-6">
          <div>
            {conversation.role === "user" ? (
              <UserIcon></UserIcon>
            ) : (
              <AssistantIcon />
            )}
          </div>
        </div>
        <div className="">
          <p className="italic text-indigo-600">
            {conversation.role === "user" ? "You" : "AI trip planner"}
          </p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {conversation.content}
          </ReactMarkdown>
        </div>
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
  // const [rows, setRows] = useState(1);

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
      window.scrollTo(0, document.body.scrollHeight);
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
  function calculateRows(text: string, maxCharsPerRow: number) {
    const length = text.length + 1;

    const rows = Math.ceil(length / maxCharsPerRow);

    return rows < 6 ? rows : 6;
  }

  return (
    <div className="flex items-center">
      {/* User Input */}
      <div className="fixed bottom-0 left-0 w-full border-t bg-white pt-2 dark:border-white/20 md:border-t-0 md:border-transparent md:!bg-transparent">
        <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="relative flex w-full flex-grow flex-row rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
              <textarea
                rows={calculateRows(userInput, 110)}
                placeholder="Send a message."
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:outline-none dark:bg-transparent md:pl-0"
                // className="m-0 block w-full rounded-md border-0 bg-transparent p-0 pl-2 pr-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:pl-0"
                // className="m-0 block w-full rounded-md border-0 bg-transparent p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUserInput(e.target.value)}
                value={userInput}
                disabled={isLoading}
                onKeyDown={(event) => {
                  event.key == "Enter" && !event.shiftKey
                    ? void handleClick()
                    : null;
                  // event.key == "Enter" && event.shiftKey ? void handleClick() : null;
                  // console.log("event", event, event.key);
                }}
              ></textarea>

              {/* <textarea
                // tabindex="0"
                rows={calculateRows(userInput, 60)}
                placeholder="Send a message."
                className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 dark:bg-transparent md:pl-0"
              ></textarea>
              <button
                // disabled=""
                className="absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-gray-900 enabled:dark:hover:text-gray-400 dark:disabled:hover:bg-transparent md:bottom-2.5 md:right-2"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mr-1 h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button> */}
              <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500">
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
            {/* <div className="">
              <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2"></div>
            </div> */}
          </div>
        </form>
        <div className=" px-3 pb-3 pt-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pb-6 md:pt-3">
          <span>
            Travel Planner AI may produce inaccurate information about people,
            places, or facts.{" "}
          </span>
        </div>
      </div>
      {/* <textarea
        className="block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        disabled={isLoading}
        onKeyDown={(event) => {
          event.key == "Enter" && !event.shiftKey ? void handleClick() : null;
          // event.key == "Enter" && event.shiftKey ? void handleClick() : null;
          // console.log("event", event, event.key);
        }}
      ></textarea>

      <div className="m-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 p-6">
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
      */}
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
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
};

export default Home;
