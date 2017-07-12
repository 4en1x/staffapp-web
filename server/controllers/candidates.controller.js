const db = require('../dao/candidates.dao');

async function readCandidates(req, res) {
  try {
    const candidates = await db.getCandidates(req.params.p);
    res.json(candidates);
  } catch (err) {
    res.status(500).end();
  }
}

async function readCandidate(req, res) {
  try {
    const candidate = await db.candidateById(req.params.id);
    if (!candidate) {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).end();
  }
}

async function writeCandidate(req, res) {
  try {
    await db.addCandidate(req.body);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function updateCandidate(req, res) {
  try {
    await db.updateCandidate(req.body);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

module.export = {
  readCandidates,
  readCandidate,
  writeCandidate,
  updateCandidate,
};
