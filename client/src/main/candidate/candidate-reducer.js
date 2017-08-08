const candidateHandle = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CANDIDATE_LIST':
      return { ...state, candidateList: action.list };

    case 'ADD_CURRENT_CANDIDATE':
      return { ...state, currentCandidate: action.candidate };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    case 'ADD_FORM_VALUES':
      return { ...state, formValues: action.formValues }; 

    case 'FORM_SUBMIT':
      return { ...state, isFormSubmitted: true };

    case 'RESET_FORM':
      return { ...state, formValues: null, isFormSubmitted: false };

    case 'RESET_CANDIDATE_LIST':
      return { ...state, candidateList: null, filter: null };

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

    case 'DELETE_CURRENT_CANDIDATE':
      return { ...state, currentCandidate: null, isCandidateDeleted: true };

    case 'RESET_DELETED_CANDIDATE':
      return { ...state, isCandidateDeleted: false };

    case 'DOWNLOAD_REPORT':
      return { ...state, reportLink: action.reportLink };

    case 'RESET_LINK':
      return { ...state, reportLink: null };

    default:
      return state;
  }
};

export default candidateHandle;
