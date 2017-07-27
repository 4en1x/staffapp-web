const BasicDAO = require('../basic.dao');

class EnglishLevelsDAO extends BasicDAO {
  constructor(connection) {
    super('englishLevels', connection);
  }

  /**
   * @returns {EnglishLevelsDAO}
   */

  static get instance() {
    return EnglishLevelsDAO._instance || (EnglishLevelsDAO._instance = new EnglishLevelsDAO());
  }

  async find() {
    const levels = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    }).map(level => level.name);
    return levels;
  }
}

module.exports = EnglishLevelsDAO;
