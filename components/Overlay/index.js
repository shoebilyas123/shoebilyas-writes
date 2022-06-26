import React from "react";

const Overlay = ({ children }) => {
  return (
    <div
      className="fixed inset-0 overflow:hidden w-full h-screen flex items-center justify-center"
      style={{ zIndex: 9999, background: "rgba(0,0,0,.9)" }}
    >
      {children}
    </div>
  );
};

export default Overlay;
