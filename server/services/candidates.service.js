const fecha = require('fecha');

function createCandidate(reqBody) {
  const candidate = reqBody;

  const date = fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  candidate.createdDate = date;
  candidate.lastChangeDate = date;

  return candidate;
}

function rebuildCandidate(candidate) {
  const contacts = {
    email: candidate.email,
    phone: candidate.phone,
    skype: candidate.skype,
    city: candidate.city,
    linkedin: candidate.linkedin,
    links: candidate.links,
  };

  const skills = {
    primarySkill: candidate.primarySkill,
    englishLevel: candidate.englishLevel,
    secondarySkills: candidate.skills,
  };

  const communication = {
    resume: candidate.resume,
    lastChangeDate: fecha.format(candidate.lastChangeDate, 'DD/MM/YYYY'),
    salary: candidate.salary,
  };

  return {
    name: candidate.name,
    surname: candidate.surname,
    status: candidate.status,
    contacts,
    skills,
    communication,
    hirings: candidate.hirings,
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
