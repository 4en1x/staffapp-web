const BasicDAO = require('../basic.dao');
const CitiesDAO = require('./cities.dao');
const SkillsDAO = require('./skills.dao');
const VacancyStatusesDAO = require('./vacancyStatuses.dao');
const { makeFilterQuery } = require('../utils/filter');

class VacanciesDAO extends BasicDAO {
  constructor(connection) {
    super('vacancies', connection);
  }

  /**
   * @returns {VacanciesDAO}
   */
  static get instance() {
    return VacanciesDAO._instance || (VacanciesDAO._instance = new VacanciesDAO());
  }

  /**
   *
   * @param {Object} vacancy
   * @returns {Promise <Number>}
   */
  async create(vacancy, userId) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      if (vacancy.city) {
        const city = await CitiesDAO.instance.findByName(vacancy.city);
        vacancy.city_id = city.id;
        delete vacancy.city;
      }

      if (vacancy.primarySkill) {
        ({ id: vacancy.primarySkill } =
          await SkillsDAO.instance.findByName(vacancy.primarySkill));
      }

      if (vacancy.status) {
        ({ id: vacancy.statusId } =
          await VacancyStatusesDAO.instance.findByName(vacancy.status));
        delete vacancy.status;
      }

      const skills = vacancy.skills || [];
      delete vacancy.skills;

      const id = await superCreate(vacancy, userId);

      await Promise.all(skills.map(async (skill) => {
        const { id: skillId } = await SkillsDAO.instance.findByName(skill);

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, 5],
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
    const vacancy = await super.findById(id, '*', 'vacancies_view');
    if (vacancy.secondarySkills) {
      vacancy.secondarySkills = vacancy.secondarySkills.split(',');
    }
    return vacancy;
  }

  async pickCandidates(id) {
    const candidates = await this.connection.queryAsync({
      sql: 'CALL `smart search candidates`(?)',
      values: [id],
    });
    return this.fromDAOEntity(candidates[0]);
  }

  /**
   *
   * @param {Number} [page]
   * @returns {Promise <[Object]>}
   */
  async find(page, query) {
    return super.find({
      fields: `${this.idField}, name, status, job_start, primary_skill, city`,
      basis: 'vacancies_view',
      condition: `${makeFilterQuery(query)} GROUP BY ${this.idField}`,
      order: 'ORDER BY -created_date',
      amount: this.itemsPerPage,
      page,
    });
  }

  /**
   *
   * @param {Number | String} id
   * @param {Object} vacancy
   * @returns {Promise <void>}
   */
  async update(id, vacancy, userId) {
    const superUpdate = super.update.bind(this);

    return this.wrapTransaction(async () => {
      if (vacancy.city) {
        const city = await CitiesDAO.instance.findByName(vacancy.city);
        vacancy.city_id = city.id;
        delete vacancy.city;
      }

      if (vacancy.primarySkill) {
        ({ id: vacancy.primarySkill } =
          await SkillsDAO.instance.findByName(vacancy.primarySkill));
      }

      if (vacancy.status) {
        ({ id: vacancy.statusId } =
          await VacancyStatusesDAO.instance.findByName(vacancy.status));
        delete vacancy.status;
      }

      const skills = vacancy.skills || [];
      delete vacancy.skills;

      await this.connection.queryAsync({
        sql: 'DELETE FROM vacancy_has_skills WHERE vacancy_id = ?',
        values: [id],
      });

      await superUpdate(id, vacancy, userId);

      await Promise.all(skills.map(async (skill) => {
        const { id: skillId } = await SkillsDAO.instance.findByName(skill);

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, 5],
        });
      }));
    });
  }
}

module.exports = VacanciesDAO;
