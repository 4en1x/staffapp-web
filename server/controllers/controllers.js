const AuthController = require('./auth.controller');
const CandidatesController = require('./crud/candidates.controller');
const FeedbacksController = require('./crud/feedbacks.controller');
const HiringsController = require('./crud/hirings.controller');
const InterviewsController = require('./crud/interviews.controller');
const VacanciesController = require('./crud/vacancies.controller');
const HistoryController = require('./crud/history.controller');

const controllers = {
  auth: AuthController,
  candidates: new CandidatesController(),
  feedbacks: new FeedbacksController(),
  hirings: new HiringsController(),
  interviews: new InterviewsController(),
  vacancies: new VacanciesController(),
  history: new HistoryController(),
};

module.exports = controllers;
