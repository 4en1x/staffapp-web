import candidateService from '../../service/candidate-service';

const ADD_CANDIDATE_LIST = 'ADD_CANDIDATE_LIST';
const ADD_CURRENT_CANDIDATE = 'ADD_CURRENT_CANDIDATE';
const ADD_FILTER = 'ADD_FILTER';

function addCandidateList(list) {
  return {
    type: ADD_CANDIDATE_LIST,
    list
  };
}

function addCurrentCandidate(candidate) {
  return {
    type: ADD_CURRENT_CANDIDATE,
    candidate
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter
  };
}

export function getCandidateList(filter) {
  return dispatch => {
    candidateService.getCandidateList(filter).then(res => {
      dispatch(addCandidateList(res.data));
    });
  };
}

export function getCandidateById(id) {
  return dispatch => {
    candidateService.getCandidateById(id).then(res => {
      dispatch(addCurrentCandidate(res.data));
    });
  };
}
