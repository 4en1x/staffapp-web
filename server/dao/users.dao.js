const BasicDAO = require('./basic.dao');

class Users extends BasicDAO {
  constructor(connection) {
    super('users');
    this.connection = connection;
  }

  async checkEmail(email) {
    const [user] = await this.connection.queryAsync({
      sql: `SELECT * FROM ${this.table}
            WHERE email = ?`,
      values: [email],
    });

    return user;
  }

  async checkUser(email, password) {
    const [user] = await this.connection.queryAsync({
      sql: `SELECT * FROM ${this.table}
            WHERE email = ? AND password = ?`,
      values: [email, password],
    });

    return user;
  }
}

module.exports = Users;
