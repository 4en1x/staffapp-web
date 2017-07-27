const db = require('../dao/dao');
const { clearFields } = require('../utils');

async function readFeedbacks(ids, userId) {
  let userFeedback;

  const allFeedbacks = await Promise.all(ids.map(async (id) => {
    const feedback = await db.feedbacks.findById(id);
    feedback.fields = clearFields(feedback.fields);
    if (feedback.userId === userId) {
      userFeedback = feedback;
    }
    return feedback;
  }));

  return {
    userFeedback,
    allFeedbacks,
  };
}

module.exports = {
  readFeedbacks,
};
