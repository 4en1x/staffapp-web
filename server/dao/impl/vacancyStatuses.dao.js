const BasicDAO = require('../basic.dao');

class VacancyStatusesDAO extends BasicDAO {
  constructor(connection) {
    super('vacancyStatuses', connection);
  }

  /**
   * @returns {VacancyStatusesDAO}
   */

  static get instance() {
    return VacancyStatusesDAO._instance ||
      (VacancyStatusesDAO._instance = new VacancyStatusesDAO());
  }

  async find() {
    const statuses = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    }).map(status => status.name);
    return statuses;
  }
}

module.exports = VacancyStatusesDAO;
