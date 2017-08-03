const { date } = require('../../utils');

const CRUDController = require('../crud.controller');
const db = require('../../dao/dao');

class NotificationsController extends CRUDController {
  constructor() {
    super(db.notifications);
  }

  async update(req, res) {
    const READ_MESSAGE_STATUS = 2;
    await super.update(req, res, { status: READ_MESSAGE_STATUS });
  }

  async read(req, res) {
    const page = req.query.page;
    const id = req.user.id;
    const dateTo = date.getSQL(new Date(Date.now() + 3600000));
    const dateFrom = date.getSQL(new Date());

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
