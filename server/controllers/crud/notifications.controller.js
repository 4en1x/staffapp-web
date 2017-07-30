const fecha = require('fecha');

const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class NotificationsController extends CRUDController {
  constructor() {
    super(db.notifications);
  }

  async read(req, res) {
    const page = req.query.page;
    const id = req.user.id;
    const dateFrom = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    const dateTo = fecha.format(new Date(Date.now() + 3600000), 'YYYY-MM-DD HH:mm:ss');

    try {
      const notifications = await this.dao.read(page, id, dateFrom, dateTo);

      if (!notifications) {
        res.json([]);
        return;
      }

      res.json(notifications);
    } catch (err) {
      res.status(500).end();
    }
  }
  
}

module.exports = NotificationsController;
