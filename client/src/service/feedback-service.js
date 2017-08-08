import axios from 'axios';

axios.defaults.withCredentials = true;

function getFeedbackFormFields(id) {
  return axios.get(`/rest/feedbacks/${id}`);
}

function putFeedback(id, feedback) {
  return axios.put(`/rest/feedbacks/${id}`, feedback);
}

const feedbackService = {
  getFeedbackFormFields,
  putFeedback
};

export default feedbackService;
