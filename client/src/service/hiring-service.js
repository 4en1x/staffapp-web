import axios from 'axios';

function getFormValues() {
  return axios.get('/rest/interviews/fillLists');
}

function postHiring(hirings) {
  console.log(hirings);
  return axios.post(`/rest/hirings`, hirings);
}

const hiringService = {
  postHiring,
  getFormValues
};

export default hiringService;
