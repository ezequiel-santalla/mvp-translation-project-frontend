import axios from "../configs/axiosConfig";

const LANGUAGE_PAIR_BASE_REST_API_URL = "http://localhost:8080/language-pairs";

class LanguagePairService {
  getAllLanguagePairs() {
    return axios.get(LANGUAGE_PAIR_BASE_REST_API_URL);
  }

  registerLanguagePair(languagePair) {
    return axios.post(`${LANGUAGE_PAIR_BASE_REST_API_URL}/register`, languagePair);
  }

  deleteLanguagePair(languagePairId) {
    return axios.delete(`${LANGUAGE_PAIR_BASE_REST_API_URL}/${languagePairId}`);
  }
}

export default new LanguagePairService();