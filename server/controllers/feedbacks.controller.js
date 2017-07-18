const db = require('./../dao');
const { toSnake, toCamel } = require('convert-keys');


async function updateFeedback(req, res) {
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

    if(!feedback) {
      return res.send({ found: false });
    }

    return res.send(toCamel(feedback));
  } catch (err) {
    return res.status(500).end();
  }
}


module.exports = {
  updateFeedback,
  readFeedback,
};
