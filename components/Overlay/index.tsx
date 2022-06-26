import React from "react";

interface IProps {
  onClose?: () => void;
  children: any;
}

const Overlay: React.FC<IProps> = ({ children, onClose }) => {
  return (
    <div
      onClick={onClose && onClose}
      className="fixed inset-0 overflow:hidden w-full h-screen flex items-center justify-center"
      style={{ zIndex: 9999, background: "rgba(0,0,0,.9)" }}
    >
      {children}
    </div>
  );
};

export default Overlay;
