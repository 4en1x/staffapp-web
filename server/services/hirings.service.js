const fecha = require('fecha');
const { clearFields } = require('../utils');
const FeedbacksDAO = require('../dao/impl/feedbacks.dao');
const InterviewsDAO = require('../dao/impl/interviews.dao');

async function createInterviews(interviews = [], hiringId, userId) {
  await Promise.all(interviews.map(async (interview) => {
    interview.hiringId = hiringId;
    interview.date = fecha.format(new Date(interview.date), 'YYYY-MM-DD HH:mm:ss');
    await InterviewsDAO.instance.create(interview, userId);
  }));
}

async function addInterviewsToHiring(id) {
  const interviews = await InterviewsDAO.instance.findByHiring(id);
  await Promise.all(interviews.map(async (interview) => {
    const feedbacks = await FeedbacksDAO.instance.findByInterview(interview.id);
    await Promise.all(feedbacks.map(async (feedback, index) => {
      feedbacks[index] = await FeedbacksDAO.instance.findById(feedback);
      feedbacks[index].fields = clearFields(feedbacks[index].fields);
    }));
    interview.feedbacks = feedbacks;
  }));
  return interviews;
}

function createHiringObject(req) {
  return {
    userId: req.user.id,
    dateOpen: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    candidateId: req.body.candidateId,
  };
}

function createHiringUpdateObject(reqBody) {
  if (reqBody.vacancyId) {
    return reqBody;
  }

  return {
    dateClose: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
  };
}

module.exports = {
  createInterviews,
  createHiringObject,
  createHiringUpdateObject,
  addInterviewsToHiring,
};
