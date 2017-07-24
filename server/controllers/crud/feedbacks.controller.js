const CRUDController = require('../crud.controller');
const db = require('../../dao');

class FeedbacksController extends CRUDController {
  constructor() {
    super(db.feedbacks);
  }

  async readOne(req, res) {
    const onload = async (feedback) => {
      if (feedback.userId !== req.user.id && req.user.role === 'user') {
        throw new Error('403');
      }
    };

    await super.readOne(req, res, onload);
  }

  async update(req, res) {
    try {
      const feedback = await this.dao.readOne(req.params.id);
      if (feedback.userId !== req.user.id) {
        res.status(403).end();
        return;
      }
      await super.update(req, res, { comment: req.body.comment, fields: req.body.fields });
    } catch (err) {
      res.status(500).end();
    }
  }
}

module.exports = FeedbacksController;
