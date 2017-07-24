import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_INTERVIEW_LIST,
  ADD_CURRENT_INTREVIEW,
  ADD_FEEDBACK,
  FEEDBACK_UPLOADED
} from "../actions/actions.js";
import axios from "axios";

const URL = 'http://localhost:3300';

// auth

(axios.defaults.withCredentials = true);

export function postEmail(email) {
  return axios.post(`${URL}/email`, email);
};

function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

function addUserError(user) {
  return {
    type: ADD_USER_ERROR,
    user
  };
}

export function postUser(user) {
  return function(dispatch) {
    axios.post(`${URL}/login`, user).then(response => {
      dispatch(
        addUser(Object.assign({}, response.data, { isAuthError: false }))
      );
    });
  };
}

// feedback forms

export function getFeedbackFormFields(id) {
  return dispatch => {
    axios.get(`${URL}/feedbacks/${id}`).then(res => {
      dispatch(addFeedbackToStore(res.data));
    });
  };
}

export function putFeedback(id, feedback) {
  return dispatch => {
    axios.put(`${URL}/feedbacks/${id}`, feedback).then(res => {
      dispatch(feedbackUploaded());
    });
  };
}

function addFeedbackToStore(feedbackFields) {
  return {
    type: ADD_FEEDBACK,
    feedbackFields
  };
}

function feedbackUploaded() {
  return {
    type: FEEDBACK_UPLOADED
  };
}

// interviews

function addInterviewsList(list) {
  return {
    type: ADD_INTERVIEW_LIST,
    list
  };
}

function addCurrentInterview(interview) {
  return {
    type: ADD_CURRENT_INTREVIEW,
    interview
  };
}

export function getInterviewList() {
  return function(dispatch) {
    const type = "my";
    axios
      .get(`${URL}/interviews?type=${type}`)
      .then(response => {
        dispatch(addInterviewsList(response.data));
      });
  };
}

export function getInterviewById(id) {
  return function(dispatch) {
    axios.get(`${URL}${id}`).then(response => {
      dispatch(addCurrentInterview(response.data));
    });
  };
}
