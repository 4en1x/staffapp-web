const BasicDAO = require('../basic.dao');
const CitiesDAO = require('./cities.dao');
const SkillsDAO = require('./skills.dao');

class VacanciesDAO extends BasicDAO {
  constructor(connection) {
    super('vacancies', connection);
    VacanciesDAO._instance = this;
  }

  /**
   * @returns {VacanciesDAO}
   */
  static get instance() {
    return VacanciesDAO._instance || new VacanciesDAO();
  }

  /**
   *
   * @param {Object} vacancy
   * @returns {Promise <Number>}
   */
  async create(vacancy) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      const city = await CitiesDAO.instance.findByName(vacancy.city);
      vacancy.city_id = city.id;
      delete vacancy.city;

      const skills = vacancy.skills || [];
      delete vacancy.skills;

      const id = await superCreate(vacancy);

      await Promise.all(skills.map(async (skill) => {
        const [{ id: skillId }] = await SkillsDAO.instance.findByName(skill.name);

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, skill.weight],
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

    ({ name: vacancy.city } = await CitiesDAO.instance.findById(vacancy.city_id));
    delete vacancy.city_id;

    vacancy.skills = await SkillsDAO.instance.findByVacancy(id);
    return vacancy;
  }

  /**
   *
   * @param {Number} [page]
   * @returns {Promise <[Object]>}
   */
  async find(page) {
    const citiesTableName = CitiesDAO.instance.tableName;
    const citiesIdField = CitiesDAO.instance.idField;

    return super.find({
      fields: `v.${this.idField}, v.name, description, status, c.name AS city`,
      basis: `${this.tableName} v
              LEFT JOIN ${citiesTableName} c
              ON v.city_id = c.${citiesIdField}`,
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
  async update(id, vacancy) {
    const superUpdate = super.update.bind(this);

    return this.wrapTransaction(async () => {
      const city = await CitiesDAO.instance.findByName(vacancy.city);
      vacancy.city_id = city.id;
      delete vacancy.city;

      const skills = vacancy.skills;
      delete vacancy.skills;

      await this.connection.queryAsync({
        sql: 'DELETE FROM vacancy_has_skills WHERE vacancy_id = ?',
        values: [id],
      });

      await superUpdate(id, vacancy);

      await Promise.all(skills.map(async (skill) => {
        const { id: skillId } = await SkillsDAO.instance.findByName(skill.name);

        await this.connection.queryAsync({
          sql: `INSERT INTO vacancy_has_skills
                (skill_id, vacancy_id, weight) VALUES (?, ?, ?)`,
          values: [skillId, id, skill.weight],
        });
      }));
    });
  }
}

module.exports = VacanciesDAO;
