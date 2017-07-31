const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class VacancyStatusesController extends CRUDController {
  constructor() {
    super(db.vacancyStatuses);
  }
}

module.exports = VacancyStatusesController;
