/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoginService from "../../services/LoginService";
import { useAuth } from "../context/AuthContext";

export const EnterToken = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !code) {
      setError("Por favor ingrese su correo electrónico y contraseña.");
      return;
    }

    try {
      console.log("Formulario enviado con éxito", { email, code });

      ///cambiar al metodo correcto --------------------------------------------
      const token = await LoginService.postLogin({ email, code });

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
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">

    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4">Enter Your Verification Code</h2>
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
        placeholder="Code"
        className="w-full p-2 border rounded mb-3"
        value={code}
        onChange={(e) => setCode(e.target.value)}
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
    </div>
  );
};


/*
 <div className="flex flex-col items-center mt-4 text-sm space-y-2">
        <button
          onClick={handleSubmit}
          className="text-blue-500 hover:underline"
        >
          Forgot your password?
        </button>
        <button
          onClick={handleSubmit}
          className="text-blue-500 hover:underline"
        >
          I have a token
        </button>
      </div>
      
      */