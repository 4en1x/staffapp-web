const CRUDController = require('../crud.controller');

const db = require('../../dao');
const service = require('../../services/hirings.service');

class HiringsController extends CRUDController {
  constructor() {
    super('hirings');
  }

  async create(req, res) { // TODO: reengineer it (next PR)
    const hiring = service.createHiringObject(req);
    let id = null;

    const hirings = await db[this.daoName].readByCandidate(req.query.candidate);

    if (hirings.length) {
      throw new Error('500'); // TODO: custom code (next PR)
    }

    const onload = async (insertId) => {
      id = insertId;
      await service.createInterviews(req.body.interviews, id, req.query.candidate);
    };

    const onerror = async () => {
      if (!id) {
        return true;
      }

      try {
        await db[this.daoName].delete(id);
        return true;
      } catch (err) {
        res.status(500).end();
        return false;
      }
    };

    await super.create(req, res, hiring, onload, onerror);
  }

  async readOne(req, res) {
    const onload = async (hiring) => {
      hiring.interviews = await db.interviews.readByHiring(req.params.id);
    };

    await super.readOne(req, res, onload);
  }

  async read(req, res) {
    try {
      const result = await db[this.daoName].readByCandidate(req.query.candidate);

      if (!result) {
        res.status(404).end();
        return;
      }

      res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }

  async update(req, res) {
    const hiring = service.createHiringObject(req.body);
    await super.update(req, res, hiring);
  }
}

module.exports = HiringsController;