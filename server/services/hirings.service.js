const db = require('../dao');
const { toSnake } = require('convert-keys');
const fecha = require('fecha');

async function createInterviews(interviews, hiringId, candidateId) {
  await Promise.all(interviews.map(async (item) => {
    item.interview.hiringId = hiringId;

    await db.interviews.create({
      interview: toSnake(item.interview),
      users: item.users,
      candidateId,
      feedbackFeilds: toSnake(item.feedbackFields),
    });
  }));
}

function createHiringObject(req) {
  return toSnake({
    userId: req.user.id,
    dateOpen: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    candidateId: req.query.candidate,
  });
}

function createHiringUpdateObject(reqBody) {
  if (reqBody.vacancyId) {
    return toSnake(reqBody);
  }

  return toSnake({
    dateClose: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
  });
}

module.exports = {
  createInterviews,
  createHiringObject,
  createHiringUpdateObject,
};
