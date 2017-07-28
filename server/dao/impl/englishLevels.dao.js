const BasicDAO = require('../basic.dao');

class EnglishLevelsDAO extends BasicDAO {
  constructor(connection) {
    super('english_levels', connection);
  }

  /**
   * @returns {EnglishLevelsDAO}
   */

  static get instance() {
    return EnglishLevelsDAO._instance || (EnglishLevelsDAO._instance = new EnglishLevelsDAO());
  }

  async findById(id) {
    const [level] = await super.find({
      condition: 'WHERE id = ?',
      values: [id],
    });

    return level;
  }

  async findByName(name) {
    const [level] = await super.find({
      condition: 'WHERE name = ?',
      values: [name],
    });

    return level;
  }

  async find() {
    const levels = await super.find({
      fields: 'name',
      order: 'ORDER BY name',
    });
    return levels.map(level => level.name);
  }
}

module.exports = EnglishLevelsDAO;
