const fecha = require('fecha');

function createMessages(userId, interview, interviewId) {
  const interviewTime = fecha.format(new Date(interview.date), 'HH:mm');
  const interviewDate = fecha.format(new Date(interview.date), 'DD.MM.YYYY');
  const interviewDateTime = fecha.format(new Date(interview.date), 'YYYY-MM-DD HH:mm:ss');


  const secondMessage = {
    date: interviewDateTime,
    text: `You have one assigned interview today at ${interviewTime}`,
    userId,
    interviewId,
  };

  const firstMessage = {
    date: interviewDateTime,
    text: `You have one new assigned interview ${interviewDate} at ${interviewTime}`,
    userId,
    interviewId,
    status: 1,
  };

  return [firstMessage, secondMessage];
}

module.exports = { createMessages };

