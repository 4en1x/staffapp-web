const db = require('../dao');

async function readFeedbacks(ids) {
  const feedbacks = await Promise.all(ids.map(async (id) => {
    const feedback = await db.feedbacks.readOne(id);
    feedback.fields = feedback.fields.map((field) => {
      Object.keys(field).forEach((key) => {
        if (field[key] === null) {
          delete field[key];
        }
      });
      return field;
    });
    return feedback;
  }));

  return feedbacks;
}

module.exports = {
  readFeedbacks,
};
