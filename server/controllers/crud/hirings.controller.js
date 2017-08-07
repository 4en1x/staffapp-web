const CRUDController = require('../crud.controller');

const db = require('../../dao/dao');
const service = require('../../services/hirings.service');

class HiringsController extends CRUDController {
  constructor() {
    super(db.hirings);
  }

  async create(req, res) {
    const hiring = service.createHiringObject(req);
    let id = null;

    const onload = async (insertId) => {
      id = insertId;
      await service.createInterviews(req.body.interviews, id, req.user.id);
    };

    const onerror = async () => {
      if (!id) {
        return true;
      }

      try {
        await this.dao.delete(id);
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
      const interviews = await db.interviews.findByHiring(req.params.id);
      hiring = service.rebuildHiring(hiring);
      hiring.interviews = interviews;
    };

    await super.readOne(req, res, onload);
  }

  async read(req, res) {
    try {
      if (!req.query.candidate && !req.query.user) {
        res.status(400).end();
        return;
      }
      let hirings;

      if (req.query.candidate) {
        hirings = await this.dao.findByCandidate(req.query.candidate);
      } else {
        hirings = await this.dao.findByUser(req.query.user);
      }

      if (!hirings) {
        res.status(404).end();
        return;
      }

      hirings = hirings.map(hiring => service.rebuildHiring(hiring));

      res.json(hirings);
    } catch (err) {
      res.status(500).end();
    }
  }

  async update(req, res) {
    const hiring = service.createHiringUpdateObject(req.body);
    await super.update(req, res, hiring);
  }
}

module.exports = HiringsController;
