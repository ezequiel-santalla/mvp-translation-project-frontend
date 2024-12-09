import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/users";

class UserService {
  getAllUsers() {
    return axios.get(USER_BASE_REST_API_URL);
  }

  registerUser(user) {
    return axios.post(`${USER_BASE_REST_API_URL}/register`, user);
  }

  getUserByEmail(email) {
    return axios.get(`${USER_BASE_REST_API_URL}/email/${email}`);
  }

  updateUser(user) {
    return axios.put(`${USER_BASE_REST_API_URL}/update/${user.email}`, user);
  }

  deleteUser(email) {
    return axios.delete(`${USER_BASE_REST_API_URL}/${email}`);
  }
}

export default new UserService();
