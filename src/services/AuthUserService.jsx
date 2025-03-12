import axios from "axios";

const API_URL = "http://localhost:8080/auth-user";

const requestPasswordReset = (email) => {
  return axios.post(`${API_URL}/forgot-password?email=${encodeURIComponent(email)}`);
};

const verifyRegstrationToken = (email, token) => {
  return axios.post(`${API_URL}/validate-registration`, { email, token })
    .then(response => response.data.valid);
};

const verifyRecoveryToken = (email, token) => {
  return axios.post(`${API_URL}/validate-recovery`, { email, token })
    .then(response => response.data.valid);
};

const resetPassword = async (email, recoveryToken, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      email,
      recoveryToken,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error.response?.data || error.message);
    throw error;
  }
};

export default { requestPasswordReset, verifyRegstrationToken, verifyRecoveryToken, resetPassword };
