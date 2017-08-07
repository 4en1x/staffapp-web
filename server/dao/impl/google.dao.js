const BasicDAO = require('../basic.dao');

class GoogleDAO extends BasicDAO {
  constructor(connection) {
    super('google_credentials', connection);
  }

  /**
   * @returns {GoogleDAO}
   */
  static get instance() {
    return GoogleDAO._instance || (GoogleDAO._instance = new GoogleDAO());
  }


  /**
   * @param {Object} token
   * @returns {Promise <void>}
   */
  async create(token) {
    await super.create({
      credentials: JSON.stringify(token),
      type: 'access_token',
    });
  }

  /**
   * Finds google oAuth2 token
   * @returns {Promise <String>}
   */
  async findToken() {
    const [{ credentials }] = await super.find({
      fields: 'credentials',
      condition: 'WHERE type="access_token"',
    });
    return JSON.parse(credentials);
  }


  /**
   * Finds google oAuth2 credentials
   * @returns {Promise <String>}
   */
  async findCredentials() {
    const [{ credentials }] = await super.find({
      fields: 'credentials',
      condition: 'WHERE type="credentials"',
    });
    return JSON.parse(credentials);
  }
}


module.exports = GoogleDAO;
