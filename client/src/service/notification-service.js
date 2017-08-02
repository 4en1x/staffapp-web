import axios from 'axios';

axios.defaults.withCredentials = true;

function getMessageList() {
    return axios.get(`/notifications`);
}

function deleteMessageById(id) {
    return axios.patch(`/notifications/${id}`);
}

const notificationService = {
    getMessageList,
    deleteMessageById
};

export default notificationService;
