const db = require('../dao');
const { toCamel, toSnake } = require('convert-keys');
const feedbacksService = require('../services/feedbacks.service');
const fecha = require('fecha');

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

      interview.time = fecha.format(interview.date,'hh:mm');
      interview.date = fecha.format(interview.date,'DD-MM-YYYY');


    interview.feedbacks = await feedbacksService.readFeedbacks(interview.feedbacks);
    res.json(toCamel(interview));
  } catch (err) {
    console.log(err)
    res.status(500).end();
  }
}

async function readInterviews(req, res) {
  const actions = {
    my: db.interviews.readPageToUser,
    assigned: db.interviews.readPageFromUser,
    all: db.interviews.readPageAll,
  };

  const page = req.query.page;
  const id = req.user.id;

  if (req.query.type !== 'my' && req.user.role === 'user') {
    res.status(403).end();
    return;
  }

  try {
    let interviews = await actions[req.query.type].call(db.interviews, id, page);

    if (!interviews) {
      res.json([]);
      return;
    }
    interviews = interviews.map(item=>{
      item.time = fecha.format(item.date,'hh:mm');
      item.date = fecha.format(item.date,'DD-MM-YYYY');
      return item;
    })
    res.json(toCamel(interviews));
  } catch (err) {
    console.log(err)
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
    await db.interviews.update(req.params.id, toSnake(req.body));
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
