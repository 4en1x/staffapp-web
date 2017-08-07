const interviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INTERVIEW_LIST':
      return { ...state, interviewList: action.list };

    case 'ADD_CURRENT_INTERVIEW':
      return { ...state, currentInterview: action.interview };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'ADD_FORM_VALUES':
      return { ...state, formValues: action.formValues };

    case 'FORM_SUBMIT':
      return { ...state, isFormSubmitted: true };

    case 'RESET_FORM':
      return { ...state, formValues: null, isFormSubmitted: false };

    case 'RESET_CURRENT_INTERVIEW':
      return { ...state, currentInterview: null };

    case 'RESET_INTERVIEW_LIST':
      return { ...state, interviewList: null };

    case 'DELETE_CURRENT_INTERVIEW':
      return { ...state, currentInterview: null, isInterviewDeleted: true };

    case 'RESET_DELETED_INTERVIEW':
      return { ...state, isInterviewDeleted: false };

    default:
      return state;
  }
};

export default interviewReducer;
