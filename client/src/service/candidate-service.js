import axios from 'axios';

axios.defaults.withCredentials = true;

function getCandidateList(page = 1) {
  return axios.get(`candidates?page=${page}`);
}

function getCandidateById(id) {
  return axios.get(`${id}`);
}

const candidateService = {
  getCandidateList,
  getCandidateById
};

export default candidateService;
