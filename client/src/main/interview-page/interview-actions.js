import interviewService from "../../service/interview-service";

const ADD_INTERVIEW_LIST = "ADD_INTERVIEW_LIST";
const ADD_CURRENT_INTERVIEW = "ADD_CURRENT_INTERVIEW";

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

export function getInterviewList() {
  return dispatch => {
    interviewService.getInterviewList().then(response => {
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
