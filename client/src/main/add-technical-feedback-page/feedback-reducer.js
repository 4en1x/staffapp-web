const feedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_FEEDBACK":
      return Object.assign({}, state, {
        feedbackFields: action.feedbackFields,
        isUploaded: false
      });

    case "FEEDBACK_UPLOADED":
      return { ...state, isUploaded: true };

    default:
      return state;
  }
};

export default feedbackReducer;
