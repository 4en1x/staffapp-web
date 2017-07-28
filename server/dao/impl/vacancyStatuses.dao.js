const BasicDAO = require('../basic.dao');

class VacancyStatusesDAO extends BasicDAO {
  constructor(connection) {
    super('vacancy_statuses', connection);
  }

  /**
   * @returns {VacancyStatusesDAO}
   */

  static get instance() {
    return VacancyStatusesDAO._instance ||
      (VacancyStatusesDAO._instance = new VacancyStatusesDAO());
  }



  async findByName(name) {
    const [status] = await super.find({
      condition: 'WHERE name = ?',
      values: [name],
    });

    return status;
  }

  async find() {
    const statuses = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    });
    return statuses.map(status => status.name);
  }
}

module.exports = VacancyStatusesDAO;
