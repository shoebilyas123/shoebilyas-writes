import axios from "axios";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosHappy } from "react-icons/io";
import useLoading from "../../Hooks/useLoading";

import Button from "../Button";
import Input from "../Input";
import NewsletterInput from "./NewsletterInput";

interface IProps {
  onClose: () => void;
}

const Newsletter: React.FC<IProps> = ({ onClose }) => {
  const { loading, initiateLoading, cancelLoading } = useLoading();

  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const subscribeCallHandler = async (email: string) => {
    try {
      initiateLoading();
      const response = await axios.post("/api/subscribe", { emailId: email });
      console.log(response);
      setHasSubscribed(true);
      cancelLoading();
    } catch (err) {
      if ((err as any)?.response?.status === 409) {
        setError("Already subscribed!");
      }
      cancelLoading();
      setHasSubscribed(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="flex flex-row justify-end px-2 py-2 pb-0 text-xl text-gray-600">
        <IoClose onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-left px-6 py-4">
        <div
          className="font-bold text-3xl m-4"
          style={{ color: "var(--font-purple)" }}
        >
          Stay up to date with my latest articles.
        </div>
        {hasSubscribed ? (
          <p className="font-bold text-2xl text-orange-600  flex items-center px-4">
            <span>{"Thanks for Subscribing!"}</span>
          </p>
        ) : (
          <div className="w-full px-4 mt-6 flex flex-col">
            <NewsletterInput
              onSubscribe={subscribeCallHandler}
              loading={loading}
              errorMessage={error}
              setErrorMessage={setError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
