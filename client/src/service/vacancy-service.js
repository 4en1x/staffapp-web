import axios from 'axios';

axios.defaults.withCredentials = true;

function getVacancyList(filter, p = 1) {
  return axios.get(`/vacancies?p=${p}`);
}

function getVacancyById(id) {
  return axios.get(`${id}`);
}

const vacancyService = {
  getVacancyById,
  getVacancyList
};

export default vacancyService;
