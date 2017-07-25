const CRUDController = require('../crud.controller');
const db = require('../../dao');
const service = require('../../services/vacancies.service');
const fecha = require('fecha');

class VacanicesController extends CRUDController {
  constructor() {
    super(db.vacancies);
  }

  async read(req, res) {
    const onload = async (vacancies) => {
      vacancies.forEach((vacancy) => {
        if (vacancy.jobStart) {
          vacancy.jobStart = fecha.format(vacancy.jobStart, 'DD/MM/YYYY');
        }
        return vacancy;
      });
    };

    await super.read(req, res, onload);
  }
  async readOne(req, res) {
    const onload = async (vacancy) => {
      vacancy.jobStart = fecha.format(vacancy.jobStart, 'DD/MM/YYYY');
      vacancy.createdDate = fecha.format(vacancy.createdDate, 'DD/MM/YYYY');
    };

    await super.readOne(req, res, onload);
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
