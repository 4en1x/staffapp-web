import axios from 'axios';

axios.defaults.withCredentials = true;

function getCandidateList(filter = {}, page = 1) {
  return axios.get(`/rest/candidates?page=${page}`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getCandidateById(id) {
  return axios.get(`/rest/candidates/${id}`);
}

function getFillList() {
  return axios.get(`/rest/candidates/fillLists`);
}

function postCandidate(interview) {
  return axios.post(`/rest/candidates`, interview);
}

function patchCandidate(id, candidate) {
  return axios.patch(`/rest/candidates/${id}`, candidate);
}

function getCandidatesReport(filter = {}) {
  return axios.get(`/rest/candidates/report`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getCandidateHistory(url) {
  return axios.get(`/rest/${url}/history`);
}

function getCandidateHiring(url) {
  return axios.get(`/rest/${url}/hirings`);
}

function getCandidateVacancies(url) {
  return axios.get(`/rest/${url}/pickVacancies`);
}

function deleteCurrentCandidate(id) {
  return axios.delete(`/rest/candidates/${id}`);
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
