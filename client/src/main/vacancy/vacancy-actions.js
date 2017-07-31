import vacanyService from '../../service/vacancy-service';
const ADD_VACANCY_LIST = 'ADD_VACANCY_LIST';
const ADD_CURRENT_VACANCY = 'ADD_CURRENT_VACANCY';
const FORM_LOADED = 'FORM_LOADED';
const EDIT_FORM_SUBMITTED = 'EDIT_FORM_SUBMITTED';
const ADD_FORM_SUBMITTED = 'ADD_FORM_SUBMITTED';
const ADD_FILTER = 'ADD_FILTER';

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

export function getVacancyFillList() {
  return dispatch => {
    vacanyService.getVacancyFillList().then(res => {
      dispatch(formLoad(res.data));
    });
  };
}

export function postVacancy(vacancy) {
  return dispatch => {
    vacanyService.postVacancy(vacancy).then(res => {
      dispatch(addFormSubmit());
    });
  };
}

export function patchVacancy(id, vacancy) {
  return dispatch => {
    vacanyService.patchVacancy(id, vacancy).then(res => {
      dispatch(editFormSubmit());
    });
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter
  };
}

export function getVacancyById(id) {
  return dispatch => {
    vacanyService.getVacancyById(id).then(res => {
      dispatch(addCurrentVacancy(res.data));
    });
  };
}
