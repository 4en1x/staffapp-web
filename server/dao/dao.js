const UsersDAO = require('./impl/users.dao');
const CandidatesDAO = require('./impl/candidates.dao');
const InterviewsDAO = require('./impl/interviews.dao');
const HiringsDAO = require('./impl/hirings.dao');
const FeedbacksDAO = require('./impl/feedbacks.dao');
const VacanciesDAO = require('./impl/vacancies.dao');
const HistoryDAO = require('./impl/history.dao');
const CitiesDAO = require('./impl/cities.dao');
const SkillsDAO = require('./impl/skills.dao');
const EnglishLevelsDAO = require('./impl/englishLevels.dao');
const CandidateStatusesDAO = require('./impl/candidateStatuses.dao');
const VacancyStatusesDAO = require('./impl/vacancyStatuses.dao');
const NotificationsDAO = require('./impl/notifications.dao');

module.exports = {
  users: UsersDAO.instance,
  candidates: CandidatesDAO.instance,
  interviews: InterviewsDAO.instance,
  hirings: HiringsDAO.instance,
  feedbacks: FeedbacksDAO.instance,
  vacancies: VacanciesDAO.instance,
  history: HistoryDAO.instance,
  cities: CitiesDAO.instance,
  skills: SkillsDAO.instance,
  englishLevels: EnglishLevelsDAO.instance,
  candidateStatuses: CandidateStatusesDAO.instance,
  vacancyStatuses: VacancyStatusesDAO.instance,
  notifications: NotificationsDAO.instance,
};
