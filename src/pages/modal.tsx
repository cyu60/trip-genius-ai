import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { TripModal } from "~/components/TripModal";
import { Trip, trips } from "~/assets/constants";
import { TripDetails } from "~/components/TripDetails";

// import SessionProvider from "~/utils/SessionProvider";
// import { Chinat } from "../assets/constants";
// import { Hero } from "../components/Hero";
// import { Chat } from "../components/Chat";
// import MainInterface from "~/components/Main";

const Modal: NextPage = () => {
  return (
    <>
      <TripDetails trip={trips[0] as Trip}/>
      {/* <TripModal trip={trips[0] as Trip}/> */}
    </>
  );
};
export default Modal;
