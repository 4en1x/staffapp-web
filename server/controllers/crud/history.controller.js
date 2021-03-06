const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class HistoryController extends CRUDController {
  constructor() {
    super(db.history);
  }

  async read(req, res) {
    try {
      let history;
      if (req.user.role === 'admin') {
        const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        history = await this.dao.find(req.query.page, filter);
      } else {
        history = await this.dao.findById(req.query.page, req.user.id);
      }

      res.json(history);
    } catch (err) {
      res.status(500).end();
    }
  }
}

module.exports = HistoryController;
