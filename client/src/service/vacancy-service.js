import axios from 'axios';

axios.defaults.withCredentials = true;

function getVacancyList(filter = {}, page=1) {
  return axios.get(`/vacancies?page=${page}`, {
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

function getVacancyCandidates(url) {
  return axios.get(`${url}/pickCandidates`);
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
