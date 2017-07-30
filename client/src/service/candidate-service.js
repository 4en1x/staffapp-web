import axios from 'axios';

axios.defaults.withCredentials = true;

function getCandidateList(filter = {}, page = 1) {
  return axios.get(`/candidates?page=${page}`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getCandidatesFillList() {
  return axios.get(`/candidates/fillLists`);
}

function getCandidateById(id) {
  return axios.get(`${id}`);
}

const candidateService = {
  getCandidateList,
  getCandidateById,
  getCandidatesFillList
};

export default candidateService;
