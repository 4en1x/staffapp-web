const BasicDAO = require('../basic.dao');

class GoogleDAO extends BasicDAO {
  constructor(connection) {
    super('oauth_tokens', connection);
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
    await super.create({ access_token: JSON.stringify(token) });
  }

  /**
   * Finds google oAuth2token
   * @returns {Promise <String>}
   */
  async find() {
    const [token] = await super.find({
      fields: 'access_token',
    });
    return token;
  }
}


module.exports = GoogleDAO;
