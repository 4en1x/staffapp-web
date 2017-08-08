import axios from 'axios';

axios.defaults.withCredentials = true;

function getMessageList() {
  return axios.get(`/rest/notifications`);
}

function patchNotification(id) {
  return axios.patch(`/rest/notifications/${id}`);
}

const notificationService = {
  getMessageList,
  patchNotification
};

export default notificationService;
