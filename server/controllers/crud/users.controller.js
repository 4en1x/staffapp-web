const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class UsersController extends CRUDController {
  constructor() {
    super(db.users);
  }
}

module.exports = UsersController;
