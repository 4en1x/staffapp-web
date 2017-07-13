const hiringsDB = require('./../dao/hirings');
const interviewsDB = require('./../dao/interviews');
const fecha = require('fecha');

async function writeInterviews(interviews, hiringID, candidateID) {
  await Promise.all(interviews.map(async (item) => {
    item.interview.hiring_id = hiringID;
    await interviewsDB.addInterview(item.interview, item.users, candidateID, item.feedbackFields);
  }));
}

function createHiringObject(req) {
  return {
    user_id: req.session.user.id,
    date_open: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    candidate_id: req.query.candidate,
  };
}

async function writeHiring(req, res) {
  const hiringObject = createHiringObject(req);
  let hiringID = null;
  try {
    const hasHirings = await hiringsDB.isAnyOpenHiringsForCandidate(req.query.candidate);
    if (hasHirings) {
      return res.status(400).end('candidate already has hiring');
    }
    hiringID = await hiringsDB.addHiring(hiringObject);
    await writeInterviews(req.body.interviews, hiringID, req.query.candidate);
    return res.status(201).end();
  } catch (err) {
    if (!hiringID) {
      return res.status(500).end();
    }
    try {
      await hiringsDB.deleteHiring(hiringID);
      return res.status(500).end();
    } catch (error) {
      return res.status(500).end();
    }
  }
}

async function getInterviewsByIDs(ids) {
  const interviews = await Promise.all(ids.map(async (item) => {
    const interview = await interviewsDB.getInterviewById(item);
    return interview;
  }));
  return interviews;
}

async function readHiring(req, res) {
  try {
    const hiring = await hiringsDB.getHiringByID(req.params.id);
    if (!hiring) {
      return res.status(404).end();
    }
    const interviewsIDs = await interviewsDB.getInterviewsByHiringId(req.params.id);
    hiring.interviews = await getInterviewsByIDs(interviewsIDs);
    return res.status(200).send(hiring);
  } catch (err) {
    return res.status(500).end();
  }
}

async function readHirings(req, res) {
  try {
    const result = await hiringsDB.getHiringsByCandidateId(req.query.id);
    if (!result) {
      return res.status(404).end();
    }
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).end();
  }
}

function createHiringUpdateObject(req) {
  if (req.body.vacancy_id) {
    return req.body;
  }
  return {
    date_close: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
  };
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
