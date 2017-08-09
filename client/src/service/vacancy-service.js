import axios from 'axios';

axios.defaults.withCredentials = true;

function getVacancyList(filter = {}, page=1) {
  return axios.get(`/rest/vacancies?page=${page}`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getVacancyById(id) {
  return axios.get(`/rest/vacancies/${id}`);
}

function getVacancyFillList() {
  return axios.get(`/rest/vacancies/fillLists`);
}

function postVacancy(vacancy) {
  return axios.post(`/rest/vacancies`, vacancy);
}

function patchVacancy(id, vacancy) {
  return axios.patch(`/rest/vacancies/${id}`, vacancy);
}

function deleteCurrentVacancy(id) {
  return axios.delete(`/rest/vacancies/${id}`);
}

function getVacancyCandidates(url) {
  return axios.get(`/rest${url}/pickCandidates`);
}

const vacancyService = {
  getVacancyById,
  getVacancyList,
  postVacancy,
  patchVacancy,
  getVacancyFillList,
  deleteCurrentVacancy,
  getVacancyCandidates
};

export default vacancyService;
