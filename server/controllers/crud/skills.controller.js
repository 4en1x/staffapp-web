const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class SkillsController extends CRUDController {
  constructor() {
    super(db.skills);
  }

  async read(req, res) {
    try {
      const skills = await db.skills.find(req.query.type);
      res.json(skills);
    } catch (err) {
      res.status(500).end();
    }
  }
}

module.exports = SkillsController;
