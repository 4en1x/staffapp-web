import vacancyService from '../../service/vacancy-service';

const ADD_VACANCY_LIST = 'ADD_VACANCY_LIST';
const ADD_CURRENT_VACANCY = 'ADD_CURRENT_VACANCY';
const ADD_FORM_VALUES = 'ADD_FORM_VALUES';
const FORM_SUBMIT = 'FORM_SUBMIT';
const ADD_FILTER = 'ADD_FILTER';
const FILTER_VALUES = 'FILTER_VALUES';
const RESET_VACANCY_LIST = 'RESET_VACANCY_LIST';
const RESET_CURRENT_VACANCY = 'RESET_CURRENT_VACANCY';
const RESET_FORM = 'RESET_FORM';
const RESET_DELETED_VACANCY = 'RESET_DELETED_VACANCY';

function addVacancyList(list) {
  return {
    type: ADD_VACANCY_LIST,
    list
  };
}

export function getVacancyList(filter, page) {
  return dispatch => {
    vacancyService.getVacancyList(filter, page).then(res => {
      dispatch(addVacancyList(res.data));
    });
  };
}

function addCurrentVacancy(vacancy) {
  return {
    type: ADD_CURRENT_VACANCY,
    vacancy
  };
}

export function getVacancyById(id) {
  return dispatch => {
    vacancyService.getVacancyById(id).then(res => {
      dispatch(addCurrentVacancy(res.data));
    });
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

function addFormValues(formValues) {
  return {
    type: ADD_FORM_VALUES,
    formValues
  };
}

export function getVacancyFormValues() {
  return dispatch => {
    vacancyService.getVacancyFillList().then(res => {
      dispatch(addFormValues(res.data));
    });
  };
}

function formSubmit() {
  return {
    type: FORM_SUBMIT
  };
}

export function postVacancy(vacancy) {
  return dispatch => {
    vacancyService.postVacancy(vacancy).then(res => {
      dispatch(formSubmit());
    });
  };
}

export function patchVacancy(id, vacancy) {
  return dispatch => {
    vacancyService.patchVacancy(id, vacancy).then(res => {
      console.log('lalalalla');
      dispatch(formSubmit());
    });
  };
}

export function addFilter(filter) {
  return {
    type: ADD_FILTER,
    filter
  };
}

export function deleteCurrentVacancy(id) {
  return dispatch => {
    vacancyService.deleteCurrentVacancy(id).then(res => {
      dispatch(resetCurrentVacancy());
    });
  };
}

export function resetVacancyList() {
  return {
    type: RESET_VACANCY_LIST
  };
}

export function resetCurrentVacancy() {
  return {
    type: RESET_CURRENT_VACANCY
  };
}

export function resetForm() {
  return {
    type: RESET_FORM
  };
}

export function resetDeletedVacancy() {
  return {
    type: RESET_DELETED_VACANCY
  }
}

