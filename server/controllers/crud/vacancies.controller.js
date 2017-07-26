const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
const service = require('../../services/vacancies.service');

class VacanicesController extends CRUDController {
  constructor() {
    super(db.vacancies);
  }

  async create(req, res) {
    const vacancy = service.createVacancy(req.body);
    await super.create(req, res, vacancy);
  }

  async update(req, res) {
    await super.update(req, res, req.body);
  }
}

module.exports = VacanicesController;
