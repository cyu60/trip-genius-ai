import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { TripModal } from "~/components/TripModal";
import { Trip, trips } from "~/assets/constants";
import { TripDetails } from "~/components/TripDetails";
import { useRouter } from "next/router";
import { Sidebar } from "~/components/Sidebar";

// import SessionProvider from "~/utils/SessionProvider";
// import { Chinat } from "../assets/constants";
// import { Hero } from "../components/Hero";
// import { Chat } from "../components/Chat";
// import MainInterface from "~/components/Main";

const TripInfo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (isNaN(Number(id))) {
    return null;
  }
  return (
    <>
      <Sidebar>
        <div className="p-8">
          <TripDetails trip={trips[Number(id)] as Trip} />
        </div>
      </Sidebar>
      {/* <TripModal trip={trips[0] as Trip}/> */}
    </>
  );
};
export default TripInfo;
