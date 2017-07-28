const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');
const service = require('../../services/candidates.service');

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
