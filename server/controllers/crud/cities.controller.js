const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class CitiesController extends CRUDController {
  constructor() {
    super(db.cities);
  }
}

module.exports = CitiesController;
