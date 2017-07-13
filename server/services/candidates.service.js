const fecha = require('fecha');

function buildCandidate(reqBody) {
  const candidate = {};
  let links = [];
  let city;
  Object.keys(reqBody).forEach((key) => {
    if (key === 'links') {
      links = reqBody[key];
      return;
    }
    if (key === 'city') {
      city = reqBody[key];
      return;
    }
    candidate[key] = reqBody[key];
  });

  return {
    candidate,
    links,
    city,
  };
}

function createCandidate(reqBody) {
  const { candidate, links, city } = buildCandidate(reqBody);
  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.created_date = date;
  candidate.last_change_date = date;

  return {
    candidate,
    links,
    city,
  };
}

function updateCandidate(id, reqBody) {
  const { candidate, links, city } = buildCandidate(reqBody);
  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.last_change_date = date;

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
