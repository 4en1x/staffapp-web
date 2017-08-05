import candidateService from '../../service/candidate-service';

const ADD_CANDIDATE_LIST = 'ADD_CANDIDATE_LIST';
const ADD_CURRENT_CANDIDATE = 'ADD_CURRENT_CANDIDATE';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';
const FORM_SUBMIT = 'FORM_SUBMIT';
const RESET_FORM = 'RESET_FORM';
const ADD_FILTER = 'ADD_FILTER';
const RESET_CANDIDATE_LIST = 'RESET_CANDIDATE_LIST';
const RESET_CURRENT_CANDIDATE = 'RESET_CURRENT_CANDIDATE';
const ADD_CANDIDATE_HISTORY = 'ADD_CANDIDATE_HISTORY';
const ADD_CANDIDATE_HIRING = 'ADD_CANDIDATE_HIRING';
const RESET_CANDIDATE_HISTORY = 'RESET_CANDIDATE_HISTORY';
const RESET_CANDIDATE_HIRING = 'RESET_CANDIDATE_HIRING';
const ADD_CANDIDATE_CANDIDATE = 'ADD_CANDIDATE_CANDIDATE';
const DELETE_CURRENT_CANDIDATE = 'DELETE_CURRENT_CANDIDATE';
const RESET_CANDIDATE_CANDIDATES = 'RESET_CANDIDATE_CANDIDATES';
const RESET_DELETED_CANDIDATE = 'RESET_DELETED_CANDIDATE';

const DOWNLOAD_REPORT = 'DOWNLOAD_REPORT';

export function downloadReport(reportLink) {
  return {
    type: DOWNLOAD_REPORT,
    reportLink
  };
}

function addCandidateList(list) {
  return {
    type: ADD_CANDIDATE_LIST,
    list
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

function addCurrentCandidate(candidate) {
  return {
    type: ADD_CURRENT_CANDIDATE,
    candidate
  };
}

export function getCandidateById(id) {
  return dispatch => {
    candidateService.getCandidateById(id).then(res => {
      dispatch(addCurrentCandidate(res.data));
    });
  };
}

function addFormValues(formValues) {
  return {
    type: ADD_FORM_VALUES,
    formValues
  };
}

export function getFormValues() {
  return dispatch => {
    candidateService.getFillList().then(res => {
      dispatch(addFormValues(res.data));
    });
  };
}

function formSubmit() {
  return {
    type: FORM_SUBMIT
  };
}

export function patchCandidate(id, interview) {
  return dispatch => {
    candidateService.patchCandidate(id, interview).then(res => {
      dispatch(formSubmit());
    });
  };
}

export function postCandidate(interview) {
  return dispatch => {
    candidateService.postCandidate(interview).then(res => {
      dispatch(formSubmit());
    });
  };
}

function addCandidateHistory(history) {
  return {
    type: ADD_CANDIDATE_HISTORY,
    history
  };
}

export function getCandidateHistory(url) {
  return dispatch => {
    candidateService.getCandidateHistory(url).then(res => {
      dispatch(addCandidateHistory(res.data));
    });
  };
}

function addCandidateHiring(hiring) {
  return {
    type: ADD_CANDIDATE_HIRING,
    hiring
  };
}

export function getCandidateHiring(url) {
  return dispatch => {
    candidateService.getCandidateHiring(url).then(res => {
      dispatch(addCandidateHiring(res.data));
    });
  };
}

function addCandidateVacancies(vacancies) {
  return {
    type: ADD_CANDIDATE_CANDIDATE,
    vacancies
  };
}

export function getCandidateVacancies(url) {
  return dispatch => {
    candidateService.getCandidateVacancies(url).then(res => {
      dispatch(addCandidateVacancies(res.data));
    });
  };
}

function deleteCandidate() {
  return {
    type: DELETE_CURRENT_CANDIDATE
  };
}

export function deleteCurrentCandidate(id) {
  return dispatch => {
    candidateService.deleteCurrentCandidate(id).then(res => {
      dispatch(deleteCandidate());
    });
  };
}

export function resetCandidateVacancies() {
  return {
    type: RESET_CANDIDATE_CANDIDATES
  };
}

export function resetCandidateHiring() {
  return {
    type: RESET_CANDIDATE_HIRING
  };
}

export function resetCandidateHistory() {
  return {
    type: RESET_CANDIDATE_HISTORY
  };
}

export function resetCurrentCandidate() {
  return {
    type: RESET_CURRENT_CANDIDATE
  };
}

export function resetCandidateList() {
  return {
    type: RESET_CANDIDATE_LIST
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

export function resetDeleteCandidate() {
  return {
    type: RESET_DELETED_CANDIDATE
  }
}
