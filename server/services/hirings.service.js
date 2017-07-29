const db = require('../dao/dao');
const fecha = require('fecha');

async function createInterviews(interviews = [], hiringId, userId) {
  await Promise.all(interviews.map(async (interview) => {
    interview.hiringId = hiringId;
    interview.date = fecha.format(new Date(interview.date), 'YYYY-MM-DD HH:mm:ss');
    await db.interviews.create(interview, userId);
  }));
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
};
