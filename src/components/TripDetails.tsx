import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TripHeader } from "./TripHeader";
import { Trip, trips } from "~/assets/constants";
import { TripIteniary } from "./TripIteniary";
import { MusicList } from "./MusicList";
import { api } from "~/utils/api";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { ToastContainer, toast } from "react-toastify";

const dummyTrip: Trip = trips[2] as Trip;

export const TripDetails: React.FC<{
  trip: Trip;
}> = ({ trip }) => {
  const [myTrips, setTrips] = useState<Trip[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
    setTrips(JSON.parse(sessionStorage.getItem("MyTrips") as string));
    // console.log(myTrips);
    // console.log(trip, myTrips.includes(trip));
  }, []);
  const sendMessageMutation = api.example.sendMessage.useMutation();
  ({ textMessage: trip.label });
  const addTrip = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const myTrips: Trip[] = JSON.parse(
    //   sessionStorage.getItem("MyTrips") as string
    // );
    toast(
      `${trip.label} is added to your list trips! Let's have an adventure!`
    );
    if (myTrips) {
      sessionStorage.setItem("MyTrips", JSON.stringify([...myTrips, trip]));
      setTrips([...myTrips, trip]);
    } else {
      sessionStorage.setItem("MyTrips", JSON.stringify([trip]));
      setTrips([trip]);
    }
    sendMessageMutation.mutate({
      textMessage: "Whoohoo! You have added a new trip: " + trip.label,
    });
  };
  const removeTrip = () => {
    if (myTrips) {
      const index = myTrips.findIndex((obj) => obj.label === trip.label);
      // console.log(index);
      if (index > -1) {
        myTrips.splice(index, 1);
        sessionStorage.setItem("MyTrips", JSON.stringify([...myTrips]));
        setTrips([...myTrips]);
        console.log(myTrips);
      }
      // console.log("trip removed?");
      toast.warn(`${trip.label} is successfully removed from your trips list.`);
      sendMessageMutation.mutate({
        textMessage:
          "Not traveling? You have successfully removed trip: " + trip.label,
      });
    } else {
      return;
    }
  };

  const checkInMyTrips = () => {
    return (
      !!myTrips &&
      myTrips.length > 0 &&
      myTrips.find((obj) => obj.label === trip.label)
    );
  };

  return (
    <div>
      <TripHeader trip={trip}></TripHeader>
      <div className="flex flex-wrap gap-x-6 gap-y-0.5 pt-3">
        {trip.tags.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex">
        <div className="pt-5">
          <a
            // type="button"
            href="https://sustainabletravel.org/our-work/carbon-offsets/calculate-footprint/"
            target="_blank"
          >
            <div className="rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Offset carbon footprint
            </div>
          </a>
        </div>
        <div className="pl-3 pt-5">
          {checkInMyTrips() ? (
            <div
              className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => removeTrip()}
            >
              Remove trip
            </div>
          ) : (
            <div
              className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => addTrip()}
            >
              Add to my trips
            </div>
          )}
          <ToastContainer></ToastContainer>
        </div>
      </div>
      <div className="flex h-screen flex-col sm:flex-row">
        <div className="flex-1">
          <img
            src={trip.image}
            alt=""
            className="pointer-events-none object-cover py-10 group-hover:opacity-75"
          />
          <TripIteniary trip={trip}></TripIteniary>
          {/* Flex Box 1 */}
        </div>
        <div className="flex-1 justify-end sm:pl-5">
          <MusicList trip={trip}></MusicList>
          {checkInMyTrips() && (
            <>
              <h2 className="pb-3 pt-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Invite your friends to the trip!
              </h2>
              <PhoneNumberInput></PhoneNumberInput>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
