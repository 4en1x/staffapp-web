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
    name: reqBody.name,
    surname: reqBody.surname,
    resume: reqBody.resume,
    lastChangeDate: fecha.format(reqBody.lastChangeDate, 'DD/MM/YYYY'),
    salary: reqBody.salary,
    status: reqBody.status,
  };

  return {
    contacts,
    skills,
    communication,
  };
}

function updateCandidate(id, reqBody) {
  const { links, city, skills } = reqBody;
  const candidate = Object.assign({}, reqBody);

  delete candidate.links;
  delete candidate.city;
  delete candidate.skills;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.lastChangeDate = date;

  return {
    candidate,
    links,
    city,
    skills,
  };
}

module.exports = {
  createCandidate,
  updateCandidate,
  rebuildCandidate,
};
