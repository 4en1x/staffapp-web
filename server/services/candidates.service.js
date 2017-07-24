const fecha = require('fecha');

function createCandidate(reqBody) {
  const { links, city } = reqBody;
  const candidate = Object.assign({}, reqBody);
  delete candidate.links;
  delete candidate.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.createdDate = date;
  candidate.lastChangeDate = date;

  return {
    candidate,
    links,
    city,
  };
}

function updateCandidate(id, reqBody) {
  const { links, city } = reqBody;
  const candidate = Object.assign({}, reqBody);
  delete candidate.links;
  delete candidate.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.lastChangeDate = date;

  return {
    candidate,
    links,
    city,
  };
}

module.exports = {
  createCandidate,
  updateCandidate,
};
