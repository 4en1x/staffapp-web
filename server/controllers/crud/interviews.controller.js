const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
const feedbacksService = require('../../services/feedbacks.service');
const fecha = require('fecha');

class InterviewsController extends CRUDController {
  constructor() {
    super(db.interviews);
  }

  async readOne(req, res) {
    const onload = async (interview) => {
      const assignedToUser = interview.users.some(user => user.id === req.user.id);

      if (!assignedToUser && req.user.role === 'user') {
        throw new Error('403');
      }

      interview.feedbacks = await feedbacksService.readFeedbacks(interview.feedbacks);

      interview.time = fecha.format(interview.date, 'HH:mm');
      interview.date = fecha.format(interview.date, 'DD/MM/YYYY');
    };

    await super.readOne(req, res, onload);
  }

  async read(req, res) { // TODO: refactor (next PR)
    const actions = {
      my: this.dao.readAssignedTo,
      assigned: this.dao.readCreatedBy,
      all: this.dao.readAll,
    };

    const page = req.query.page;
    const id = req.user.id;

    if ((req.query.type || 'my') !== 'my' && req.user.role === 'user') {
      res.status(403).end();
    }

    try {
      const interviews = await actions[req.query.type || 'my'].call(db[this.daoName], id, page);

      if (!interviews) {
        res.json([]);
        return;
      }

      interviews.forEach((interview) => {
        interview.time = fecha.format(interview.date, 'HH:mm');
        interview.date = fecha.format(interview.date, 'DD/MM/YYYY');
      });

      res.json(interviews);
    } catch (err) {
      res.status(500).end();
    }
  }

  async update(req, res) {
    await super.update(req, res, req.body);
  }
}

module.exports = InterviewsController;
