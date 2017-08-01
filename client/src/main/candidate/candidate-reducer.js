const candidateHandle = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CANDIDATE_LIST':
      return {
        ...state,
        candidateList: action.list,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'ADD_CURRENT_CANDIDATE':
      return {
        ...state,
        currentCandidate: action.candidate,
        isFormLoaded: false,
        isEditFormSubmitted: false,
        isAddFormSubmitted: false
      };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'ADD_FORM_VALUES':
      return { ...state, formValues: action.values, isFormLoaded: true };

    case 'EDIT_FORM_SUBMITTED':
      return { ...state, isEditFormSubmitted: true };

    case 'ADD_FORM_SUBMITTED':
      return { ...state, isAddFormSubmitted: true };

    default:
      return state;
  }
};

export default candidateHandle;
