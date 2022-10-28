import axios from "axios";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosHappy } from "react-icons/io";
import { useTheme } from "next-themes";

import useLoading from "shoebilyas-common/Hooks/useLoading";
import Button from "shoebilyas-common/components/Button";
import Input from "shoebilyas-common/components/Input";
import NewsletterInput from "./NewsletterInput";

interface IProps {
  onClose: () => void;
}

const Newsletter: React.FC<IProps> = ({ onClose }) => {
  const { loading, initiateLoading, cancelLoading } = useLoading();

  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { theme } = useTheme();

  const subscribeCallHandler = async ({
    email,
    name,
  }: {
    email: string;
    name: string;
  }) => {
    try {
      initiateLoading();
      const response = await axios.post("/api/subscribe", {
        email,
        name,
      });
      setSuccessMessage(response.data.message);
      setHasSubscribed(true);
      cancelLoading();
    } catch (err) {
      console.log(err);
      const errorCode = (err as any)?.response?.status;
      if (errorCode === 409) {
        setError("Already subscribed!");
      } else if (errorCode === 400) {
        const errMsg = (err as any).response?.data.message;
        if (errMsg.toLowerCase().includes("name")) {
          setError(errMsg);
        } else {
          setError("Please provide a valid email");
        }
      }
      cancelLoading();
      setHasSubscribed(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800 ">
      <div className="flex flex-row justify-end px-2 py-2 pb-0 text-xl text-gray-600 dark:text-white">
        <IoClose onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-left px-6 py-4">
        <div
          className="font-bold text-3xl m-4"
          style={{ color: theme ? "" : "var(--font-purple)" }}
        >
          Stay up to date with my latest articles.
        </div>
        {hasSubscribed ? (
          <p className="font-medium text-gray-700 dark:text-slate-200 flex flex-col items-center px-4">
            <span>{`${successMessage} asddsd`}</span>
            <span className="mt-2 text-green-500">
              Subscripition confirmation has been emailed to you.
            </span>
          </p>
        ) : (
          <div className="w-full px-4 mt-6 flex flex-col">
            <NewsletterInput
              onSubscribe={subscribeCallHandler}
              loading={loading}
              errorMessage={error}
              setErrorMessage={setError}
              theme={theme || ""}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
