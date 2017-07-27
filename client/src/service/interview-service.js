import axios from 'axios';

axios.defaults.withCredentials = true;

function getInterviewList(filter = { type: 'my' }) {
  return axios.get(`/interviews?type=${filter.type}`);
}

function getInterviewById(id) {
  return axios.get(`${id}`);
}

const interviewService = {
  getInterviewList,
  getInterviewById
};

export default interviewService;
