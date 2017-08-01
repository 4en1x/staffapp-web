const historyReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HISTORY_LIST':
      return { ...state, historyList: action.list };
    default:
      return state;
  }
};

export default historyReducer;
