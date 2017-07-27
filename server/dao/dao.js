const UsersDAO = require('./impl/users.dao');
const CandidatesDAO = require('./impl/candidates.dao');
const InterviewsDAO = require('./impl/interviews.dao');
const HiringsDAO = require('./impl/hirings.dao');
const FeedbacksDAO = require('./impl/feedbacks.dao');
const VacanciesDAO = require('./impl/vacancies.dao');
const HistoryDAO = require('./impl/history.dao');

module.exports = {
  users: UsersDAO.instance,
  candidates: CandidatesDAO.instance,
  interviews: InterviewsDAO.instance,
  hirings: HiringsDAO.instance,
  feedbacks: FeedbacksDAO.instance,
  vacancies: VacanciesDAO.instance,
  history: HistoryDAO.instance,
};
