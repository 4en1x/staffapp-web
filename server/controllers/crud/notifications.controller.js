const fecha = require('fecha');

const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class NotificationsController extends CRUDController {
  constructor() {
    super(db.notifications);
  }

  async update(req, res) {
    await super.update(req, res, { status: 2 });
  }

  async read(req, res) {
    const page = req.query.page;
    const id = req.user.id;
    const dateTo = fecha.format(Date.now() + 3600000 * 4, 'YYYY-MM-DD HH:mm:ss');
    const dateFrom = fecha.format(Date.now() + 3600000 * 3, 'YYYY-MM-DD HH:mm:ss');

    try {
      const notifications = await this.dao.findByUser(id, page, dateFrom, dateTo);

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
