import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/users";

export class UserService {
  getAllUsers() {
    return axios.get(USER_BASE_REST_API_URL);
  }

  registerUser(user) {
    return axios.post(`${USER_BASE_REST_API_URL}/register`, user);
  }

  getUserById(id) {
    return axios.get(`${USER_BASE_REST_API_URL}/${id}`);
  }

  updateUser(email, updatedUser) {
    return axios.put(`${USER_BASE_REST_API_URL}/update?email=${email}`, updatedUser);
  };

  deleteUser(email) {
    return axios.delete(`${USER_BASE_REST_API_URL}/${email}`);
  }

  getProjectsByUserEmail(email) {
    return axios.get(`${USER_BASE_REST_API_URL}/projects/${email}`);
  }

  getMyProjects() {
    return axios.get(`${USER_BASE_REST_API_URL}/my-projects`);
  }
}

export default new UserService();
