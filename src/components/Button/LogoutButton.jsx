/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";


import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
    });
  };
  return (
    <button
      onClick={handleLogout}
      className="text-lg bg-transparent border-none text-white cursor-pointer"
    >
      Log out
    </button>
  );
};
