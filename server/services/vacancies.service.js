const fecha = require('fecha');

function createVacancy(vacancy) {
  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  vacancy.createdDate = date;

  return vacancy;
}

module.exports = {
  createVacancy,
};
