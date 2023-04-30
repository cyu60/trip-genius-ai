import { Trip } from "~/assets/constants";
import { TripModal } from "./TripModal";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

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
  addTrips: boolean;
}> = ({ title, trips, addTrips }) => {
  // }> = ({ trip }) => {
  const [open, setOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  console.log(trips[0]);
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
              className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
              href={"trips/" + String(Number(trip.id) - 1)}
              // onClick={() => setSelectedTrip(trip)}
              // onClick={() => setTrip(!open)}
            >
              {/* {() => {
                console.log(trip.id);
                return <></>;
              }} */}
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
        {addTrips && (
          <li className="flex items-center justify-center pb-5">
            {/* <div className="bg-red-500"> */}
              <Link
                // type="button"
                href={"/explore"}
                className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-20 w-20" aria-hidden="true" />
              </Link>
            {/* </div> */}
          </li>

          // <li className="justify-content-center relative flex">
          //   <div className="items-center bg-red-500 w-full">
          //     <button
          //       type="button"
          //       className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center"
          //     >
          //       <PlusIcon className="h-10 w-10" aria-hidden="true" />
          //     </button>
          //   </div>
          // </li>
        )}
      </ul>
    </>
  );
};
