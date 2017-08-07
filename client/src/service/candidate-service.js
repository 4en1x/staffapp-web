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
  return axios.post(`/candidates`, interview);
}

function patchCandidate(id, candidate) {
  return axios.patch(`/candidates/${id}`, candidate);
}

function getCandidatesReport(filter = {}) {
  return axios.get(`/candidates/report`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getCandidateHistory(url) {
  return axios.get(`${url}/history`);
}

function getCandidateHiring(url) {
  return axios.get(`${url}/hirings`);
}

function getCandidateVacancies(url) {
  return axios.get(`${url}/pickVacancies`);
}

function deleteCurrentCandidate(id) {
  return axios.delete(`/candidates/${id}`);
}

const candidateService = {
  getCandidateList,
  getCandidateById,
  getFillList,
  postCandidate,
  patchCandidate,
  getCandidatesReport,
  getCandidateHistory,
  getCandidateHiring,
  getCandidateVacancies,
  deleteCurrentCandidate
};

export default candidateService;
