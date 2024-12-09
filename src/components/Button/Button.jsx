import React from "react";

export const Button = ({ text, onClick, colorClass }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-md shadow-md transition duration-200 ${colorClass}`}
    >
      {text}
    </button>
  );
};

