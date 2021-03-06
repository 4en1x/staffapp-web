const AuthController = require('./auth.controller');
const CandidatesController = require('./crud/candidates.controller');
const FeedbacksController = require('./crud/feedbacks.controller');
const HiringsController = require('./crud/hirings.controller');
const InterviewsController = require('./crud/interviews.controller');
const VacanciesController = require('./crud/vacancies.controller');
const HistoryController = require('./crud/history.controller');
const CitiesController = require('./crud/cities.controller');
const UsersController = require('./crud/users.controller');
const SkillsController = require('./crud/skills.controller');
const EnglishLevelsController = require('./crud/englishLevels.controller');
const CandidateStatusesController = require('./crud/candidateStatuses.controller');
const VacancyStatusesController = require('./crud/vacancyStatuses.controller');
const NotificationsController = require('./crud/notifications.controller');

const controllers = {
  auth: AuthController,
  candidates: new CandidatesController(),
  feedbacks: new FeedbacksController(),
  hirings: new HiringsController(),
  interviews: new InterviewsController(),
  vacancies: new VacanciesController(),
  history: new HistoryController(),
  cities: new CitiesController(),
  skills: new SkillsController(),
  englishLevels: new EnglishLevelsController(),
  candidateStatuses: new CandidateStatusesController(),
  vacancyStatuses: new VacancyStatusesController(),
  notifications: new NotificationsController(),
  users: new UsersController(),
};

module.exports = controllers;
