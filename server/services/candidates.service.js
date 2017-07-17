const fecha = require('fecha');
const { toSnake } = require('convert-keys');

function createCandidate(reqBody) {
  const { links, city } = reqBody;
  const candidate = Object.assign({}, reqBody);
  delete candidate.links;
  delete candidate.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.createdDate = date;
  candidate.lastChangeDate = date;

  return toSnake({
    candidate,
    links,
    city,
  });
}

function updateCandidate(id, reqBody) {
  const { links, city } = reqBody;
  const candidate = Object.assign({}, reqBody);
  delete candidate.links;
  delete candidate.city;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.lastChangeDate = date;

  return toSnake({
    candidate,
    links,
    city,
  });
}

module.exports = {
  createCandidate,
  updateCandidate,
};
