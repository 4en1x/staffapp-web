const BasicController = require('./basic.controller');

const db = require('../dao');
const service = require('../services/hirings.service');

class HiringsController extends BasicController {
  constructor() {
    super('hirings');
  }

  async readOne(req, res) {
    const onload = async (hiring) => {
      hiring.interviews = await db.interviews.readByHiring(req.params.id);
    };

    await super.readOne(req, res, onload);
  }

  async create(req, res) { // TODO: reengineer
    const hiring = service.createHiringObject(req);
    let id = null;

    const hirings = await db[this.daoName].readByCandidate(req.query.candidate);

    if (hirings.length) {
      throw new Error('custom code'); // TODO: custom code
    }

    const onload = async (insertId) => { // TODO: check context
      id = insertId;
      await service.createInterviews(req.body.interviews, id, req.query.candidate);
    };

    const onerror = async () => {
      if (!id) {
        return true;
      }

      try {
        await db[this.daoName].delete(id); // TODO: check context
        return true;
      } catch (err) {
        res.status(500).end();
        return false;
      }
    };

    await super.create(req, res, hiring, onload, onerror);
  }

  async update(req, res) {
    const hiring = service.createHiringObject(req.body);
    await super.update(req, res, hiring);
  }
}

// // // // // // // // // // // //

async function readHirings(req, res) {
  try {
    const result = await db.hirings.readByCandidate(req.query.candidate);

    if (!result) {
      res.send({ found: false });
      return;
    }

    res.send(result);
  } catch (err) {
    res.status(500).end();
  }
}

// async function deleteHiring(req, res) {
//   try {
//     await db.hirings.delete(req.params.id);
//     return res.end();
//   } catch (err) {
//     return res.status(500).end();
//   }
// }

// async function updateHiring(req, res) {
//   try {
//     const hiring = service.createHiringUpdateObject(req.body);
//     await db.hirings.update(req.params.id, hiring);
//     return res.end();
//   } catch (err) {
//     return res.status(500).end();
//   }
// }

// async function createHiring(req, res) {
//   const hiring = service.createHiringObject(req);
//   let id = null;

//   try {
//     const hirings = await db.hirings.readByCandidate(req.query.candidate);

//     if (hirings.length) {
//       res.send({
//         added: false,
//         message: 'candidate already has hiring',
//       });
//       return;
//     }

//     id = await db.hirings.create(hiring);
//     await service.createInterviews(req.body.interviews, id, req.query.candidate);

//     res.json({ id });
//   } catch (err) {
//     if (!id) {
//       res.status(500).end();
//       return;
//     }

//     try {
//       await db.hirings.delete(id);
//       res.status(500).end();
//     } catch (error) {
//       res.status(500).end();
//     }
//   }
// }

// async function readHiring(req, res) {
//   try {
//     const hiring = await db.hirings.readOne(req.params.id);

//     if (!hiring) {
//       res.status(404).end();
//       return;
//     }

//     hiring.interviews = await db.interviews.readByHiring(req.params.id);

//     res.send(hiring);
//   } catch (err) {
//     res.status(500).end();
//   }
// }

module.exports = {
  // createHiring,
  // readHiring,
  // updateHiring,
  readHirings,
  // deleteHiring,
};
