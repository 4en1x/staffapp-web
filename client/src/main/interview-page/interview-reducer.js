const interviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INTERVIEW_LIST':
      return { ...state, interviewList: action.list };

    case 'ADD_CURRENT_INTERVIEW':
      return { ...state, currentInterview: action.interview };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    default:
      return state;
  }
};

export default interviewReducer;
