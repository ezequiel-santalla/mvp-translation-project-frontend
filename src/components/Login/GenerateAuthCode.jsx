import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCodeService from "../../services/AuthCodeService"; // Servicio para llamar al backend
import Swal from "sweetalert2";

export const GenerateAuthCode = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email) {
      setError("Please insert you email.");
      return;
    }

    if (email != confirmEmail) {
      setError("Emails do not match");
      return;
    }

    try {
      await AuthCodeService.generateAuthCode(email);
      Swal.fire("Code sent to email");
      navigate("/users")
    } catch (error) {
      setError("Error processing request");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Generate Authorization Code</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="email"
          placeholder="Confirm Email"
          className="w-full p-2 border rounded mb-3"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
        >
          Enviar
        </button>
        <button
          onClick={() => navigate("/users")}
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
