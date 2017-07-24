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

function rebuildCandidate(reqBody) {
  const candidate = {};
  candidate.contacts = {
    email: reqBody.email,
    phone: reqBody.phone,
    skype: reqBody.skype,
    city: reqBody.city,
    linkedin: reqBody.linkedin,
  };
  candidate.skills = {
    primarySkill: reqBody.primarySkill,
    englishLevel: reqBody.englishLevel,
  };
  candidate.communication = {
    name: reqBody.name,
    surname: reqBody.surname,
    resume: reqBody.resume,
    lastChangeDate: fecha.format(reqBody.lastChangeDate, 'DD/MM/YYYY'),
    salary: reqBody.salary,
  };
  return candidate;
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
  rebuildCandidate,
};
