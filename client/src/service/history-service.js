import axios from 'axios';

axios.defaults.withCredentials = true;

const getHistoryList = (filter = {}, page) => axios.get('/history', {
  params: {
    filter: JSON.stringify(filter),
      page: page
  }
});

const historyService = {
  getHistoryList
};

export default historyService;