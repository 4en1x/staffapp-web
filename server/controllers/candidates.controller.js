const db = require('../dao');
const service = require('../services/candidates.service');
const { toCamel, toSnake } = require('convert-keys');

async function readCandidates(req, res) {
  try {
    const candidates = await db.candidates.readPage(req.params.p);
    res.json(toCamel(candidates));
  } catch (err) {
    res.status(500).end();
  }
}

async function readCandidate(req, res) {
  try {
    const candidate = await db.candidates.readOne(req.params.id);
    if (!candidate) {
      res.status(404).end();
    }
    res.json(toCamel(candidate));
  } catch (err) {
    res.status(500).end();
  }
}

async function createCandidate(req, res) {
  const { candidate, links, city } = service.createCandidate(req.body);
  candidate.userId = req.user.id;

  try {
    await db.candidates.create(toSnake(candidate), links, city);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function updateCandidate(req, res) {
  const id = req.params.id;
  const { candidate, links, city } = service.updateCandidate(id, req.body);

  try {
    await db.candidates.update(id, candidate, links, city);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function deleteCandidate(req, res) {
  try {
    await db.candidates.delete(req.params.id);
    res.end();
  } catch (err) {
    if (err.message === '404') {
      res.status(404).end();
      return;
    }
    res.status(500).end();
  }
}

module.exports = {
  readCandidates,
  readCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
