import axios from "../configs/axiosConfig";

const LOGIN_BASE_REST_API_URL = "/auth-user/login";

class LoginService {
  async postLogin(loginData) {
    try {
      const response = await axios.post(LOGIN_BASE_REST_API_URL, loginData);
      const token = response.data;
      localStorage.setItem("jwtToken", token); // Guarda el token en localStorage
      return token;
    } catch (error) {
      if (error.response) {
        // Si el servidor responde con un error (401, 400, etc.)
        throw new Error(error.response.data || "Error en la autenticación");
      } else {
        // Si el error es inesperado (problema de conexión, etc.)
        throw new Error("No se pudo conectar con el servidor");
      }
    }
  }
}

export default new LoginService();

