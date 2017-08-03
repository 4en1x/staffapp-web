import candidateService from '../../service/candidate-service';

const ADD_CANDIDATE_LIST = 'ADD_CANDIDATE_LIST';
const ADD_CURRENT_CANDIDATE = 'ADD_CURRENT_CANDIDATE';
const EDIT_FORM_SUBMITTED = 'EDIT_FORM_SUBMITTED';
const ADD_FORM_SUBMITTED = 'ADD_FORM_SUBMITTED';
const ADD_FILTER = 'ADD_FILTER';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';
const RESET_CANDIDATE_LIST = 'RESET_CANDIDATE_LIST';
const RESET_CURRENT_CANDIDATE = 'RESET_CURRENT_CANDIDATE';
const ADD_CANDIDATE_HISTORY = 'ADD_CANDIDATE_HISTORY';
const ADD_CANDIDATE_HIRING = 'ADD_CANDIDATE_HIRING';
const RESET_CANDIDATE_HISTORY = 'RESET_CANDIDATE_HISTORY';
const RESET_CANDIDATE_HIRING = 'RESET_CANDIDATE_HIRING';
const ADD_CANDIDATE_VACANCIES = 'ADD_CANDIDATE_VACANCIES';
const RESET_CANDIDATE_VACANCIES = 'RESET_CANDIDATE_VACANCIES';

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
      console.log(res);
      dispatch(addFormValues(res.data));
    });
  };
}

export function patchCandidate(id, interview) {
  return dispatch => {
    candidateService.patchCandidate(id, interview).then(res => {
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

export function resetCandidateList() {
  return {
    type: RESET_CANDIDATE_LIST
  };
}

export function resetCurrentCandidate() {
  return {
    type: RESET_CURRENT_CANDIDATE
  };
}

function addCandidateHisroty(history) {
  return {
    type: ADD_CANDIDATE_HISTORY,
    history
  };
}

export function resetCandidateHistory() {
  return {
    type: RESET_CANDIDATE_HISTORY
  };
}

export function getCandidateHistory(url) {
  return dispatch => {
    candidateService.getCandidateHistory(url).then(res => {
      dispatch(addCandidateHisroty(res.data));
    });
  }
}

function addCandidateHiring(hiring) {
  return {
    type: ADD_CANDIDATE_HIRING,
    hiring
  };
}

export function resetCandidateHiring() {
  return {
    type: RESET_CANDIDATE_HIRING
  };
}

export function getCandidateHiring(url) {
  return dispatch => {
    candidateService.getCandidateHiring(url).then(res => {
      dispatch(addCandidateHiring(res.data));
    });
  }
}

function addCandidateVacancies(vacancies) {
  return {
    type: ADD_CANDIDATE_VACANCIES,
    vacancies
  };
}

export function resetCandidateVacancies() {
  return {
    type: RESET_CANDIDATE_VACANCIES
  };
}

export function getCandidateVacancies(url) {
  return dispatch => {
    candidateService.getCandidateVacancies(url).then(res => {
      dispatch(addCandidateVacancies(res.data));
    });
  }
}
