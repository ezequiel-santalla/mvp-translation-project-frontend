/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; 

export const VerifyToken = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!email || !token) {
      setError("Por favor ingrese su email y el código.");
      return;
    }

    try {
      const isValid = await AuthService.verifyResetToken(email, token);
      if (isValid) {
        navigate("/reset-password", { state: { email } });
      } else {
        setError("Código incorrecto o expirado.");
      }
    } catch (error) {
      setError("Error al verificar el código.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Verificar código</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código de verificación"
        className="w-full p-2 border rounded mb-3"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Verificar
      </button>
    </div>
  );
};
