const interviewReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INTERVIEW_LIST':
      return {
        ...state,
        interviewList: action.list,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'ADD_CURRENT_INTERVIEW':
      return {
        ...state,
        currentInterview: action.interview,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'EDIT_FORM_SUBMITTED':
      return { ...state, isEditFormSubmitted: true };

    case 'ADD_FORM_SUBMITTED':
      return { ...state, isAddFormSubmitted: true };

    case 'FORM_LOADED':
      return Object.assign({}, state, {
        formValues: action.data,
        isFormLoaded: true
      });

    case 'RESET_FORM_LOADED_DATA':
      return { ...state, isFormLoaded: false };

    case 'RESET_CURRENT_INTERVIEW':
      return Object.assign({}, state, { currentInterview: null });

    case 'RESET_INTERVIEW_LIST':
      return Object.assign({}, state, { interviewList: null });

    default:
      return state;
  }
};

export default interviewReducer;
