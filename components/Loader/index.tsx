import React from "react";

interface IProps {
  height?: string | number;
  width?: string | number;
}

const Loader: React.FC<IProps> = ({ height = 12, width = 12 }) => {
  return (
    <span className={`flex h-12 w-12`}>
      <span
        className={`animate-ping absolute inline-flex h-12 w-12 rounded-full opacity-75`}
        style={{ background: "white" }}
      ></span>
      <span
        className={`relative inline-flex rounded-full h-12 w-12`}
        style={{ background: "white" }}
      ></span>
    </span>
  );
};

export default Loader;
