const BasicDAO = require('./basic.dao');

class Hirings extends BasicDAO {
  constructor() {
    super('hirings');
  }

  async readOne(id) {
    const hiring = await super.readOne(id);

    if (hiring) {
      const interviews = await this.connection.queryAsync({
        sql: 'SELECT id FROM interviews WHERE hiring_id = ?',
        values: [id],
      }).map(interview => interview.id);

      hiring.interviews = interviews;
    }

    return hiring;
  }

  async readAllByUser(id) {
    const hirings = await super.readAll({
      addition: 'WHERE user_id = ?',
      values: [id],
    });

    return hirings;
  }

  async readAllByCandidate(id) {
    const hirings = await super.readAll({
      addition: 'WHERE candidate_id = ?',
      values: [id],
    });

    return hirings;
  }
}

module.exports = Hirings;
