import candidateService from '../../service/candidate-service';

const ADD_CANDIDATE_LIST = 'ADD_CANDIDATE_LIST';
const ADD_CURRENT_CANDIDATE = 'ADD_CURRENT_CANDIDATE';
const EDIT_FORM_SUBMITTED = 'EDIT_FORM_SUBMITTED';
const ADD_FORM_SUBMITTED = 'ADD_FORM_SUBMITTED';
const ADD_FILTER = 'ADD_FILTER';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';

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

function addFormValues(values) {
  return {
    type: ADD_FORM_VALUES,
    values
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

function addFormSubmit() {
  return {
    type: ADD_FORM_SUBMITTED
  };
}

function editFormSubmit() {
  return {
    type: EDIT_FORM_SUBMITTED
  };
}

export function getFormValues() {
  return dispatch => {
    candidateService.getFillList().then(res => {
      dispatch(addFormValues(res.data));
    });
  };
}

export function patchCandidate(id, interview) {
  return dispatch => {
    candidateService.patchInterview(id, interview).then(res => {
      dispatch(editFormSubmit());
    });
  };
}

export function postCandidate(interview) {
  return dispatch => {
    candidateService.postCandidate(interview).then(res => {
      dispatch(addFormSubmit());
    });
  };
}
