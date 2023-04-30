import { Trip } from "~/assets/constants";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const files = [
  {
    title: "IMG_4985.HEIC",
    size: "3.9 MB",
    source:
      "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
  },
  // More files...
];

export const MusicList: React.FC<{
  trip: Trip;
}> = ({ trip }) => {
  return (
    <>
      <h2 className="pb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Music Playlist - {trip.music_vibe}
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {trip.music_playlist.map((music) => (
          <li key={music} className="relative">
            <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/002/249/673/original/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg"
                }
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <a
                href={"https://www.youtube.com/results?search_query=" + music}
                target="_blank"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {music}</span>
              </a>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {music}
            </p>
            {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">{music.size}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
};
