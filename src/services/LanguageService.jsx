import axios from "../configs/axiosConfig";

const LANGUAGE_PAIR_BASE_REST_API_URL = "/languages";

class LanguageService {

  getAllLanguages() {
    return axios.get(`${LANGUAGE_PAIR_BASE_REST_API_URL}/get-all`);
  }

  getAllLanguageNames() {
    return axios.get(`${LANGUAGE_PAIR_BASE_REST_API_URL}/get-all-names`);
  }

  getFilteredListLanguages(language) {
    return axios.get(`${LANGUAGE_PAIR_BASE_REST_API_URL}/get-filtered-list/${language}`);
  }

  getFilteredListLanguageNames(language) {
    return axios.get(`${LANGUAGE_PAIR_BASE_REST_API_URL}/get-filtered-list-names/${language}`);
  }

}

export default new LanguageService();