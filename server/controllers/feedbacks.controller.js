const db = require('./../dao');
const { toSnake } = require('convert-keys');


async function updateFeedback(req, res) {
  try {
    await db.feedbacks.update(req.params.id, req.body.comment,
      req.body.feedbackFieldsIds, toSnake(req.body.feedbackFields));
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}

async function readFeedback(req, res) {
  try {
    await db.feedbacks.readOne(req.params.id);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
}


module.exports = {
  updateFeedback,
  readFeedback,
};
