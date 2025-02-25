import axios from "../configs/axiosConfig";

const LOG_BASE_REST_API_URL = "/auth-user";

class LoginService {
  async postLogin(loginData) {
    try {
      const response = await axios.post(`${LOG_BASE_REST_API_URL}/login`, loginData);
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

  async postLogout(){
    return axios.post(`${LOG_BASE_REST_API_URL}/login`);
  }
}


export default new LoginService();

