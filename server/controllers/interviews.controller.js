const db = require('../dao');
const feedbacksService = require('../services/feedbacks.service');

async function readInterview(req, res) {
  const id = req.params.id;

  try {
    const interview = await db.interviews.readOne(id);

    if (!interview) {
      res.status(404).end();
      return;
    }

    const assignedToUser = interview.users.some(user => user.id === req.user.id);

    if (!assignedToUser && req.user.role === 'user') {
      res.status(403).end();
      return;
    }

    interview.feedbacks = await feedbacksService.readFeedbacks(interview.feedbacks);
    res.json(interview);
  } catch (err) {
    res.status(500).end();
  }
}

async function readInterviews(req, res) {
  const actions = {
    my: db.interviews.readAssignedTo,
    assigned: db.interviews.readCreatedBy,
    all: db.interviews.readAll,
  };

  const page = req.query.page;
  const id = req.user.id;

  if (req.query.type !== 'my' && req.user.role === 'user') {
    res.status(403).end();
  }

  try {
    const interviews = await actions[req.query.type](id, page);

    if (!interviews) {
      res.json([]);
      return;
    }

    res.json(interviews);
  } catch (err) {
    res.status(500).end();
  }
}

async function deleteInterview(req, res) {
  try {
    await db.interviews.delete(req.params.id);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function updateInterview(req, res) {
  try {
    await db.interviews.update(req.params.id, req.body);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

module.exports = {
  readInterview,
  readInterviews,
  deleteInterview,
  updateInterview,
};
