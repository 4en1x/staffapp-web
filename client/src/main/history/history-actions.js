import historyService from '../../service/history-service';

const ADD_HISTORY_LIST = 'ADD_HISTORY_LIST';
const ADD_HISTORY_FILTER = 'ADD_HISTORY_FILTER';

function addHistoryList(list) {
  return {
    type: ADD_HISTORY_LIST,
    list
  };
}

export function addHistoryFilter(filter) {
  return {
    type: ADD_HISTORY_FILTER,
    filter
  };
}



export function getHistoryList(filter) {
  return dispatch =>
    historyService.getHistoryList(filter).then(res => {
      dispatch(addHistoryList(res.data));
    });
}
