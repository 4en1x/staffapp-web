const hiringReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FORM_VALUES':
      return { ...state, formValues: action.values };

    case 'ADD_HIRING':
      return { ...state, isUploaded: true };

    case 'RESET_HIRING':
      return {
        ...state,
        isUploaded: false,
        candidateId: null,
        vacancyId: null
      };

    case 'ADD_CURRENT_CANDIDATE_ID':
      return { ...state, candidateId: action.id };

    case 'ADD_CURRENT_VACANCY_ID':
      return { ...state, vacancyId: action.id };

    default:
      return state;
  }
};

export default hiringReducer;
