const interviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_INTERVIEW_LIST":
      return { ...state, interviewList: action.list };

    case "ADD_CURRENT_INTERVIEW":
      return { ...state, currentInterview: action.interview };

    default:
      return state;
  }
};

export default interviewReducer;
