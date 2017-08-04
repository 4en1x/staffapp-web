const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
const service = require('../../services/vacancies.service');
const utils = require('../../utils');

class VacanicesController extends CRUDController {
  constructor() {
    super(db.vacancies);
  }

  async read(req, res) {
    const onload = async (vacancies) => {
      vacancies.forEach((vacancy) => {
        if (vacancy.jobStart) {
          vacancy.jobStart = utils.date.getDate(vacancy.jobStart);
        }
        return vacancy;
      });
    };

    await super.read(req, res, onload);
  }

  async readOne(req, res) {
    const onload = async (vacancy) => {
      if (vacancy.jobStart) {
        vacancy.jobStart = utils.date.getDate(vacancy.jobStart);
      }

      vacancy.createdDate = utils.date.getDate(vacancy.createdDate);
    };

    await super.readOne(req, res, onload);
  }

  async readHistoryById(req, res) {
    try {
      const history = await db.history.findByVacancyId(req.params.id);

      history.forEach((element) => {
        element.time = utils.date.getTime(element.date);
        element.date = utils.date.getDate(element.date);
      });

      res.json(history);
    } catch (err) {
      res.status(500).end();
    }
  }

  async readCandidatesHistoryById(req, res) {
    try {
      const history = await db.candidates.findByVacancyId(req.params.id);
      res.json(history);
    } catch (err) {
      res.status(500).end();
    }
  }

  async pickCandidates(req, res) {
    try {
      const candidates = await db.vacancies.pickCandidates(req.params.id);

      candidates.forEach((candidate) => {
        if (candidate.lastChangeDate) {
          candidate.lastChangeDate = utils.date.getDate(candidate.lastChangeDate);
        }
      });

      res.json(candidates);
    } catch (err) {
      res.status(500).end();
    }
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
    const vacancyStatus = req.body.status;

    const onload = async () => {
      if (vacancyStatus !== 'Closed' && vacancyStatus !== 'Cancelled') {
        return;
      }

      const candidates = await db.candidates.findByVacancyId(req.params.id);
      await Promise.all(candidates.map(async (candidate) => {
        await db.candidates.attention(candidate.id);
      }));
    };

    await super.update(req, res, req.body, onload);
  }
}

module.exports = VacanicesController;
