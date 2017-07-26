const BasicDAO = require('../basic.dao');

class HistoryDAO extends BasicDAO {
  constructor(connection) {
    super('hirings', connection);
  }
  /**
     * @returns {HistoryDAO}
     */
  static get instance() {
    return HistoryDAO._instance || (HistoryDAO._instance = new HistoryDAO());
  }
}


module.exports = HistoryDAO;
