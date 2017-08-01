import axios from 'axios';

axios.defaults.withCredentials = true;

function getCandidateList(filter = {}, page = 1) {
  return axios.get(`/candidates?page=${page}`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getCandidateById(id) {
  return axios.get(`${id}`);
}

function getFillList() {
  return axios.get(`/candidates/fillLists`);
}

function postCandidate(interview) {
  console.log('lallala');
  return axios.post(`/candidates`, interview);
}

const candidateService = {
  getCandidateList,
  getCandidateById,
  getFillList,
  postCandidate
};

export default candidateService;
