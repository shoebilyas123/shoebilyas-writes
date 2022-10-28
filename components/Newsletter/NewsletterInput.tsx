import axios from "axios";
import React, { useState } from "react";
import useLoading from "shoebilyas-common/Hooks/useLoading";
import Button from "shoebilyas-common/components/Button";
import Loader from "shoebilyas-common/components/Loader";

interface IProps {
  isFooter?: boolean;
  onSubscribe: ({ email, name }: { email: string; name: string }) => void;
  loading: boolean;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
  theme: string;
}

const NewsletterInput: React.FC<IProps> = ({
  isFooter = false,
  onSubscribe,
  loading,
  errorMessage,
  setErrorMessage,
  theme,
}) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const emailValue = e.target.value;

    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setErrorMessage("");
      setIsValidEmail(false);
    }

    setEmail(emailValue);
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const nameValue = e.target.value;
    setName(nameValue);
  };

  const subscriberHandler = () => {
    if (!isValidEmail) return;
    else if (email === "") {
      setIsValidEmail(false);
    } else {
      onSubscribe({ email, name });
    }
  };

  return (
    <>
      {errorMessage ? (
        <p className="text-red-700 p-1">{errorMessage || "sadasds"}</p>
      ) : (
        !isValidEmail && (
          <p className="text-red-700 p-1">Please enter a valid email!</p>
        )
      )}
      <label
        htmlFor="name"
        className="px-1 pb-1 text-gray-900 dark:text-slate-200"
      >
        Name
      </label>
      <input
        autoComplete="false"
        id="name"
        value={name}
        className="px-4 py-2 mb-2 w-full placeholder-gray-600 dark:placeholder-zinc-500 font-medium"
        style={{
          color:
            theme === "dark"
              ? ""
              : isFooter
              ? "rgb(200,200,200)"
              : "var(--font-purple-dark)",
          background: "rgba(0,0,0,.15)",
          outline: "none",
          borderRadius: "7.5px",
        }}
        onChange={nameChangeHandler}
        placeholder={`My name is...`}
      />

      <label
        htmlFor="email"
        className="px-1 pb-1 text-gray-900 pt-2 dark:text-slate-200"
      >
        Email
      </label>
      <input
        autoComplete="false"
        id="email"
        value={email}
        className="px-4 py-2 mb-2 w-full placeholder-gray-600 font-medium dark:placeholder:text-zinc-500"
        style={{
          color:
            theme === "dark"
              ? ""
              : isFooter
              ? "rgb(200,200,200)"
              : "var(--font-purple-dark)",
          background: "rgba(0,0,0,.15)",
          outline: "none",
          borderRadius: "7.5px",
        }}
        onChange={emailChangeHandler}
        placeholder={`My email is...`}
      />
      <Button
        className="w-max my-8 py-2 flex items-center text-white rounded-md px-5 hover:shadow outline-none"
        style={{
          background: "linear-gradient(-45deg, var(--orange), var(--red))",
        }}
        onClick={subscriberHandler}
      >
        <span>{`${
          loading ? "Please wait..." : "Try The Free Newsletter"
        }`}</span>
      </Button>
    </>
  );
};

export default NewsletterInput;
