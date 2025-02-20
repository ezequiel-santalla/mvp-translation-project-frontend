import axios from "../configs/axiosConfig";

const USER_BASE_REST_API_URL = "/users";

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
  }

  deleteUser(email) {
    return axios.delete(`${USER_BASE_REST_API_URL}/${email}`);
  }

  getProjectsByUserEmail(email) {
    return axios.get(`${USER_BASE_REST_API_URL}/projects/${email}`);
  }

  getMyProjects() {
    return axios.get(`${USER_BASE_REST_API_URL}/me/projects`);
  }

  getMyUser() {
    return axios.get(`${USER_BASE_REST_API_URL}/me/user`);
  }
}

export default new UserService();