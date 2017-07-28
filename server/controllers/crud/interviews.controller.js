const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
const feedbacksService = require('../../services/feedbacks.service');
const fecha = require('fecha');

class InterviewsController extends CRUDController {
  constructor() {
    super(db.interviews);
  }

  async create(req, res) {
    await super.create(req, res, req.body);
  }

  async readOne(req, res) {
    const onload = async (interview) => {
      const assignedToUser = interview.users.some(user => user.id === req.user.id);

      if (!assignedToUser && req.user.role === 'user') {
        throw new Error('403');
      }

      ({
        allFeedbacks: interview.feedbacks,
        userFeedback: interview.userFeedback,
      } = await feedbacksService.readFeedbacks(interview.feedbacks, req.user.id));

      if (interview.date) {
        interview.time = fecha.format(interview.date, 'HH:mm');
        interview.date = fecha.format(interview.date, 'DD/MM/YYYY');
      }
    };

    await super.readOne(req, res, onload);
  }

  async read(req, res) {
    const actions = {
      my: this.dao.findAssignedToUser,
      assigned: this.dao.findCreatedByUser,
      all: this.dao.findAllByUser,
    };

    const page = req.query.page;
    const id = req.user.id;

    if ((req.query.type || 'my') !== 'my' && req.user.role === 'user') {
      res.status(403).end();
    }

    try {
      const interviews = await actions[req.query.type || 'my'].call(this.dao, id, page);

      if (!interviews) {
        res.json([]);
        return;
      }

      interviews.forEach((interview) => {
        if (interview.date) {
          interview.time = fecha.format(interview.date, 'HH:mm');
          interview.date = fecha.format(interview.date, 'DD/MM/YYYY');
        }
      });

      res.json(interviews);
    } catch (err) {
      res.status(500).end();
    }
  }

  async fillLists(req, res) {
    try {
      if (req.query.type === 'hr') {
        res.json({
          hr: await db.skills.find('hr'),
        });
      } else {
        res.json({
          primary: await db.skills.find('primary'),
          secondary: await db.skills.find('secondary'),
          other: await db.skills.find('other'),
        });
      }
    } catch (err) {
      res.status(500).end();
    }
  }

  async update(req, res) {
    await super.update(req, res, req.body);
  }
}

module.exports = InterviewsController;
