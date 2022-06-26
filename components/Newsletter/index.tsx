import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import Button from "../Button";
import Input from "../Input";
import NewsletterInput from "./NewsletterInput";

interface IProps {
  onClose: () => void;
}

const Newsletter: React.FC<IProps> = ({ onClose }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="flex flex-row justify-end px-2 py-2 pb-0 text-xl">
        <IoClose onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-left px-6 py-4">
        <div
          className="font-bold text-3xl m-4"
          style={{ color: "var(--font-purple)" }}
        >
          Stay up to date with my latest articles.
        </div>
        <div className="w-full px-4 mt-6 flex flex-col">
          {<NewsletterInput />}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
