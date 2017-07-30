const fecha = require('fecha');

function createMessage(userId, interview) {
  const time = fecha.format(new Date(interview.date), 'HH:mm');
  const date = fecha.format(new Date(interview.date), 'YYYY-MM-DD HH:mm:ss');
  const text = `You have assigned interview today at ${time}, location: ${interview.place}`;

  return {
    date,
    text,
    userId,
  };
}

module.exports = { createMessage };

