import axios from "axios";

const PROJECT_BASE_REST_API_URL = "http://localhost:8080/projects";

class ProjectService {
  getAllProjects() {
    return axios.get(PROJECT_BASE_REST_API_URL);
  }

  registerProject(project) {
    return axios.post(`${PROJECT_BASE_REST_API_URL}/register`, project);
  }

  deleteProject(projectId) {
    return axios.delete(`${PROJECT_BASE_REST_API_URL}/${projectId}`);
  }

  getProjectById(projectId) {
    return axios.get(`${PROJECT_BASE_REST_API_URL}/${projectId}`);
  }
}

export default new ProjectService();