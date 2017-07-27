const BasicDAO = require('../basic.dao');

class CandidateStatusesDAO extends BasicDAO {
  constructor(connection) {
    super('candidateStatuses', connection);
  }

  /**
   * @returns {CandidateStatusesDAO}
   */

  static get instance() {
    return CandidateStatusesDAO._instance ||
      (CandidateStatusesDAO._instance = new CandidateStatusesDAO());
  }

  async find() {
    const statuses = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    }).map(status => status.name);
    return statuses;
  }
}

module.exports = CandidateStatusesDAO;
