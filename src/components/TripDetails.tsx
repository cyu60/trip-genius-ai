import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TripHeader } from "./TripHeader";
import { Trip, trips } from "~/assets/constants";
import { TripIteniary } from "./TripIteniary";
import { MusicList } from "./MusicList";
import { api } from "~/utils/api";
import { PhoneNumberInput } from "./PhoneNumberInput";

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
      // const index = myTrips.indexOf(trip);
      console.log(index);
      if (index > -1) {
        myTrips.splice(index, 1);
        sessionStorage.setItem("MyTrips", JSON.stringify([...myTrips]));
        setTrips([...myTrips]);
        console.log(myTrips);
      }
      // console.log("trip removed?");
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
    // <Transition.Root show={open} as={Fragment}>
    //   <Dialog as="div" className="relative z-1000" onClose={setOpen}>
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 z-1000 overflow-y-auto">
    //       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //           enterTo="opacity-100 translate-y-0 sm:scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //           leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         >
    //           <Dialog.Panel className="relative w-full max-w-7xl transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
    <div>
      <TripHeader trip={trip}></TripHeader>
      {/* <div className="lg: flex w-full justify-end pt-4">
                    <div className="min-w-fit">
                      <TripIteniary trip={trip}></TripIteniary>
                      </div>
                      <div className="ml-4">
                      <MusicList trip={trip}></MusicList>
                      </div>
                    </div> */}
      {/* <div className="flex"></div> */}
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
            // {!!myTrips && myTrips.length > 0 && myTrips.includes(trip) ? (
            <div
              // type="button"
              className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => removeTrip()}
            >
              Remove trip
            </div>
          ) : (
            <div
              // type="button"
              className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => addTrip()}
            >
              Add to my trips
            </div>
          )}
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
      {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Payment successful
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Consequatur amet labore.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                */}
      {/* 
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root> */}
    </div>
  );
};
