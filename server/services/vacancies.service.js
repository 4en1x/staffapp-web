const utils = require('../utils');

function createVacancy(vacancy) {
  const date = utils.date.getSQL(new Date());
  vacancy.createdDate = date;

  return vacancy;
}

module.exports = {
  createVacancy,
};
