const fecha = require('fecha');

function createCandidate(reqBody) {
  const candidate = reqBody;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.createdDate = date;
  candidate.lastChangeDate = date;

  return candidate;
}

function updateCandidate(id, reqBody) {
  const candidate = reqBody;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.lastChangeDate = date;

  return candidate;
}

module.exports = {
  createCandidate,
  updateCandidate,
};
