import interviewService from '../../service/interview-service';

const ADD_INTERVIEW_LIST = 'ADD_INTERVIEW_LIST';
const ADD_CURRENT_INTERVIEW = 'ADD_CURRENT_INTERVIEW';
const FORM_LOADED = 'FORM_LOADED';
const EDIT_FORM_SUBMITTED = 'EDIT_FORM_SUBMITTED';
const ADD_FORM_SUBMITTED = 'ADD_FORM_SUBMITTED';
const RESET_INTERVIEW_LIST = 'RESET_INTERVIEW_LIST';
const RESET_CURRENT_INTERVIEW = 'RESET_CURRENT_INTERVIEW';
const ADD_FILTER = 'ADD_FILTER';

function addInterviewsList(list) {
  return {
    type: ADD_INTERVIEW_LIST,
    list
  };
}

function addCurrentInterview(interview) {
  return {
    type: ADD_CURRENT_INTERVIEW,
    interview
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter
  };
}

export function getInterviewList(filter = { type: 'my' }) {
  return dispatch => {
    interviewService.getInterviewList(filter).then(response => {
      dispatch(addInterviewsList(response.data));
    });
  };
}

function formLoad(data) {
  return {
    type: FORM_LOADED,
    data
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

export function getFillList() {
  return dispatch => {
    interviewService.getInterviewFillList().then(res => {
      dispatch(formLoad(res.data));
    });
  };
}

export function patchInterview(id ,interview) {
  return dispatch => {
    interviewService.patchInterview(id, interview).then(res => {
      dispatch(editFormSubmit());
    })
  };
}

export function postInterview(interview) {
  return dispatch => {
    interviewService.postInterview(interview).then(res => {
      dispatch(addFormSubmit());
    });
  };
}

export function resetInterviewList() {
  return {
    type: RESET_INTERVIEW_LIST
  }
}

export function resetCurrentInterview() {
 return {
   type: RESET_CURRENT_INTERVIEW
 }
}

export function getInterviewById(id) {
  return dispatch => {
    interviewService.getInterviewById(id).then(response => {
      console.log(response.data);
      dispatch(addCurrentInterview(response.data));
    });
  };
}
