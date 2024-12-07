import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, route, colorClass, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Llama a la función pasada como prop (para deleteUser)
    } else if (route) {
      navigate(route); // Si no hay onClick, navega a la ruta
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-4 py-2 rounded-md shadow-md transition duration-200 ${colorClass}`}
    >
      {text}
    </button>
  );
};

export default Button;
