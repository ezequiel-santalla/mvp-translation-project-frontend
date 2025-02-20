import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importar jwt-decode
import LoginService from "../../services/LoginService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      localStorage.setItem("token", token); // Guarda el token en localStorage

      // Decodificar el token para obtener el role
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role; // Ajusta según la estructura de tu token

      localStorage.setItem("role", role); // Guarda el role en localStorage para usarlo en los endpoints

      console.log("Rol del usuario:", role); // Debugging
      console.log("Token decodificado:", decodedToken); // Debugging

      if (role === "ADMIN" | role === "ROOT") {
        navigate("/projects");
      } else {
        navigate("/users/me/projects");
      } // Redirige después del login
    } catch (error) {
      console.error("Error en el login:", error.message);
      setError("Email or password is incorrect.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-24 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="mb-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};
