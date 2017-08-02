const { date } = require('../utils');

function createMessages(userId, interview, interviewId) {
  const interviewTime = date.getTime(new Date(interview.date));
  const interviewDate = date.getDate(new Date(interview.date));
  const interviewDateTime = date.getSQL(new Date(interview.date));


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

