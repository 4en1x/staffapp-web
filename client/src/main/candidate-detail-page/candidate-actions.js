import candidateService from '../../service/candidate-service';

const ADD_CANDIDATE_LIST = 'ADD_CANDIDATE_LIST';
const ADD_CURRENT_CANDIDATE = 'ADD_CURRENT_CANDIDATE';

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

export function getCandidateList() {
  return dispatch => {
    candidateService.getCandidateList().then(res => {
      dispatch(addCandidateList(res.data));
    });
  };
}

export function getCandidateById(id) {
  return dispatch => {
    candidateService.getCandidateById().then(res => {
      dispatch(addCurrentCandidate(res.data));
    });
  };
}
