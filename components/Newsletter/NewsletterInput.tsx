import React, { useState } from "react";
import Button from "../Button";

interface IProps {
  isFooter?: boolean;
}

const NewsletterInput: React.FC<IProps> = ({ isFooter = false }) => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailRegex.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <>
      {!isValidEmail && (
        <p className="text-red-700">Please enter a valid email!</p>
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
      <Button className="w-max my-2 py-2">Try The Free Newsletter </Button>
    </>
  );
};

export default NewsletterInput;
