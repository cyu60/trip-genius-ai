import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { TripModal } from "~/components/TripModal";
import { Sidebar } from "~/components/Sidebar";
import { Trip, trips } from "~/assets/constants";
import { TripGrid } from "~/components/TripGrid";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

// import SessionProvider from "~/utils/SessionProvider";
// import { Chinat } from "../assets/constants";
// import { Hero } from "../components/Hero";
// import { Chat } from "../components/Chat";
// import MainInterface from "~/components/Main";

const Explore: NextPage = () => {
  const [myTrips, setTrips] = useState<Trip[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    setTrips(JSON.parse(sessionStorage.getItem("MyTrips") as string));
  }, []);
  return (
    <>
      <Sidebar>
        <div className="p-10">
          {!!myTrips && myTrips.length > 0 ? (
            <TripGrid title="My trips" trips={myTrips} addTrips={true}></TripGrid>
          ) : (
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              My trips
            </h2>
          )}
          
        </div>
        {/* {trips.map((trip) => (
          <TripModal trip={trip} key={trip.label} />
        ))} */}
      </Sidebar>
    </>
  );
};
export default Explore;
