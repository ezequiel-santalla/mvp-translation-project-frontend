import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const requestPasswordReset = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

const verifyResetToken = (email, token) => {
  return axios.post(`${API_URL}/verify-token`, { email, token })
    .then(response => response.data.valid);
};

const resetPassword = (email, newPassword) => {
  return axios.post(`${API_URL}/reset-password`, { email, newPassword });
};

export default { requestPasswordReset, verifyResetToken, resetPassword };
