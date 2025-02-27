/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginService from "../../services/LoginService";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Por favor ingrese su correo electrónico y contraseña.");
      return;
    }

    try {
      console.log("Formulario enviado con éxito", { email, password });

      const token = await LoginService.postLogin({ email, password });

      // Decodificar el token para obtener el rol
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role; // Ajusta según la estructura de tu token

      login(token, role); 

      console.log("Rol del usuario:", role); // Debugging
      console.log("Token decodificado:", decodedToken); // Debugging

      // Redirige según el rol
      if (role === "ADMIN" || role === "ROOT") {
        navigate("/projects");
      } else {
        navigate("/users/me/projects");
      }
    } catch (error) {
      console.error("Error en el login:", error.message);
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
};
