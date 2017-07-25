const db = require('../dao/search.dao');

async function search(req, res) {
  try {
    const searchResult = await db.search(req.query);

    res.json(searchResult);
  } catch (err) {
    res.status(500).end();
  }
}


module.exports = {
  search,
};
