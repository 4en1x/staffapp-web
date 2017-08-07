const historyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HISTORY_LIST':
      return { ...state, historyList: action.list };

    case 'ADD_HISTORY_FILTER':
      return { ...state, filter: action.filter };

    default:
      return state;
  }
};

export default historyReducer;
