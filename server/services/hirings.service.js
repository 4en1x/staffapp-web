const fecha = require('fecha');
const { clearFields } = require('../utils');
const FeedbacksDAO = require('../dao/impl/feedbacks.dao');
const InterviewsDAO = require('../dao/impl/interviews.dao');
const CandidatesDAO = require('../dao/impl/candidates.dao');

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

async function updateHiringInterviews(hiring) {
  hiring.interviews = await Promise.all(
    hiring.interviews.map(async (interview) => {
      interview.feedbacks = await FeedbacksDAO.instance.findByInterview(interview.id);
      interview.candidate = await CandidatesDAO.instance.findByFeedback(interview.feedbacks[0]);
      interview.time = fecha.format(interview.date, 'HH:mm');
      interview.date = fecha.format(interview.date, 'DD/MM/YYYY');
      return interview;
    }));
  return hiring;
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

function rebuildHiring(hiring) {
  hiring.vacancyName = hiring.vacancyName || 'Passed hiring process to the company';
  hiring.timeOpen = fecha.format(hiring.dateOpen, 'HH:mm');
  hiring.dateOpen = fecha.format(hiring.dateOpen, 'DD-MM-YYYY');
  hiring.timeClose = hiring.dateClose
    ? fecha.format(hiring.dateClose, 'HH:mm')
    : null;
  hiring.dateClose = hiring.dateClose
    ? fecha.format(hiring.dateClose, 'DD-MM-YYYY')
    : null;
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
