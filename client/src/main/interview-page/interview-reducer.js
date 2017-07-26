const interviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_INTERVIEW_LIST":
      return Object.assign({}, state, { interviewList: action.list });

    case "ADD_CURRENT_INTERVIEW":
      return Object.assign({}, state, { currentInterview: action.interview });

    default:
      return state;
  }
};

export default interviewReducer;
