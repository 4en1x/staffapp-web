const db = require('../dao');
const { toCamel, toSnake } = require('convert-keys');
const feedbacksService = require('../services/feedbacks.service');

async function readInterview(req, res) {
  const id = req.params.id;

  try {
    const interview = await db.interviews.readOne(id);

    if (!interview) {
      return res.status(404).end();
    }

    interview.feedbacks = await feedbacksService.readFeedbacks(interview.feedbacks);

    return res.send(toCamel(interview));
  } catch (err) {
    return res.status(500).end();
  }
}

async function readInterviews(req, res) {
  const actions = {
    my: db.interviews.readPageToUser,
    assigned: db.interviews.readPageFromUser,
    all: db.interviews.readPageAll,
  };

  const id = req.user.id;
  const page = req.query.page;

  try {
    const interviews = await actions[req.query.type](id, page);

    if (!interviews) {
      return res.send({ found: false });
    }

    return res.send(toCamel(interviews));
  } catch (err) {
    return res.status(500).end();
  }
}

async function deleteInterview(req, res) {
  try {
    await db.interviews.delete(req.params.id);
    return res.end();
  } catch (err) {
    return res.status(500).end();
  }
}

async function updateInterview(req, res) {
  try {
    await db.interviews.update(req.params.id, toSnake(req.body));
    return res.end();
  } catch (err) {
    return res.status(500).end();
  }
}

module.exports = {
  readInterview,
  readInterviews,
  deleteInterview,
  updateInterview,
};
