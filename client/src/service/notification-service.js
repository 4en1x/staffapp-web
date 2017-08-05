import axios from 'axios';

axios.defaults.withCredentials = true;

function getMessageList() {
  return axios.get(`/notifications`);
}

const notificationService = {
  getMessageList,
};

export default notificationService;
