const AuthController = require('./auth.controller');
const CandidatesController = require('./crud/candidates.controller');
const FeedbacksController = require('./crud/feedbacks.controller');
const HiringsController = require('./crud/hirings.controller');
const InterviewsController = require('./crud/interviews.controller');

const controllers = {
  auth: AuthController,
  candidates: CandidatesController(),
  feedbacks: FeedbacksController(),
  hirings: HiringsController(),
  interviews: InterviewsController(),
};

module.exports = controllers;
