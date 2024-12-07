import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/users";

class UserService {
  getAllUsers() {
    return axios.get(USER_BASE_REST_API_URL);
  }

  registerUser(user) {
    return axios.post(`${USER_BASE_REST_API_URL}/register`, user);
  }

  getUserByEmail(clientEmail) {
    return axios.get(`${USER_BASE_REST_API_URL}/${clientEmail}`);
  }

  updateUser(user) {
    return axios.put(`${USER_BASE_REST_API_URL}/update/${user.email}`, user);
  }

  deleteUser(clientEmail) {
    return axios.delete(`${USER_BASE_REST_API_URL}/${clientEmail}`);
  }
}

export default new UserService();
