import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { TripModal } from "~/components/TripModal";
import { Sidebar } from "~/components/Sidebar";
import { trips } from "~/assets/constants";
import { TripGrid } from "~/components/TripGrid";

// import SessionProvider from "~/utils/SessionProvider";
// import { Chinat } from "../assets/constants";
// import { Hero } from "../components/Hero";
// import { Chat } from "../components/Chat";
// import MainInterface from "~/components/Main";

const Explore: NextPage = () => {
  return (
    <>
      <Sidebar>
        <div className="p-10">
          <TripGrid title={"Popular trips"} trips={trips}></TripGrid>
        </div>
        {/* {trips.map((trip) => (
          <TripModal trip={trip} key={trip.label} />
        ))} */}
      </Sidebar>
    </>
  );
};
export default Explore;
