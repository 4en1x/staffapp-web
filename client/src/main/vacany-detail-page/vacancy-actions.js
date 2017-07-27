import vacanyService from '../../service/vacancy-service';

const ADD_VACANCY_LIST = 'ADD_VACANCY_LIST';
const ADD_CURRENT_VACANCY = 'ADD_CURRENT_VACANCY';

function addVacancyList(list) {
  return {
    type: ADD_VACANCY_LIST,
    list
  };
}

function addCurrentVacancy(vacancy) {
  return {
    type: ADD_CURRENT_VACANCY,
    vacancy
  };
}

export function getVacancyList(filter) {
  return dispatch => {
    vacanyService.getVacancyList(filter).then(res => {
      dispatch(addVacancyList(res.data));
    });
  };
}

export function getVacancyById(id) {
  return dispatch => {
    vacanyService.getVacancyById(id).then(res => {
      dispatch(addCurrentVacancy(res.data));
    });
  };
}
