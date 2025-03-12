import api from "../configs/axiosConfig"; // Importa la instancia configurada

const generateAuthCode = (email) => {
  console.log("Email enviado:", email);
  return api.post("/auth-code/generate-pre-register-code", { email });
};

export default { generateAuthCode };
