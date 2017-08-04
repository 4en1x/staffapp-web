import axios from 'axios';

function postHiring(hirings) {
  return axios.post(`/hirings`, hirings);
}

const hiringService = {
  postHiring
};

export default hiringService;
