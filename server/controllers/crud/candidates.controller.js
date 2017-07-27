const CRUDController = require('../crud.controller');
const db = require('../../dao');
const service = require('../../services/candidates.service');

class CandidatesController extends CRUDController {
  constructor() {
    super(db.candidates);
  }

  async readOne(req, res) {
    try {
      let candidate = await this.dao.readOne(req.params.id);
      candidate = service.rebuildCandidate(candidate);
      res.json(candidate);
    } catch (err) {
      res.status(500).end();
    }
  }

  async create(req, res) {
    const { candidate, links, city } = service.createCandidate(req.body);
    candidate.userId = req.user.id;
    await super.create(req, res, { candidate, links, city });
  }

  async update(req, res) {
    const { candidate, links, city, skills } = service.updateCandidate(req.params.id, req.body);
    await super.update(req, res, { candidate, links, city, skills });
  }
}

module.exports = CandidatesController;
