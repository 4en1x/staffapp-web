const BasicDAO = require('../basic.dao');

class CandidateStatusesDAO extends BasicDAO {
  constructor(connection) {
    super('candidate_statuses', connection);
  }

  /**
   * @returns {CandidateStatusesDAO}
   */

  static get instance() {
    return CandidateStatusesDAO._instance ||
      (CandidateStatusesDAO._instance = new CandidateStatusesDAO());
  }

  async findById(id) {
    const [status] = await super.find({
      condition: 'WHERE id = ?',
      values: [id],
    });

    return status;
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

module.exports = CandidateStatusesDAO;
