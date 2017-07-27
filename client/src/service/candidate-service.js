import axios from 'axios';

axios.defaults.withCredentials = true;

function getCandidateList(p = 1) {
  return axios.get(`candidates?p=${p}`);
}

function getCandidateById(id) {
  return axios.get(`${id}`);
}

const candidateService = {
  getCandidateList,
  getCandidateById
};

export default candidateService;
