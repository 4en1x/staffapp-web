import axios from 'axios';

axios.defaults.withCredentials = true;

const getHistoryList = (filter = {}, page=1) => axios.get('/rest/history', {
  params: {
    filter: JSON.stringify(filter),
      page: page
  }
});

const historyService = {
  getHistoryList
};

export default historyService;