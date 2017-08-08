const utils = require('../utils');
const FeedbacksDAO = require('../dao/impl/feedbacks.dao');
const InterviewsDAO = require('../dao/impl/interviews.dao');
const CandidatesDAO = require('../dao/impl/candidates.dao');

async function createInterviews(interviews = [], hiringId, userId) {
  await Promise.all(interviews.map(async (interview) => {
    interview.hiringId = hiringId;
    interview.date = utils.date.getSQL(new Date(interview.date));
    await InterviewsDAO.instance.create(interview, userId);
  }));
}

async function addInterviewsToHiring(id) {
  const interviews = await InterviewsDAO.instance.findByHiring(id);
  await Promise.all(interviews.map(async (interview) => {
    const feedbacks = await FeedbacksDAO.instance.findByInterview(interview.id);
    await Promise.all(feedbacks.map(async (feedback, index) => {
      feedbacks[index] = await FeedbacksDAO.instance.findById(feedback);
      feedbacks[index].fields = utils.clearFields(feedbacks[index].fields);
    }));
    interview.feedbacks = feedbacks;
  }));
  return interviews;
}

async function updateHiringInterviews(hiring) {
  hiring.interviews = await Promise.all(
    hiring.interviews.map(async (interview) => {
      interview.feedbacks = await FeedbacksDAO.instance.findByInterview(interview.id);
      interview.candidate = await CandidatesDAO.instance.findByFeedback(interview.feedbacks[0]);
      return interview;
    }));
  return hiring;
}

function createHiringObject(req) {
  return {
    userId: req.user.id,
    dateOpen: utils.date.getSQL(new Date()),
    candidateId: req.body.candidateId,
    vacancyId: req.body.vacancyId,
  };
}

function createHiringUpdateObject(reqBody) {
  if (reqBody.vacancyId) {
    return reqBody;
  }

  return {
    dateClose: utils.date.getSQL(new Date()),
  };
}

function rebuildHiring(hiring) {
  hiring.vacancyName = hiring.vacancyName || 'Passed hiring process to the company';
  hiring.dateClose = hiring.dateClose || null;
  return hiring;
}

module.exports = {
  createInterviews,
  createHiringObject,
  createHiringUpdateObject,
  addInterviewsToHiring,
  rebuildHiring,
  updateHiringInterviews,
};
