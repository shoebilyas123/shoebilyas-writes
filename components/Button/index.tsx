import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
  className,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? "" : classes["custom-button"]
      } w-fit flex items-center text-white rounded-md px-5 py-1 hover:shadow outline-none ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
