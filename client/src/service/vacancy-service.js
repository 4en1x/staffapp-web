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

function postVacancy(vacancy) {
  return axios.post(`/vacancies`, vacancy);
}

function patchVacancy(id, vacancy) {
  return axios.patch(`/vacancies/${id}`, vacancy);
}

function deleteCurrentVacancy(id) {
  return axios.delete(`/vacancies/${id}`);
}

const vacancyService = {
  getVacancyById,
  getVacancyList,
  postVacancy,
  patchVacancy,
  getVacancyFillList,
  deleteCurrentVacancy
};

export default vacancyService;
