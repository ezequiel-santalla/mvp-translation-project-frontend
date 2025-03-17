import axios from "axios";

// Crear instancia de Axios con configuración base
const api = axios.create({
  //baseURL: "http://localhost:8080",
  baseURL: "https://7ecb-190-189-40-246.ngrok-free.app",
  headers: {
    "Content-Type": "application/json", // Formato JSON por defecto
  },
});

// Interceptor para agregar el token JWT a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas con errores (Ej: Token expirado)
api.interceptors.response.use(
  (response) => response, // Si la respuesta es correcta, la devuelve tal cual
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token inválido o expirado. Redirigiendo al login...");
      localStorage.removeItem("jwtToken"); // Elimina el token expirado
      window.location.href = "/login"; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default api;
