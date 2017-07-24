const CRUDController = require('../crud.controller');
const db = require('../../dao');
const service = require('../../services/vacancies.service');

class VacanicesController extends CRUDController {
  constructor() {
    super(db.vacancies);
  }

  async create(req, res) {
    const { vacancy, skills, city } = service.createVacancy(req.body);
    await super.create(req, res, { vacancy, skills, city });
  }

  async update(req, res) {
    const { vacancy, skills, city } = service.updateVacancy(req.body);
    await super.update(req, res, { vacancy, skills, city });
  }
}

module.exports = VacanicesController;
