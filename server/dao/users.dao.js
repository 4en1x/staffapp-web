const BasicDAO = require('./basic.dao');

class Users extends BasicDAO {
  constructor() {
    super('users');
  }

  async checkEmail(email) {
    try {
      const [resource] = await this.connection.queryAsync({
        sql: `SELECT * FROM ${this.table}
              WHERE email = ?`,
        values: [email],
      });
      return resource;
    } catch (err) {
      throw err;
    }
  }

  async checkUser(email, password) {
    try {
      const [user] = await this.connection.queryAsync({
        sql: `SELECT * FROM ${this.table}
              WHERE email = ? AND password = ?`,
        values: [email, password],
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Users;
