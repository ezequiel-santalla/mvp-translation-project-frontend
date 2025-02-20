import axios from "../configs/axiosConfig";

const PROJECT_BASE_REST_API_URL = "/projects";

class ProjectService {
  getAllProjects() {
    return axios.get(PROJECT_BASE_REST_API_URL);
  }

  registerProject(project) {
    return axios.post(`${PROJECT_BASE_REST_API_URL}/register`, project);
  }

  updateProject(id, updatedProject) {
    return axios.put(`${PROJECT_BASE_REST_API_URL}/update?id=${id}`, updatedProject);
  };

  deleteProject(projectId) {
    return axios.delete(`${PROJECT_BASE_REST_API_URL}/${projectId}`);
  }

  getProjectById(projectId) {
    return axios.get(`${PROJECT_BASE_REST_API_URL}/${projectId}`);
  }
}

export default new ProjectService();