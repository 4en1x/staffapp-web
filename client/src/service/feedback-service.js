import axios from 'axios';

axios.defaults.withCredentials = true;

function getFeedbackFormFields(id) {
  return axios.get(`/feedbacks/${id}`);
}

function putFeedback(id, feedback) {
  return axios.put(`${id}`, feedback);
}

const feedbackService = {
  getFeedbackFormFields,
  putFeedback
};

export default feedbackService;
