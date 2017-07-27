const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class EnglishLevelsController extends CRUDController {
  constructor() {
    super(db.englishLevels);
  }
}

module.exports = EnglishLevelsController;
