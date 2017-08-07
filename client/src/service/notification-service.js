import axios from 'axios';

axios.defaults.withCredentials = true;

function getMessageList() {
  return axios.get(`/notifications`);
}

function patchNotification(id) {
  return axios.patch(`/notifications/${id}`);
}

const notificationService = {
  getMessageList,
  patchNotification
};

export default notificationService;
