const GoogleAuth = require('google-auth-library');
const google = require('googleapis');
const readline = require('readline');
const utils = require('./../utils');
const GoogleAuthDAO = require('../dao/impl/googleAuth.dao');

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/gmail.send',
];

/**
 * Get new google access token and store it to db
 * @param {Object} oauth2Client
 * @returns {Promise <String>} token
 */
async function getNewToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url: ', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await rl.question('Enter the code: ', async (code) => {
    rl.close();
    await oauth2Client.getToken(code, async (err, token) => {
      if (err) {
        throw err;
      }

      oauth2Client.credentials = token;
      await GoogleAuthDAO.instance.create(token);
    });
  });

  return oauth2Client;
}

/**
 * Creates an OAuth2 client with the given credentials and stores credentials to db
 * @returns {Object} google OAuth2 credentials
 */
async function authorize() {
  const credentials = await GoogleAuthDAO.instance.findCredentials();
  const clientSecret = credentials.web.client_secret;
  const clientId = credentials.web.client_id;
  const redirectUrl = credentials.web.redirect_uris[0];
  const auth = new GoogleAuth();
  let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  const token = await GoogleAuthDAO.instance.findToken();
  if (!token) {
    oauth2Client = await getNewToken(oauth2Client);
  } else {
    oauth2Client.credentials = token;
  }

  return oauth2Client;
}

/**
 * Creates event for google calendar
 * @param {String} email
 * @param {{place: {String}, date: {String}}} interview
 * @returns {Object} event
 */
function createEventObject(email, interview) {
  return {
    summary: 'Assigned interview',
    location: interview.place,
    start: {
      dateTime: new Date(interview.date).toISOString(),
      timeZone: 'Europe/London',
    },
    end: {
      dateTime: new Date(new Date(interview.date).getTime() + 3600000).toISOString(),
      timeZone: 'Europe/London',
    },
    attendees: [{ email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };
}


/**
 * Add event to google calendar
 * @param {String} email
 * @param {Object} interview
 * @returns {Promise.<void>}
 */
async function addEvent(email, interview) {
  const auth = await authorize();
  const event = createEventObject(email, interview);
  const calendar = google.calendar('v3');

  calendar.events.insert({
    auth,
    calendarId: 'primary',
    resource: event,
  });
}


/**
 * Creates message body
 * @param {String} email
 * @param {{place: {String}, date: {String}}} interview
 * @returns {String} body
 */
function createMessageBody(email, interview) {
  const date = new Date(interview.date);
  const emailRows = [
    `To: ${email}`,
    'Subject: Exadel notifications',
    'Content-type: text/html;charset=iso-8859-1',
    'MIME-Version: 1.0\n',
    `You have one new assigned interview ${utils.date.getLocalDate(date)} at ${utils.date.getLocalTime(date)}.`,
    'For more information check your interview list in Exadel-Axel system.',
  ];
  return Buffer.from(emailRows.join('\n')).toString('base64');
}


/**
 * Sends email
 * @param email
 * @param interview
 * @returns {Promise <void>}
 */
async function sendEmail(email, interview) {
  const auth = await authorize();
  const raw = createMessageBody(email, interview);
  const messages = google.gmail('v1').users.messages;

  messages.send({
    auth,
    userId: 'me',
    resource: { raw },
  });
}

module.exports = {
  authorize,
  addEvent,
  sendEmail,
};
