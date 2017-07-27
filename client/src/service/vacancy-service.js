import axios from 'axios';

axios.defaults.withCredentials = true;

function getVacancyList(filter = {}) {
  return axios.get(`/vacancies?p=1`, {
    params: {
      filter: JSON.stringify(filter)
    }
  });
}

function getVacancyById(id) {
  return axios.get(`${id}`);
}

const vacancyService = {
  getVacancyById,
  getVacancyList
};

export default vacancyService;
