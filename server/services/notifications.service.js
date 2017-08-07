const { date } = require('../utils');

/**
 * @param {Number | String} userId
 * @param {Object} interview
 * @param {Number | String} interviewId
 * @returns {[Object, Object]} messages
 */
function createMessages(userId, interview, interviewId) {
  const interviewTime = date.getLocalTime(new Date(interview.date));
  const interviewDate = date.getLocalDate(new Date(interview.date));
  const interviewDateTime = date.getSQL(new Date(interview.date));

  const firstMessage = {
    date: interviewDateTime,
    text: `You have one new assigned interview ${interviewDate} at ${interviewTime}`,
    userId,
    interviewId,
    status: 1,
  };

  const secondMessage = {
    date: interviewDateTime,
    text: `You have one assigned interview today at ${interviewTime}`,
    userId,
    interviewId,
  };

  return [firstMessage, secondMessage];
}

module.exports = { createMessages };

