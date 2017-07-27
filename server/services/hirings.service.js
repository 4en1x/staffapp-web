const db = require('../dao');
const fecha = require('fecha');

async function createInterviews(interviews, hiringId, candidateId) {
  await Promise.all(interviews.map(async (item) => {
    item.interview.hiringId = hiringId;

    await db.interviews.create({
      interview: item.interview,
      users: item.users,
      candidateId,
      feedbackFeilds: item.feedbackFields,
    });
  }));
}

function createHiringObject(req) {
  return {
    userId: req.user.id,
    dateOpen: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    candidateId: req.query.candidate,
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
