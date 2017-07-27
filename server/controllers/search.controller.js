const SearchDAO = require('../dao/impl/search.dao');

async function search(req, res) {
  try {
    const searchResult = await SearchDAO.instance.search(req.query);

    res.json(searchResult);
  } catch (err) {
    res.status(500).end();
  }
}

module.exports = {
  search,
};
