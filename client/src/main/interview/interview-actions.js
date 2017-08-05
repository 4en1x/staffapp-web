import interviewService from '../../service/interview-service';

const ADD_INTERVIEW_LIST = 'ADD_INTERVIEW_LIST';
const ADD_CURRENT_INTERVIEW = 'ADD_CURRENT_INTERVIEW';
const RESET_INTERVIEW_LIST = 'RESET_INTERVIEW_LIST';
const RESET_CURRENT_INTERVIEW = 'RESET_CURRENT_INTERVIEW';
const ADD_FILTER = 'ADD_FILTER';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';
const FORM_SUBMIT = 'FORM_SUBMIT';
const RESET_FORM = 'RESET_FORM';


function addInterviewsList(list) {
  return {
    type: ADD_INTERVIEW_LIST,
    list
  };
}

export function getInterviewList(filter = { type: 'my' }) {
  return dispatch => {
    interviewService.getInterviewList(filter).then(response => {
      dispatch(addInterviewsList(response.data));
    });
  };
}

function addCurrentInterview(interview) {
  return {
    type: ADD_CURRENT_INTERVIEW,
    interview
  };
}

export function getInterviewById(id) {
  return dispatch => {
    interviewService.getInterviewById(id).then(response => {
      dispatch(addCurrentInterview(response.data));
    });
  };
}


export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter
  };
}

function addFormValues(formValues) {
  return {
    type: ADD_FORM_VALUES,
    formValues
  };
}

export function getFillList() {
  return dispatch => {
    interviewService.getInterviewFillList().then(res => {
      dispatch(addFormValues(res.data));
    });
  };
}

function formSubmit() {
  return {
    type: FORM_SUBMIT
  };
}

export function patchInterview(id ,interview) {
  return dispatch => {
    interviewService.patchInterview(id, interview).then(res => {
      dispatch(formSubmit());
    })
  };
}

export function postInterview(interview) {
  return dispatch => {
    interviewService.postInterview(interview).then(res => {
      dispatch(formSubmit());
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

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

