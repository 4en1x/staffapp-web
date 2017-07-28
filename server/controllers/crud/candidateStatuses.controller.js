const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class CandidateStatusesController extends CRUDController {
  constructor() {
    super(db.candidateStatuses);
  }
}

module.exports = CandidateStatusesController;
