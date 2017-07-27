const fecha = require('fecha');

function createCandidate(reqBody) {
  const candidate = reqBody;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.createdDate = date;
  candidate.lastChangeDate = date;

  return candidate;
}

function rebuildCandidate(reqBody) {
  const contacts = {
    email: reqBody.email,
    phone: reqBody.phone,
    skype: reqBody.skype,
    city: reqBody.city,
    linkedin: reqBody.linkedin,
    links: reqBody.links,
  };

  const skills = {
    primarySkill: reqBody.primarySkill,
    englishLevel: reqBody.englishLevel,
    secondarySkills: reqBody.skills,
  };

  const communication = {
    resume: reqBody.resume,
    lastChangeDate: fecha.format(reqBody.lastChangeDate, 'DD/MM/YYYY'),
    salary: reqBody.salary,
  };

  return {
    name: reqBody.name,
    surname: reqBody.surname,
    status: reqBody.status,
    contacts,
    skills,
    communication,
  };
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
  rebuildCandidate,
};
