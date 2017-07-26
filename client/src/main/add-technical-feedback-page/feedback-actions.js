import feedbackService from "../../service/feedback-service";

const ADD_FEEDBACK = "ADD_FEEDBACK";
const FEEDBACK_UPLOADED = "FEEDBACK_UPLOADED";

export function getFeedbackFormFields(id) {
  return dispatch => {
    feedbackService.getFeedbackFormFields(id).then(res => {
      dispatch(addFeedbackToStore(res.data));
    });
  };
}

export function putFeedback(id, feedback) {
  return dispatch => {
    feedbackService.putFeedback(id, feedback).then(res => {
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
