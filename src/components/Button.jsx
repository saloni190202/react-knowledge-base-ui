import React from "react";

const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;