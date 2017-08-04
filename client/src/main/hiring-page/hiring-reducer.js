const hiringReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_HIRING':
      return { ...state, isUploaded: true };

    case 'RESET_HIRING':
      return { ...state, isUploaded: false };

    default:
      return state;
  }
};

export default hiringReducer;
