/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext); // Usa el contexto global
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de autenticación con el backend
    localStorage.setItem("jwtToken", "fake-token"); // Simulación de autenticación
    login(); // Llamar a la función global del contexto
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
