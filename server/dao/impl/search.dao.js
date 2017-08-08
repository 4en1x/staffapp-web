const BasicDAO = require('../basic.dao');
const defaultConfig = require('../configs/search.config.json');

class SearchDAO extends BasicDAO {
  /**
   * @returns {SearchDAO}
   */
  static get instance() {
    return SearchDAO._instance || (SearchDAO._instance = new SearchDAO());
  }

  static makeQuery(table, searchString) {
    const arr = defaultConfig[table].in;
    const queries = searchString.split(' ');

    queries.forEach((query, index) => {
      const q = arr.map(field => `${field} LIKE '%${query}%'`);
      queries[index] = `(${q.join(' OR ')} 
        OR metaphone(name) = metaphone('${query}') 
        OR metaphone(surname) = metaphone('${query}') )`;
    });

    return {
      input: queries.join(' AND '),
      output: defaultConfig[table].out.join(','),
    };
  }

  async search({ table, searchString }) {
    try {
      const { input, output } = SearchDAO.makeQuery(table, searchString);
      const results = await this.connection.queryAsync(
        `SELECT ${output} FROM ${table} WHERE ${input} LIMIT ${this.itemsPerPage}`,
      );

      return this.fromDAOEntity(results);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = SearchDAO;
