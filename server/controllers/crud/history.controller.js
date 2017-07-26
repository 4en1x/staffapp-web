const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class HistoryController extends CRUDController {
  constructor() {
    super(db.history);
  }
}

module.exports = HistoryController;
