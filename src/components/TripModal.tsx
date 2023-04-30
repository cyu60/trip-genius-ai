import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TripHeader } from "./TripHeader";
import { Trip, trips } from "~/assets/constants";
import { TripIteniary } from "./TripIteniary";
import { MusicList } from "./MusicList";

const dummyTrip: Trip = trips[2] as Trip;


export const TripModal: React.FC<{
    trip: Trip;
}> = ({ trip }) => {
      // export default function TripModal() {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-1000" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-1000 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-7xl transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
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
                  <div className="pt-5">
                    <a
                      // type="button"
                      href="https://sustainabletravel.org/our-work/carbon-offsets/calculate-footprint/"
                      target="_blank"
                      className="rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Offset carbon footprint
                    </a>
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
