const BasicDAO = require('../basic.dao');

class SkillsDAO extends BasicDAO {
  constructor(connection) {
    super('skills', connection);
  }

  /**
   * @returns {SkillsDAO}
   */
  static get instance() {
    return SkillsDAO._instance || (SkillsDAO._instance = new SkillsDAO());
  }

  /**
   * @param {String} name
   * @returns {Promise <Object>}
   */
  async findByName(name) {
    const [skill] = await super.find({
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

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <[String]>}
   */
  async findByCandidate(id) {
    return super.find({
      basis: `skills_has_candidates shc
              INNER JOIN ${this.tableName} s
              ON s.${this.idField} = shc.skill_id`,
      condition: 'WHERE candidate_id = ?',
      values: [id],
    }).then(skills => skills.map(skill => skill.name));
  }
}

module.exports = SkillsDAO;
