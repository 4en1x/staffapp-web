const BasicDAO = require('../basic.dao');
const CitiesDAO = require('./cities.dao');
const LinksDAO = require('./links.dao');
const FeedbacksDAO = require('./feedbacks.dao');
const SkillsDAO = require('./skills.dao');
const EnglishLevelsDAO = require('./englishLevels.dao');
const CandidateStatusesDAO = require('./candidateStatuses.dao');

const getHiringsDAO = require.bind(null, './hirings.dao');

const { makeFilterQuery } = require('../utils/filter');

class CandidatesDAO extends BasicDAO {
  constructor(connection) {
    super('candidates', connection);
  }

  /**
   * @returns {CandidatesDAO}
   */
  static get instance() {
    return CandidatesDAO._instance || (CandidatesDAO._instance = new CandidatesDAO());
  }

  static get ATTENTION_STATUS() {
    return 10;
  }

  /**
   *
   * @param {Object} candidate
   * @returns {Promise <Number>}
   */
  async create(candidate, userId) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      if (candidate.city) {
        ({ id: candidate.cityId } = await CitiesDAO.instance.findByName(candidate.city));
        delete candidate.city;
      }
      if (candidate.primarySkill) {
        ({ id: candidate.primarySkill } =
          await SkillsDAO.instance.findByName(candidate.primarySkill));
      }

      if (candidate.englishLevel) {
        ({ id: candidate.englishLevelId } =
          await EnglishLevelsDAO.instance.findByName(candidate.englishLevel));
        delete candidate.englishLevel;
      }

      if (candidate.status) {
        ({ id: candidate.statusId } =
          await CandidateStatusesDAO.instance.findByName(candidate.status));
        delete candidate.status;
      }

      const links = candidate.links || [];
      delete candidate.links;

      const skills = candidate.skills || [];
      delete candidate.skills;

      const id = await superCreate(candidate, userId);

      await Promise.all(links.map(async link => LinksDAO.instance.create(link, id)));

      await Promise.all(skills.map(async (skill) => {
        const { id: skillId } = await SkillsDAO.instance.findByName(skill);
        await this.connection.queryAsync({
          sql: `INSERT INTO skills_has_candidates
                (skill_id, candidate_id) VALUES (?, ?)`,
          values: [skillId, id],
        });
      }));

      return id;
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const candidate = await super.findById(id, '*', 'candidates_view');
    if (candidate.secondarySkills) {
      candidate.secondarySkills = candidate.secondarySkills.split(',');
    }
    if (candidate.links) {
      candidate.links = candidate.links.split(',');
    }
    return candidate;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findByFeedback(id) {
    const feedbacksTableName = FeedbacksDAO.instance.tableName;
    const feedbacksIdField = FeedbacksDAO.instance.idField;

    const [candidate] = await super.find({
      fields: 'name, surname',
      basis: `${this.tableName} INNER JOIN ${feedbacksTableName}
              ON ${feedbacksTableName}.candidate_id = ${this.tableName}.${this.idField}`,
      condition: `WHERE ${feedbacksTableName}.${feedbacksIdField} = ?`,
      values: [id],
    });

    return candidate;
  }


  async findByVacancyId(id) {
    const hiringsTableName = getHiringsDAO().instance.tableName;

    const candidates = await super.find({
      fields: 'c.id, c.name, c.surname',
      basis: `${this.tableName} c INNER JOIN ${hiringsTableName}
              ON ${hiringsTableName}.candidate_id = c.id`,
      condition: `WHERE ${hiringsTableName}.vacancy_id = ?`,
      values: [id],
    });

    return candidates;
  }

  /**
   *
   * @param {Number} [page] - default=1
   * @returns {Promise <[Object]>}
   */
  async find(page, query) {
    return super.find({
      fields: `${this.idField}, name, surname, primary_skill,
               status, last_change_date, city`,
      basis: `candidates_view`,
      page,
      order: 'ORDER BY -last_change_date',
      condition: makeFilterQuery(query),
      amount: this.itemsPerPage,
    });
  }


  async report(query) {
    return super.find({
      basis: `${this.tableName}_view`,
      condition: makeFilterQuery(query),
    });
  }

  async pickVacancies(id) {
    const vacancies = await this.connection.queryAsync({
      sql: 'CALL `smart search vacancies`(?)',
      values: [id],
    });
    return vacancies[0];
  }

  /**
   *
   * @param {Number | String} id
   * @param {Object} candidate
   * @returns {Promise <null>}
   */
  async update(id, candidate, userId) {
    const superUpdate = super.update.bind(this);

    return this.wrapTransaction(async () => {
      if (candidate.city) {
        ({ id: candidate.cityId } = await CitiesDAO.instance.findByName(candidate.city));
        delete candidate.city;
      }

      if (candidate.primarySkill) {
        ({ id: candidate.primarySkill } =
          await SkillsDAO.instance.findByName(candidate.primarySkill));
      }

      if (candidate.englishLevel) {
        ({ id: candidate.englishLevelId } =
          await EnglishLevelsDAO.instance.findByName(candidate.englishLevel));
        delete candidate.englishLevel;
      }

      if (candidate.status) {
        ({ id: candidate.statusId } =
          await CandidateStatusesDAO.instance.findByName(candidate.status));
        delete candidate.status;
      }

      await LinksDAO.instance.deleteByCandidate(id);
      const links = candidate.links || [];
      delete candidate.links;

      await this.connection.queryAsync({
        sql: `DELETE FROM skills_has_candidates
              WHERE candidate_id = ?`,
        values: [id],
      });

      const skills = candidate.skills || [];
      delete candidate.skills;

      await superUpdate(id, candidate, userId);

      await Promise.all(links.map(async link => LinksDAO.instance.create(link, id)));

      await Promise.all(skills.map(async (skill) => {
        const { id: skillId } = await SkillsDAO.instance.findByName(skill);

        await this.connection.queryAsync({
          sql: `INSERT INTO skills_has_candidates
                (skill_id, candidate_id) VALUES (?, ?)`,
          values: [skillId, id],
        });
      }));

      return null;
    });
  }

  async attention(id) {
    await this.connection.queryAsync({
      sql: `UPDATE ${this.tableName}
            SET status_id=${CandidatesDAO.ATTENTION_STATUS}
            WHERE ${this.idField} = ?`,
      values: [id],
    });
  }
}

module.exports = CandidatesDAO;
