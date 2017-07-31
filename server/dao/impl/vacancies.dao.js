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
    const vacancy = await super.findById(id);

    ({ name: vacancy.city } = await CitiesDAO.instance.findById(vacancy.cityId));
    delete vacancy.cityId;

    if (vacancy.statusId) {
      ({ name: vacancy.status } =
        await VacancyStatusesDAO.instance.findById(vacancy.statusId));
      delete vacancy.statusId;
    }

    if (vacancy.primarySkill) {
      ({ name: vacancy.primarySkill } =
        await SkillsDAO.instance.findById(vacancy.primarySkill));
    }

    vacancy.skills = await SkillsDAO.instance.findByVacancy(id);
    return vacancy;
  }

  /**
   *
   * @param {Number} [page]
   * @returns {Promise <[Object]>}
   */
  async find(page, query) {
    const citiesTableName = CitiesDAO.instance.tableName;
    const citiesIdField = CitiesDAO.instance.idField;
    const vacancyStatusesTableName = VacancyStatusesDAO.instance.tableName;
    const vacancyStatusesIdField = VacancyStatusesDAO.instance.idField;
    const skillsTableName = SkillsDAO.instance.tableName;
    const skillsIdField = SkillsDAO.instance.idField;

    return super.find({
      fields: `v.${this.idField}, v.name, vs.name AS status, job_start, s.name AS primarySkill, ct.name AS city`,
      basis: `${this.tableName} v
              LEFT JOIN ${citiesTableName} ct
              ON v.city_id = ct.${citiesIdField}
              LEFT JOIN ${vacancyStatusesTableName} vs
              ON v.status_id = vs.${vacancyStatusesIdField}
              LEFT JOIN ${skillsTableName} s
              ON v.primary_skill = s.${skillsIdField}`,
      condition: makeFilterQuery(query),
      order: 'ORDER BY -v.created_date',
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
