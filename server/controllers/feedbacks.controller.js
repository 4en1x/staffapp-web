const db = require('./../dao');
const { toSnake, toCamel } = require('convert-keys');


async function updateFeedback(req, res) {
  if (req.params.id !== req.user.id) {
    res.status(403).end();
  }

  try {
    await db.feedbacks.update(req.params.id, req.body.comment, toSnake(req.body.feedbackFields));
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function readFeedback(req, res) {
  try {
    const feedback = await db.feedbacks.readOne(req.params.id);

    if (!feedback) {
      res.json({ found: false });
      return;
    }

    if (feedback.user_id !== req.user.id && req.user.role === 'user') {
      res.status(403).end();
      return;
    }

    res.json(toCamel(feedback));
  } catch (err) {
    res.status(500).end();
  }
}


module.exports = {
  updateFeedback,
  readFeedback,
};
