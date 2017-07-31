import axios from 'axios';

axios.defaults.withCredentials = true;

function getInterviewList(filter = { type: 'my' }) {
  return axios.get(`/interviews?type=${filter.type}`);
}

function getInterviewById(id) {
  return axios.get(`${id}`);
}

function getInterviewFillList() {
  return axios.get(`/interviews/fillLists`);
}

function postInterview(interview) {
  return axios.post(`/interviews`, interview);
}

function patchInterview(id, interview) {
  return axios.patch(`/interviews/${id}`, interview);
}

const interviewService = {
  getInterviewList,
  getInterviewById,
  getInterviewFillList,
  postInterview,
  patchInterview
};

export default interviewService;
