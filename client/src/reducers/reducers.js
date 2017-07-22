// reducers for auth

const addUserToStore = (
  state = { name: "", role: "", isAuthError: true },
  action
) => {
  switch (action.type) {
    case "ADD_USER":
      return action.user;

    case "ADD_USER_ERROR":
      return Object.assign({}, state, { isAuthError: false });

    default:
      return state;
  }
};

// reducers for interview

const interviewHandle = (state = {}, action) => {
  switch (action.type) {
    case "ADD_INTERVIEW_LIST":
      return Object.assign({}, state, { interviewList: action.list });

    case "ADD_CURRENT_INTREVIEW":
      return Object.assign({}, state, { currentInterview: action.interview });

    default:
      return state;
  }
};

const addFeedbackFieldsToStore = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FEEDBACK":
      return Object.assign({}, state, {
        feedbackFields: action.feedbackFields,
        isUploaded: false
      });

    case "FEEDBACK_UPLOADED":
      return Object.assign({}, state, { isUploaded: true });

    default:
      return state;
  }
};

export { addUserToStore };
export { interviewHandle };
export { addFeedbackFieldsToStore };
