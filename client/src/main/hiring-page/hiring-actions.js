import hiringService from '../../service/hiring-service';

const ADD_HIRING = 'ADD_HIRING';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';
const RESET_HIRING = 'RESET_HIRING';

function addHiring() {
  return {
    type: ADD_HIRING
  };
}

export function resetHiring() {
  return {
    type: RESET_HIRING
  };
}

function addFormValues(values) {
  return {
    type: 'ADD_FORM_VALUES',
    values
  };
}

export function getFormValues() {
  return dispatch => {
    hiringService.getFormValues().then(res => {
      dispatch(addFormValues(res.data));
    });
  };
}

export function postHiring(hiring) {
  return dispatch => {
    hiringService.postHiring(hiring).then(res => {
      dispatch(addHiring());
    });
  };
}
