import { ChatGPTMessage } from "~/utils/OpenAIStream";

const googleSearch = async (query: string) => {
  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    }&cx=${
      process.env.NEXT_PUBLIC_GOOGLE_CX as string
    }&q=${query}&searchType=image&num=1`
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.items[0].link;
};

export const replaceImageUrls = async (text: string) => {
  const pattern = /SEARCH_IMG\("(.+?)"\)/g;
  const matches = text.match(pattern);

  if (matches) {
    for (const match of matches) {
      const searchQuery = match.match(/SEARCH_IMG\("(.+?)"\)/)![1]!;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const imageUrl = await googleSearch(searchQuery);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      text = text.replace(match, `![${searchQuery}](${imageUrl})`);
    }
  }

  return text;
};

export const extractTrip = (text: string) => {
  const pattern = /CREATE_TRIP\("(.+?)"\)/g;
  const matches = text.match(pattern);

  if (matches) {
    for (const match of matches) {
      const trip = match.match(/CREATE_TRIP\("(.+?)"\)/)![1]!;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      console.log("trip info:",  JSON.parse(trip))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(trip);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const imageUrl = await googleSearch(searchQuery);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      // text = text.replace(match, `![${searchQuery}](${imageUrl})`);
    }
  }

  return text;
};

export const restoreImageUrls = (text: string) => {
  const pattern = /!\[(.+?)\]\((.+?)\)/g;
  const matches = text.match(pattern);

  if (matches) {
    for (const match of matches) {
      const searchQuery = match.match(/!\[(.+?)\]\((.+?)\)/)![1]!;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      text = text.replace(match, `SEARCH_IMG("${searchQuery}")`);
    }
  }

  return text;
};

// replaceImageUrls(
//   'Here are some images of popular attractions in Tokyo: 1. Shibuya Crossing: ![Shibuya Crossing](SEARCH_IMG("Shibuya Crossing")) 2. Tokyo Skytree: ![Tokyo Skytree](SEARCH_IMG("Tokyo Skytree")) 3. Meiji Shrine: ![Meiji Shrine](SEARCH_IMG("Meiji Shrine")) 4. Asakusa and Senso-ji Temple: ![Asakusa and Senso-ji Temple](SEARCH_IMG("Asakusa Senso-ji Temple")) 5. Odaiba: ![Odaiba](SEARCH_IMG("Odaiba Tokyo")) Enjoy exploring these attractions in Tokyo!'
// )
//   .then(console.log)
//   .catch(console.error);
export const filterMessages = (
  messages: ChatGPTMessage[]
): ChatGPTMessage[] => {
  return messages.map((message) => ({
    role: message.role,
    content: restoreImageUrls(message.content),
  }));
  // .filter((message) => message.content.trim() !== '');
};

// export function filteredMessages(messages: ChatGPTMessage[], filter: RegExp): ChatGPTMessage[] {
//   return messages.filter((message) => {
//     return !filter.test(message.content);
//   });
// }
