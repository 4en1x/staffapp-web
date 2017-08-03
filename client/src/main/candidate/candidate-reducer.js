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

    case 'RESET_CANDIDATE_LIST':
      return { ...state, candidateList: null };

    case 'RESET_CURRENT_CANDIDATE':
      return { ...state, currentCandidate: null };

    case 'ADD_CANDIDATE_HISTORY':
      return { ...state, history: action.history };

    case 'RESET_CANDIDATE_HISTORY':
      return { ...state, history: null };

    case 'ADD_CANDIDATE_HIRING':
      return { ...state, hiring: action.hiring };

    case 'RESET_CANDIDATE_HIRING':
      return { ...state, hiring: null };

    case 'ADD_CANDIDATE_VACANCIES':
      return { ...state, vacancies: action.vacancies };

    case 'RESET_CANDIDATE_VACANCIES':
      return { ...state, vacancies: null };

    default:
      return state;
  }
};

export default candidateHandle;
