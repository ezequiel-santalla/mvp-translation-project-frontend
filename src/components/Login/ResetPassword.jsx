import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthUserService"; // Servicio para llamar al backend
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email) {
      setError("Please insert you email.");
      return;
    }
    if (!token) {
      setError("Please, insert Token.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await AuthService.resetPassword(email, token, password);
      Swal.fire("Password changed successfully");
      navigate("/login");
    } catch (error) {
      setError("Error processing request.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Change your password</h2>
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
        placeholder="Recovery Token"
        className="w-full p-2 border rounded mb-3"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
            <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
            <input
        type="password"
        placeholder="Confirm new password"
        className="w-full p-2 border rounded mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
        >
          Reset Password
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
