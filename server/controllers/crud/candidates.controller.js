const CRUDController = require('../crud.controller');
const service = require('../../services/candidates.service');

class CandidatesController extends CRUDController {
  constructor() {
    super('candidates');
  }

  async create(req, res) {
    const { candidate, links, city } = service.createCandidate(req.body);
    candidate.userId = req.user.id;
    await super.create(req, res, { candidate, links, city });
  }

  async update(req, res) {
    const { candidate, links, city } = service.updateCandidate(req.params.id, req.body);
    await super.update(req, res, { candidate, links, city });
  }
}

module.exports = CandidatesController;
