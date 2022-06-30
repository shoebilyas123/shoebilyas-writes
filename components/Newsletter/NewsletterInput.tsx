import axios from "axios";
import React, { useState } from "react";
import useLoading from "../../Hooks/useLoading";
import Button from "../Button";
import Loader from "../Loader";

interface IProps {
  isFooter?: boolean;
  onSubscribe: (id: string) => void;
  loading: boolean;
  errorMessage: string;
  setErrorMessage: (param: string) => void;
}

const NewsletterInput: React.FC<IProps> = ({
  isFooter = false,
  onSubscribe,
  loading,
  errorMessage,
  setErrorMessage,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);

  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const subscriberHandler = () => {
    if (email === "") {
      setIsValidEmail(false);
    } else {
      onSubscribe(email);
    }
  };

  return (
    <>
      {errorMessage ? (
        <p className="text-red-700">{errorMessage}</p>
      ) : (
        !isValidEmail && (
          <p className="text-red-700">Please enter a valid email!</p>
        )
      )}
      <input
        value={email}
        className="px-4 py-2 w-full placeholder-gray-600 font-medium"
        style={{
          color: isFooter ? "rgb(200,200,200)" : "var(--font-purple-dark)",
          background: "rgba(0,0,0,.15)",
          outline: "none",
          borderRadius: "7.5px",
        }}
        onChange={emailChangeHandler}
        placeholder={`My email is...`}
      />
      <Button className="w-max my-2 py-2" onClick={subscriberHandler}>
        <span>{`${
          loading ? "Please wait..." : "Try The Free Newsletter"
        }`}</span>
      </Button>
    </>
  );
};

export default NewsletterInput;
