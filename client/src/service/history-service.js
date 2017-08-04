import axios from 'axios';

axios.defaults.withCredentials = true;

const getHistoryList = (filter = {}) => axios.get('/history', {
  params: {
    filter: JSON.stringify(filter)
  }
});

const historyService = {
  getHistoryList
};

export default historyService;