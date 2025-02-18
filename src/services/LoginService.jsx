import axios from "axios";

const LOGIN_BASE_REST_API_URL = "http://localhost:8080/auth-user/login";

class LoginService {
  async getLogin(loginData) {
    try {
      const response = await axios.post(LOGIN_BASE_REST_API_URL, loginData);
      return response.data; // Retorna solo el token JWT
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

