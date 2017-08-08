const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');
const service = require('../../services/candidates.service');
const hiringsService = require('../../services/hirings.service');
const json2xls = require('json2xls');

class CandidatesController extends CRUDController {
  constructor() {
    super(db.candidates);
  }

  async readOne(req, res) {
    try {
      let candidate = await this.dao.findById(req.params.id);
      candidate = service.rebuildCandidate(candidate);
      res.json(candidate);
    } catch (err) {
      if (err.message === '404') {
        res.status(404).end();
        return;
      }

      res.status(500).end();
    }
  }

  async readHistoryById(req, res) {
    try {
      res.json(await db.history.findByCandidateId(req.params.id));
    } catch (err) {
      res.status(500).end();
    }
  }

  async pickVacancies(req, res) {
    try {
      const vacancies = await db.candidates.pickVacancies(req.params.id);
      vacancies.forEach((vacancy) => {
        if (vacancy.secondarySkills) {
          vacancy.secondarySkills = vacancy.secondarySkills.split(', ');
        }
      });
      res.json(vacancies);
    } catch (err) {
      res.status(500).end();
    }
  }

  async readHiringsById(req, res) {
    try {
      let hirings = await db.hirings.findByCandidate(req.params.id);
      hirings = await Promise.all(hirings.map(async (hiring) => {
        hiring = await hiringsService.rebuildHiring(hiring);
        hiring = await hiringsService.updateHiringInterviews(hiring);
        return hiring;
      }));
      res.json(hirings);
    } catch (err) {
      res.status(500).end();
    }
  }

  async report(req, res) {
    try {
      const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
      const candidates = await this.dao.report(filter);

      const fileName = `${req.user.id}_${new Date().getTime()}.xlsx`;

      const xls = json2xls(candidates);
      res.setHeader('Content-Type', 'application/vnd.openxmlformates');
      res.setHeader('Content-Disposition', `attachment;filename=${fileName}`);
      res.end(xls, 'binary');
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
        englishLevels: await db.englishLevels.find(),
        statuses: await db.candidateStatuses.find(),
      });
    } catch (err) {
      res.status(500).end();
    }
  }

  async create(req, res) {
    const candidate = service.createCandidate(req.body);
    candidate.userId = req.user.id;
    await super.create(req, res, candidate);
  }

  async update(req, res) {
    const candidate = service.updateCandidate(req.params.id, req.body);
    await super.update(req, res, candidate);
  }
}

module.exports = CandidatesController;
