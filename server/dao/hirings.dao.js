const BasicDAO = require('./basic.dao');
const { toCamel } = require('../utils');

class Hirings extends BasicDAO {
  constructor(connection) {
    super('hirings');
    this.connection = connection;
  }

  async readOne(id) {
    const hiring = await super.readOne(id);

    if (hiring) {
      const interviews = toCamel(await this.connection.queryAsync({
        sql: 'SELECT interviews.id FROM interviews WHERE hiring_id = ?',
        values: [id],
      })).map(interview => interview.id);

      hiring.interviews = interviews;
    }

    return hiring;
  }

  async readByUser(id) {
    const hirings = await super.read({
      addition: 'WHERE user_id = ?',
      values: [id],
    });

    return hirings;
  }

  async readByCandidate(id) {
    const hirings = await super.read({
      addition: 'WHERE candidate_id = ?',
      values: [id],
    });

    return hirings;
  }
}

module.exports = Hirings;
