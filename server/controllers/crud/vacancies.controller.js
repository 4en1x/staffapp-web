const CRUDController = require('../crud.controller');
const db = require('../../dao');
const service = require('../../services/vacancies.service');
const fecha = require('fecha');

class VacanicesController extends CRUDController {
  constructor() {
    super(db.vacancies);
  }

  async read(req, res) {
    try {
      const resources = await this.dao.read(req.query.page);
      console.log(resources);
      resources.map((resourse) => {
        if (resourse.jobStart) { resourse.jobStart = fecha.format(resourse.jobStart, 'DD/MM/YYYY'); }
        return resourse;
      });
      res.json(resources);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
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
