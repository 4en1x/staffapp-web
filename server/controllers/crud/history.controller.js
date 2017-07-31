const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');
const fecha = require('fecha');

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
      history = history.map((element) => {
        element.date = fecha.format(element.time, 'DD-MM-YYYY');
        element.time = fecha.format(element.time, 'HH:mm');
        return element;
      });
      res.json(history);
    } catch (err) {
      res.status(500).end();
    }
  }
}

module.exports = HistoryController;
