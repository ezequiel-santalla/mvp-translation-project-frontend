/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; // Servicio para llamar al backend

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email) {
      setError("Por favor ingrese su correo electrónico.");
      return;
    }

    try {
      await AuthService.requestPasswordReset(email);
      alert("Si el email está registrado, recibirás un código de verificación.");
      navigate("/verify-token");
    } catch (error) {
      setError("Error al procesar la solicitud.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
      >
        Enviar
      </button>
      <button
        onClick={() => navigate("/login")}
        className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
      >
        Cancelar
      </button>
    </div>
  );
};
