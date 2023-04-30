import { Trip } from "~/assets/constants";
import { TripModal } from "./TripModal";
import { useState } from "react";

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

export const TripGrid: React.FC<{
  title: string;
  trips: Trip[];
}> = ({ title, trips }) => {
  // }> = ({ trip }) => {
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  return (
    <>
      <h2 className="pb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h2>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {/* <TripModal trip={trips[0] as Trip}></TripModal> */}
        {trips.map((trip, idx) => (
          <li key={trip.label} className="relative">
            <a
              className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
              href={"trips/" + String(idx)}
              // onClick={() => setSelectedTrip(trip)}
              // onClick={() => setTrip(!open)}
            >
              {/* {selectedTrip && <TripModal trip={trip}></TripModal>} */}
              <img
                src={trip.image}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              {/* <a
                href={"https://www.youtube.com/results?search_query=" + music}
                target="_blank"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {music}</span>
              </a> */}
            </a>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
              {trip.label}
            </p>
            {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">{music.size}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
};
