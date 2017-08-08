import axios from 'axios';

axios.defaults.withCredentials = true;

function getInterviewList(filter = { type: 'my' },page=1) {
  return axios.get(`/rest/interviews?type=${filter.type}&page=${page}`);
}

function getInterviewById(id) {
  return axios.get(`/rest/interviews/${id}`);
}

function getInterviewFillList() {
  return axios.get(`/rest/interviews/fillLists`);
}

function postInterview(interview) {
  return axios.post(`/rest/interviews`, interview);
}

function patchInterview(id, interview) {
  return axios.patch(`/rest/interviews/${id}`, interview);
}

function deleteCurrentInterview(id) {
  return axios.delete(`/rest/interviews/${id}`);
}

const interviewService = {
  getInterviewList,
  getInterviewById,
  getInterviewFillList,
  postInterview,
  patchInterview,
  deleteCurrentInterview
};

export default interviewService;
