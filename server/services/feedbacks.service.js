const db = require('../dao/dao');
const { clearFields } = require('../utils');

async function readFeedbacks(ids) {
  const feedbacks = await Promise.all(ids.map(async (id) => {
    const feedback = await db.feedbacks.readOne(id);
    feedback.fields = clearFields(feedback.fields);
    return feedback;
  }));

  return feedbacks;
}

module.exports = {
  readFeedbacks,
};
