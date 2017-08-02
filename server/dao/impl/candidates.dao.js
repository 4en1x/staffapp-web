const BasicDAO = require('../basic.dao');
const CitiesDAO = require('./cities.dao');
const LinksDAO = require('./links.dao');
const FeedbacksDAO = require('./feedbacks.dao');
const SkillsDAO = require('./skills.dao');
const EnglishLevelsDAO = require('./englishLevels.dao');
const CandidateStatusesDAO = require('./candidateStatuses.dao');
const UsersDAO = require('./users.dao');

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
    const candidate = await super.findById(id);

    const links = await LinksDAO.instance.findByCandidate(id);
    candidate.links = links.map(linkObject => linkObject.link);

    if (candidate.cityId) {
      ({ name: candidate.city } = await CitiesDAO.instance.findById(candidate.cityId, 'name'));
      delete candidate.cityId;
    }

    if (candidate.primarySkill) {
      ({ name: candidate.primarySkill } =
        await SkillsDAO.instance.findById(candidate.primarySkill));
    }

    if (candidate.englishLevelId) {
      ({ name: candidate.englishLevel } =
        await EnglishLevelsDAO.instance.findById(candidate.englishLevelId));
    }

    if (candidate.statusId) {
      ({ name: candidate.status } =
        await CandidateStatusesDAO.instance.findById(candidate.statusId));
    }

    candidate.skills = await SkillsDAO.instance.findByCandidate(id);
    candidate.hirings = await getHiringsDAO().instance.findByCandidate(id);
    candidate.hrName = await UsersDAO.instance.nameById(candidate.userId);
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
    const citiesTableName = CitiesDAO.instance.tableName;
    const citiesIdField = CitiesDAO.instance.idField;
    const candidateStatusesTableName = CandidateStatusesDAO.instance.tableName;
    const candidateStatusesIdField = CandidateStatusesDAO.instance.idField;
    const skillsTableName = SkillsDAO.instance.tableName;
    const skillsIdField = SkillsDAO.instance.idField;

    return super.find({
      fields: `cnd.${this.idField}, cnd.name, surname, ps.name AS primary_skill,
               cs.name AS status, last_change_date, ct.name AS city`,
      basis: `${this.tableName} cnd
              LEFT JOIN ${citiesTableName} ct
              ON cnd.city_id = ct.${citiesIdField}
              LEFT JOIN ${candidateStatusesTableName} cs
              ON cnd.status_id = cs.${candidateStatusesIdField}
              LEFT JOIN ${skillsTableName} ps
              ON cnd.primary_skill = ps.${skillsIdField}
              LEFT JOIN skills_has_candidates shc
              ON shc.candidate_id = cnd.${this.idField}
              LEFT JOIN ${skillsTableName} ss
              ON ss.${skillsIdField} = shc.skill_id`,
      page,
      condition: `${makeFilterQuery(query)} GROUP BY cnd.${this.idField}`,
      amount: this.itemsPerPage,
    });
  }

  async report(query) {
    return super.find({
      fields: `cnd.id, cnd.name, cnd.email, cnd.surname, 
               cnd.skype,cnd.phone,cnd.resume, e_l.name AS english_level, 
               cnd.created_date, cnd.last_change_date, u.name AS hrName, 
               cnd.linkedin, cnd.salary, cnd.notification_date, 
               cnd.primary_skill_year_start, s.name AS primary_skill,
               cs.name AS status,ct.name AS city,GROUP_CONCAT(sk.name SEPARATOR ', ') AS secondarySkills`,
      basis: `${this.tableName} cnd
              LEFT JOIN cities ct
              ON cnd.city_id = ct.id
              LEFT JOIN candidate_statuses cs
              ON cnd.status_id = cs.id
              LEFT JOIN skills s
              ON cnd.primary_skill = s.id
              LEFT JOIN users u
              ON u.id = cnd.user_id
              LEFT JOIN english_levels e_l
              ON e_l.id = cnd.english_level_id
              LEFT JOIN skills_has_candidates s_h_c
              ON s_h_c.candidate_id = cnd.id
              LEFT JOIN skills sk
              ON sk.id = s_h_c.skill_id `,
      condition: makeFilterQuery(query),
      order: 'GROUP BY cnd.id',
    });
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
}

module.exports = CandidatesDAO;