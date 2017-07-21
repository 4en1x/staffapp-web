const fecha = require('fecha');
const { toSnake } = require('convert-keys');

function createVacancy(reqBody) {
  const { skills, city } = reqBody;
  const vacancy = Object.assign({}, reqBody);
  delete vacancy.skills;
  delete vacancy.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  vacancy.createdDate = date;

  return toSnake({
    vacancy,
    skills,
    city,
  });
}

function updateVacancy(reqBody) {
  const { skills, city } = reqBody;
  const vacancy = Object.assign({}, reqBody);
  delete vacancy.skills;
  delete vacancy.city;

  return toSnake({
    vacancy,
    skills,
    city,
  });
}

module.exports = {
  createVacancy,
  updateVacancy,
};
