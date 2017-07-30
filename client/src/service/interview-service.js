import axios from 'axios';

axios.defaults.withCredentials = true;

function getInterviewList(filter = { type: 'my' }) {
  return axios.get(`/interviews?type=${filter.type}`);
}

function getInterviewById(id) {
  return axios.get(`${id}`);
}

function getEditFormById(id) {
  return axios.get(`/interviews/${id}`);
}

function getInterviewFillList() {
  return axios.get(`/interviews/fillLists`);
}

function postInterview(value) {
  return axios.post(`/interviews`, value);
}

const interviewService = {
  getInterviewList,
  getInterviewById,
  getEditFormById,
  getInterviewFillList,
  postInterview
};

export default interviewService;
