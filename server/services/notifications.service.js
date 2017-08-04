const { date } = require('../utils');

/**
 * @param {Date} dateTime - interview date
 * @returns {string} time - interview time not UTC
 */
function getTimeString(dateTime) {
  const hours = `0${dateTime.getHours()}`.slice(-2);
  const minutes = `0${dateTime.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
}

/**
 * @param {Date} dateTime - interview date
 * @returns {string} date - interview date not UTC
 */
function getDateString(dateTime) {
  const day = `0${dateTime.getDay()}`.slice(-2);
  const month = `0${dateTime.getMonth()}`.slice(-2);
  return `${day}.${month}.${dateTime.getFullYear()}`;
}

/**
 * @param {Number | String} userId
 * @param {Object} interview
 * @param {Number | String} interviewId
 * @returns {[Object, Object]} messages
 */
function createMessages(userId, interview, interviewId) {
  const interviewTime = getTimeString(new Date(interview.date));
  const interviewDate = getDateString(new Date(interview.date));
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

