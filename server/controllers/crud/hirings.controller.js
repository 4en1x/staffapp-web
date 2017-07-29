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

    const hirings = await this.dao.findByCandidate(hiring.candidateId);

    if (hirings.some(item => !item.dateClose)) {
      res.status(422).end();
      return;
    }

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
      hiring.interviews = await db.interviews.findByHiring(req.params.id);
    };

    await super.readOne(req, res, onload);
  }

  async read(req, res) {
    try {
      if (!req.query.candidate && !req.query.user) {
        res.status(400).end();
        return;
      }
      let result;

      if (req.query.candidate) {
        result = await this.dao.findByCandidate(req.query.candidate);
      } else {
        result = await this.dao.findByUser(req.query.user);
      }

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
    const hiring = service.createHiringUpdateObject(req.body);
    await super.update(req, res, hiring);
  }
}

module.exports = HiringsController;
