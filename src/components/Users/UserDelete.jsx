import React from "react";
import UserService from "../../services/UserService";

export const UserDelete = ({ userEmail, onDelete }) => {
  const handleDelete = () => {
    UserService.deleteUser(userEmail)
      .then((response) => {
        console.log(response.data);
        onDelete(); // Llamada a la función pasada como prop para actualizar la lista
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};
