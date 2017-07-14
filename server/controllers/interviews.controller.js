const interviewsDB = require('./../dao/interviews');
const feedbacksDB = require('./../dao/feedbacks');
const convertKeys = require('convert-keys');

async function readFeedbacks(ids) {
  const feedbacks = await Promise.all(ids.map(async (id) => {
    const feedback = await feedbacksDB.getFeedbackById(id);
    return feedback;
  }));
  return feedbacks;
}

async function readInterview(req, res) {
  const id = req.params.id;
  try {
    const interview = await interviewsDB.getInterviewById(id);
    if (!interview) {
      return res.status(404).end();
    }
    const feedbackIds = await feedbacksDB.getMyFeedbackByInterviewId(id);
    const feedbacks = await readFeedbacks(feedbackIds);
    interview.feedbacks = feedbacks;
    return res.status(200).send(convertKeys.toCamel(interview));
  } catch (err) {
    return res.status(500).end();
  }
}

async function readInterviews(req, res) {
  const actions = {
    my: interviewsDB.getInterviewsByUserId,
    assigned: interviewsDB.getAssignedInterviews,
    all: interviewsDB.getAllInterviews,
  };
  // TODO: change to: const id = req.session.user.id;
  const id = 0;
  const page = req.query.page;

  try {
    const interviews = await actions[req.query.type](id, page);
    if (!interviews) {
      return res.status(200).send({ founded: false });
    }
    return res.status(200).send(convertKeys.toCamel(interviews));
  } catch (err) {
    return res.status(500).end();
  }
}

async function deleteInterview(req, res) {
  try {
    await interviewsDB.deleteInterview(req.params.id);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}

async function updateInterview(req, res) {
  try {
    await interviewsDB.updateInterview(req.params.id, convertKeys.toSnake(req.body));
    return res.status(200).end();
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
