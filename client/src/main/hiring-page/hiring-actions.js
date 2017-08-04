import hiringService from '../../service/hiring-service';

const ADD_HIRING = 'ADD_HIRING';
const RESET_HIRING = 'RESET_HIRING';

function addHiring() {
  return {
    type: ADD_HIRING,
  }
}

export function resetHiring() {
  return {
    type: RESET_HIRING
  }
}

export function postHiring(hiring) {
  return dispatch => {
    hiringService.postHiring(hiring).then(res => {
      dispatch(addHiring());
    });
  }
}
