const BasicDAO = require('../basic.dao');

class CitiesDAO extends BasicDAO {
  constructor(connection) {
    super('cities', connection);
  }

  /**
   * @returns {CitiesDAO}
   */
  static get instance() {
    return CitiesDAO._instance || (CitiesDAO._instance = new CitiesDAO());
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

  async find() {
    const cities = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    }).map(city => city.name);
    return cities;
  }
}

module.exports = CitiesDAO;
