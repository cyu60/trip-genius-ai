import AI_Hospital from "../assets/AI_hospital.jpeg";
import AI_person from "../assets/AI_person.jpeg";
import Learning from "../assets/Learning.jpeg";
import Podcast from "../assets/Podcast.jpeg";
import Image, { type StaticImageData } from "next/image";
const projects = [
  {
    id: 1,
    title: "AI Hospital",
    description:
      "A simulation of hospital organization and functioning using generative AI agents to optimize resources and improve patient care.",
    imageSrc: AI_Hospital,
    status: "Active",
    href: "https://chinatyu.super.site/content-essays/ai-hospital-simulating-hospital-organization-using-generative-ai-agents",
  },
  {
    id: 2,
    title: "AI-me",
    description:
      "AI-powered avatars that assist creators in providing personalized advice, tailoring content, and synthesizing conversations to drive deeper engagement and content creation.",
    imageSrc: AI_person,
    status: "Active",
    href: "https://ai-me.app/home",
  },
  {
    id: 3,
    title: "EDUCE framework",
    description:
      "A curriculum design that integrates entrepreneurship and design thinking into hackathons for personalized, fun, and impactful learning experiences. It includes Edge Analysis, Define, Understand, Create, and Evaluate stages.",
    imageSrc: Learning,
    status: "Active",
    href: "https://chinatyu.super.site/content-essays/educe-framework",
  },
  {
    id: 4,
    title: "Future of Edvolution podcast",
    description:
      "A podcast series discussing the future of education with academics, community leaders, and entrepreneurs, exploring innovative ideas and solutions.",
    imageSrc: Podcast,
    status: "Active",
    href: "https://chinatyu.super.site/content-essays/the-future-of-edvolution",
  },
  // More projects...
];

export const ProjectList: React.FC<{
  addUserInput: (userInput: string) => Promise<void>;
}> = ({ addUserInput }) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl">
        <div className="max-w-2xl lg:max-w-4xl">
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2> */}
          {/* <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p> */}
          <div className="mt-5 space-y-10 lg:mt-5">
            {projects.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col gap-8 lg:flex-row"
              >
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                  <Image
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    src={post.imageSrc}
                    alt=""
                  />
                  {/* <img
                //   src={AI_Hospital}
                    // src={post.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                  /> */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div>
                  <div className="flex items-center gap-x-4 text-xs">
                    {/* <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time> */}
                    <a className="text-blue-500" href={post.href} target="_blank">External site</a>
                    <div
                      //   href={post.status.href}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
                    >
                      {post.status}
                    </div>
                  </div>
                  <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <div
                        onClick={() =>
                          void addUserInput(
                            "Can you tell me more about " + post.title
                          )
                        }
                      >
                        <span className="absolute inset-0" />
                        {post.title}
                      </div>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
