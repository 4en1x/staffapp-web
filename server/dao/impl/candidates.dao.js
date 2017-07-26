const BasicDAO = require('../basic.dao');
const CitiesDAO = require('./cities.dao');
const LinksDAO = require('./links.dao');
const FeedbacksDAO = require('./feedbacks.dao');

class CandidatesDAO extends BasicDAO {
  constructor(connection) {
    super('candidates', connection);
  }

  /**
   * @returns {CandidatesDAO}
   */
  static get instance() {
    return CandidatesDAO._instance || (CandidatesDAO._instance = new CandidatesDAO());
  }

  /**
   *
   * @param {Object} candidate
   * @returns {Promise <Number>}
   */
  async create(candidate) {
    const superCreate = super.create.bind(this);

    return this.wrapTransaction(async () => {
      candidate = this.toDAOEntity(candidate);

      if (candidate.city) {
        ({ id: candidate.city_id } = await CitiesDAO.instance.findByName(candidate.city));
        delete candidate.city;
      }


      const links = candidate.links || [];
      delete candidate.links;

      const id = await superCreate(candidate);

      await Promise.all(links.map(async link => LinksDAO.instance.create(link, id)));

      return id;
    });
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findById(id) {
    const candidate = await super.findById(id);

    const links = await LinksDAO.instance.findByCandidate(id);
    candidate.links = links.map(linkObject => linkObject.link);

    if (candidate.cityId) {
      ({ name: candidate.city } = await CitiesDAO.instance.findById(candidate.cityId, 'name'));
      delete candidate.cityId;
    }

    // TODO: select skills

    return candidate;
  }

  /**
   *
   * @param {Number | String} id
   * @returns {Promise <Object>}
   */
  async findByFeedback(id) {
    const feedbacksTableName = FeedbacksDAO.instance.tableName;
    const feedbacksIdField = FeedbacksDAO.instance.idField;

    const [candidate] = await super.find({
      fields: 'name, surname',
      basis: `${this.tableName} INNER JOIN ${feedbacksTableName}
              ON ${feedbacksTableName}.candidate_id = ${this.tableName}.${this.idField}`,
      condition: `WHERE ${feedbacksTableName}.${feedbacksIdField} = ?`,
      values: [id],
    });

    return candidate;
  }

  /**
   *
   * @param {Number} [page] - default=1
   * @returns {Promise <[Object]>}
   */
  async find(page) {
    const citiesTableName = CitiesDAO.instance.tableName;
    const citiesIdField = CitiesDAO.instance.idField;

    return super.find({
      fields: `cnd.${this.idField}, cnd.name, surname, primary_skill,
               status, last_change_date, ct.name AS city`,
      basis: `${this.tableName} cnd
              LEFT JOIN ${citiesTableName} ct
              ON cnd.city_id = ct.${citiesIdField}`,
      page,
      amount: this.itemsPerPage,
    });
  }

  /**
   *
   * @param {Number | String} id
   * @param {Object} candidate
   * @returns {Promise <null>}
   */
  async update(id, candidate) {
    const superUpdate = super.update.bind(this);

    return this.wrapTransaction(async () => {
      candidate = this.toDAOEntity(candidate);

      if (candidate.city) {
        ({ id: candidate.city_id } = await CitiesDAO.instance.findByName(candidate.city));
        delete candidate.city;
      }

      await LinksDAO.instance.deleteByCandidate(id);

      // TODO: delete skills

      const links = candidate.links || [];
      delete candidate.links;

      await superUpdate(id, candidate);

      await Promise.all(links.map(async link => LinksDAO.instance.create(link, id)));

      // TODO: select and insert skills

      return null;
    });
  }
}

module.exports = CandidatesDAO;
