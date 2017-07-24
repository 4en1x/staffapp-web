const AuthController = require('./auth.controller');
const CandidatesController = require('./crud/candidates.controller');
const FeedbacksController = require('./crud/feedbacks.controller');
const HiringsController = require('./crud/hirings.controller');
const InterviewsController = require('./crud/interviews.controller');
const VacanciesController = require('./crud/vacancies.controller');

const controllers = {
  auth: AuthController,
  candidates: new CandidatesController(),
  feedbacks: new FeedbacksController(),
  hirings: new HiringsController(),
  interviews: new InterviewsController(),
  vacancies: new VacanciesController(),
};

module.exports = controllers;
