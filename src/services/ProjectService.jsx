import axios from "axios";

const PROJECT_BASE_REST_API_URL = "http://localhost:8080/projects";
const PROJECT_REGISTER_REST_API_URL = "http://localhost:8080/projects/register";
const PROJECT_UPDATE_REST_API_URL = "http://localhost:8080/projects/update/:id";
const PROJECT_DELETE_REST_API_URL = "http://localhost:8080/projects/delete/:id";

class ProjectService {
  getAllProjects() {
    return axios.get(PROJECT_BASE_REST_API_URL);
  }

  registerProject(user) {
    return axios.post(PROJECT_REGISTER_REST_API_URL, user);
  }

  updateProject(id) {
    return axios.put(PROJECT_UPDATE_REST_API_URL);
  }

  deleteProject(id) {
    return axios.delete(PROJECT_DELETE_REST_API_URL);
  }
}

export default new ProjectService();