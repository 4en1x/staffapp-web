const fecha = require('fecha');

function createVacancy(reqBody) {
  const { skills, city } = reqBody;
  const vacancy = Object.assign({}, reqBody);
  delete vacancy.skills;
  delete vacancy.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  vacancy.createdDate = date;

  return {
    vacancy,
    skills,
    city,
  };
}

function updateVacancy(reqBody) {
  const { skills, city } = reqBody;
  const vacancy = Object.assign({}, reqBody);
  delete vacancy.skills;
  delete vacancy.city;

  return {
    vacancy,
    skills,
    city,
  };
}

module.exports = {
  createVacancy,
  updateVacancy,
};
