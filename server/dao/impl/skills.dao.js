const BasicDAO = require('../basic.dao');

class SkillsDAO extends BasicDAO {
  constructor(connection) {
    super('skills', connection);
    SkillsDAO._instance = this;
  }

  /**
   * @returns {SkillsDAO}
   */
  static get instance() {
    return SkillsDAO._insatnce || new SkillsDAO();
  }

  /**
   * @param {String} name
   * @returns {Promise <Object>}
   */
  async findByName(name) {
    const [skill] = super.find({
      condition: 'WHERE name = ?',
      values: [name],
    });

    return skill;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[Object]>}
   */
  async findByVacancy(id) {
    return super.find({
      fields: 'name, weight',
      basis: `vacancy_has_skills vhs
              INNER JOIN ${this.tableName} s
              ON s.${this.idField} = vhs.skill_id`,
      condition: 'WHERE vacancy_id = ?',
      values: [id],
    });
  }
}

module.exports = SkillsDAO;
