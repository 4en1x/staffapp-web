const BasicDAO = require('../basic.dao');

class CitiesDAO extends BasicDAO {
  constructor(connection) {
    super('cities', connection);
    CitiesDAO._instance = this;
  }

  /**
   * @returns {CitiesDAO}
   */
  static get instance() {
    return CitiesDAO._instance || new CitiesDAO();
  }

  /**
   *
   * @param {String} name
   * @returns {Promise <Object>}
   */
  async findByName(name) {
    const [city] = await super.find({
      condition: 'WHERE name = ?',
      values: name,
    });

    return city;
  }
}

module.exports = CitiesDAO;
