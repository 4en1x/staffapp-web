const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
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
      if (vacancy.jobStart) {
        vacancy.jobStart = fecha.format(vacancy.jobStart, 'DD/MM/YYYY');
      }

      vacancy.createdDate = fecha.format(vacancy.createdDate, 'DD/MM/YYYY');
    };

    await super.readOne(req, res, onload);
  }

  async fillLists(req, res) {
    try {
      res.json({
        primarySkills: await db.skills.find('primary'),
        secondarySkills: await db.skills.find('secondary'),
        cities: await db.cities.find(),
        statuses: await db.vacancyStatuses.find(),
      });
    } catch (err) {
      res.status(500).end();
    }
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
