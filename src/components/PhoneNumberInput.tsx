import { useState } from "react";
import { api } from "~/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PhoneNumberInput: React.FC<{
  // addUserInput: (userInput: string) => Promise<void>;
}> = (
  {
    // addUserInput
  }
) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const sendMsgToFriend = api.example.sendMessageWithNumber.useMutation();
  const handleAddFriend = () => {
    const usNumberPattern = /^\d{10}$/;
    if (!usNumberPattern.test(number)) {
      return toast.error("Please provide a valid number.");
    }
    if (name === "") {
      return toast.error("Please give your friend a name.");
    }

    const message: string =
      "Hey " +
      name +
      "! Saathvik just invited you on his trip. Whohoo! Check it out here: " +
      window.location.href;
    // console.log(number, name, message);
    sendMsgToFriend.mutate({
      textMessage: message,
      phoneNumber: "+1" + number,
    });
    toast(`An invite message is send to ${name}!`);
    setName("");
    setNumber("");
    return;
  };
  return (
    <div>
      <div className="py-3">
        <label
          htmlFor="phone-number"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Your friend's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <label
        htmlFor="phone-number"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Phone Number
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>US</option>
            <option>CA</option>
            <option>EU</option>
          </select>
        </div>
        <input
          type="text"
          name="phone-number"
          id="phone-number"
          className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="(555) 987-6543"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div className="w-28 py-4 text-center">
        <div
          className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => handleAddFriend()}
        >
          Invite friend
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
