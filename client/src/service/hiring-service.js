import axios from 'axios';

function getFormValues() {
  return axios.get('/interviews/fillLists');
}

function postHiring(hirings) {
  return axios.post(`/hirings`, hirings);
}

const hiringService = {
  postHiring,
  getFormValues
};

export default hiringService;
