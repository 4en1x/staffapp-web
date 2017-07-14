const hiringsDB = require('./../dao/hirings');
const interviewsDB = require('./../dao/interviews');
const convertKeys = require('convert-keys');
const fecha = require('fecha');

async function writeInterviews(interviews, hiringId, candidateId) {
  await Promise.all(interviews.map(async (item) => {
    item.interview.hiringId = hiringId;
    await interviewsDB.addInterview(convertKeys.toSnake(item.interview),
      item.users, candidateId, convertKeys.toSnake(item.feedbackFields));
  }));
}

function createHiringObject(req) {
  return convertKeys.toSnake({
    userId: req.session.user.id,
    dateOpen: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    candidateId: req.query.candidate,
  });
}

async function writeHiring(req, res) {
  const hiringObject = createHiringObject(req);
  let hiringId = null;
  try {
    const hasHirings = await hiringsDB.isAnyOpenHiringsForCandidate(req.query.candidate);
    if (hasHirings) {
      return res.status(200).send({
        added: false,
        message: 'candidate already has hiring',
      });
    }
    hiringId = await hiringsDB.addHiring(hiringObject);
    await writeInterviews(req.body.interviews, hiringId, req.query.candidate);
    return res.status(200).end();
  } catch (err) {
    if (!hiringId) {
      return res.status(500).end();
    }
    try {
      await hiringsDB.deleteHiring(hiringId);
      return res.status(500).end();
    } catch (error) {
      return res.status(500).end();
    }
  }
}

async function getInterviewsByIds(ids) {
  const interviews = await Promise.all(ids.map(async (item) => {
    const interview = await interviewsDB.getInterviewById(item);
    return convertKeys.toCamel(interview);
  }));
  return interviews;
}

async function readHiring(req, res) {
  try {
    const hiring = await hiringsDB.getHiringById(req.params.id);
    if (!hiring) {
      return res.status(404).end();
    }
    const interviewIds = await interviewsDB.getInterviewsByHiringId(req.params.id);
    hiring.interviews = await getInterviewsByIds(interviewIds);
    return res.status(200).send(convertKeys.toCamel(hiring));
  } catch (err) {
    return res.status(500).end();
  }
}

async function readHirings(req, res) {
  try {
    const result = await hiringsDB.getHiringsByCandidateId(req.query.id);
    if (!result) {
      return res.status(200).send({ founded: false });
    }
    return res.status(200).send(convertKeys.toCamel(result));
  } catch (err) {
    return res.status(500).end();
  }
}

function createHiringUpdateObject(req) {
  if (req.body.vacancyId) {
    return convertKeys.toSnake(req.body);
  }
  return convertKeys.toSnake({
    dateClose: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
  });
}

async function updateHiring(req, res) {
  const body = createHiringUpdateObject(req);
  try {
    await hiringsDB.updateHiring(req.params.id, body);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}

async function deleteHiring(req, res) {
  try {
    await hiringsDB.deleteHiring(req.params.id);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}

module.exports = {
  writeHiring,
  readHiring,
  updateHiring,
  readHirings,
  deleteHiring,
};
