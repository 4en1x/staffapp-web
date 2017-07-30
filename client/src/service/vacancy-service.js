import axios from 'axios';

axios.defaults.withCredentials = true;

function getVacancyList(filter = {}) {
  return axios.get(`/vacancies?page=1`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getVacancyById(id) {
  return axios.get(`http://localhost:3300/vacancies/${id}`);
}

function getVacancyFillList() {
  return axios.get(`/vacancies/fillLists`);
}

function getAddFormValues() {
  return axios.get(`/vacancies/fillLists`);
}

function postVacancy(vacancy) {
  return axios.post(`/vacancies`, vacancy);
}

const vacancyService = {
  getVacancyById,
  getVacancyList,
  getAddFormValues,
  postVacancy,
  getVacancyFillList
};

export default vacancyService;
