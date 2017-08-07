const BasicDAO = require('../basic.dao');

class CredentialsDAO extends BasicDAO {
  constructor(connection) {
    super('google_credentials', connection);
  }

  /**
   * @returns {CredentialsDAO}
   */
  static get instance() {
    return CredentialsDAO._instance || (CredentialsDAO._instance = new CredentialsDAO());
  }


  /**
   * Finds google credentials
   * @returns {Promise <String>}
   */
  async find() {
    const [{ credentials }] = await super.find({
      fields: 'credentials',
    });
    return credentials;
  }
}


module.exports = CredentialsDAO;
