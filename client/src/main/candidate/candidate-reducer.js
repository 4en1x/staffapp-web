const candidateHandle = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CANDIDATE_LIST':
      return { ...state, candidateList: action.list };

    case 'ADD_CURRENT_CANDIDATE':
      return { ...state, currentCandidate: action.candidate };

    case 'ADD_FILTER':
      return { ...state, filter: action.filter };

    default:
      return state;
  }
};

export default candidateHandle;
