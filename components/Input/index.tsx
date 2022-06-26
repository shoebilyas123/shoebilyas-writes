import React from "react";
import classes from "./Input.module.css";

interface IProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <form onSubmit={(e: any) => e.preventDefault()}>
      <input
        className={`${classes["custom-input"]} p-2 w-full`}
        value={value}
        onChange={onChange}
        placeholder={`Search for articles...`}
      />
    </form>
  );
};

export default Input;
