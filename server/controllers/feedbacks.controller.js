const BasicController = require('./basic.controller');

const db = require('./../dao');

class FeedbacksController extends BasicController {
  constructor() {
    super('feedbacks');
  }

  async readOne(req, res) {
    const onload = async (feedback) => {
      if (feedback.userId !== req.user.id && req.user.role === 'user') {
        throw new Error('403');
      }
    };

    await super.readOne(req, res, onload);
  }

  async update(req, res) {
    try {
      const feedback = await db[this.daoName].readOne(req.params.id);
      if (feedback.userId !== req.user.id) {
        res.status(403).end();
        return;
      }

      await super.update(req, res, { comment: req.body.comment, fields: req.body.feedbackFields });
    } catch (err) {
      res.status(500).end();
    }
  }
}

// async function updateFeedback(req, res) {
//   try {
//     const feedback = await db.feedbacks.readOne(req.params.id);

//     if (feedback.userId !== req.user.id) {
//       res.status(403).end();
//       return;
//     }

//     await db.feedbacks.update(req.params.id, req.body.comment, req.body.feedbackFields);

//     res.end();
//   } catch (err) {
//     res.status(500).end();
//   }
// }

// async function readFeedback(req, res) {
//   try {
//     const feedback = await db.feedbacks.readOne(req.params.id);

//     if (!feedback) {
//       res.json({ found: false });
//       return;
//     }

//     if (feedback.user_id !== req.user.id && req.user.role === 'user') {
//       res.status(403).end();
//       return;
//     }

//     res.json(feedback);
//   } catch (err) {
//     res.status(500).end();
//   }
// }

// module.exports = {
//   updateFeedback,
//   readFeedback,
// };

module.exports = FeedbacksController;
