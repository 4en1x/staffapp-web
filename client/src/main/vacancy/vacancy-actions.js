import vacancyService from '../../service/vacancy-service';

const ADD_VACANCY_LIST = 'ADD_VACANCY_LIST';
const ADD_CURRENT_VACANCY = 'ADD_CURRENT_VACANCY';
const FORM_LOADED = 'FORM_LOADED';
const EDIT_FORM_SUBMITTED = 'EDIT_FORM_SUBMITTED';
const ADD_FORM_SUBMITTED = 'ADD_FORM_SUBMITTED';
const ADD_FILTER = 'ADD_FILTER';
const FILTER_VALUES = 'FILTER_VALUES';

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
    vacancyService.getVacancyList(filter).then(res => {
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

function addFilterValues(values) {
  return {
    type: FILTER_VALUES,
    values
  };
}

export function getFilterValues() {
  return dispatch =>
    vacancyService.getVacancyFillList().then(res => {
      dispatch(addFilterValues(res.data));
    });
}

export function getVacancyFillList() {
  return dispatch => {
    vacancyService.getVacancyFillList().then(res => {
      dispatch(formLoad(res.data));
    });
  };
}

export function postVacancy(vacancy) {
  return dispatch => {
    vacancyService.postVacancy(vacancy).then(res => {
      dispatch(addFormSubmit());
    });
  };
}

export function patchVacancy(id, vacancy) {
  return dispatch => {
    vacancyService.patchVacancy(id, vacancy).then(res => {
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
    vacancyService.getVacancyById(id).then(res => {
      dispatch(addCurrentVacancy(res.data));
    });
  };
}
