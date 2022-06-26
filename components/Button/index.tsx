import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classes["custom-button"]} w-fit flex items-center text-white rounded-md px-5 py-1 hover:shadow outline-none ${className} `}
    >
      {children}
    </button>
  );
};

export default Button;
