import interviewService from '../../service/interview-service';

const ADD_INTERVIEW_LIST = 'ADD_INTERVIEW_LIST';
const ADD_CURRENT_INTERVIEW = 'ADD_CURRENT_INTERVIEW';
const ADD_EDIT_FORM = 'ADD_EDIT_FORM';
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

function addEditForm(interview) {
  return {
    type: ADD_EDIT_FORM,
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

export function getInterviewById(id) {
  return dispatch => {
    interviewService.getInterviewById(id).then(response => {
      dispatch(addCurrentInterview(response.data));
    });
  };
}

export function getEditFormById(id) {
  return dispatch => {
    interviewService.getEditFormById(id).then(res => {
      dispatch(addEditForm(res.data));
    });
  };
}
