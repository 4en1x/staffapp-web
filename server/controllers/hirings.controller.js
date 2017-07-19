const db = require('../dao');
const service = require('../services/hirings.service');

async function createHiring(req, res) {
  const hiring = service.createHiringObject(req);
  let id = null;

  try {
    const hirings = await db.hirings.readByCandidate(req.query.candidate);

    if (hirings.length) {
      res.send({
        added: false,
        message: 'candidate already has hiring',
      });
      return;
    }

    id = await db.hirings.create(hiring);
    await service.createInterviews(req.body.interviews, id, req.query.candidate);

    res.send({
      added: true,
    });
  } catch (err) {
    if (!id) {
      res.status(500).end();
      return;
    }

    try {
      await db.hirings.delete(id);
      res.status(500).end();
    } catch (error) {
      res.status(500).end();
    }
  }
}

async function readHiring(req, res) {
  try {
    const hiring = await db.hirings.readOne(req.params.id);

    if (!hiring) {
      res.status(404).end();
      return;
    }

    hiring.interviews = await db.interviews.readByHiring(req.params.id);

    res.send(hiring);
  } catch (err) {
    res.status(500).end();
  }
}

async function readHirings(req, res) {
  try {
    const result = await db.hirings.readByCandidate(req.query.id);

    if (!result) {
      res.send({ found: false });
      return;
    }

    res.send(result);
  } catch (err) {
    res.status(500).end();
  }
}

async function updateHiring(req, res) {
  try {
    const hiring = service.createHiringUpdateObject(req.body);
    await db.hirings.update(req.params.id, hiring);
    return res.end();
  } catch (err) {
    return res.status(500).end();
  }
}

async function deleteHiring(req, res) {
  try {
    await db.hirings.delete(req.params.id);
    return res.end();
  } catch (err) {
    return res.status(500).end();
  }
}

module.exports = {
  createHiring,
  readHiring,
  updateHiring,
  readHirings,
  deleteHiring,
};
