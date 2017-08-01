import historyService from '../../service/history-service';

const ADD_HISTORY_LIST = 'ADD_HISTORY_LIST';

function addHistoryList(list) {
  return {
    type: ADD_HISTORY_LIST,
    list
  };
}

export function getHistoryList() {
  return dispatch =>
    historyService.getHistoryList().then(res => {
      dispatch(addHistoryList(res.data));
    });
}
