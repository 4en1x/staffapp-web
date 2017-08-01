import axios from 'axios';

axios.defaults.withCredentials = true;

const getHistoryList = () => axios.get('/history');

const historyService = {
  getHistoryList
};

export default historyService;