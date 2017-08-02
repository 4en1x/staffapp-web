const utils = require('../utils');

function createCandidate(reqBody) {
  const candidate = reqBody;

  const date = utils.date.getSQL(new Date());
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
    primarySkillYearStart: candidate.primarySkillYearStart,
  };

  const communication = {
    resume: candidate.resume,
    lastChangeDate: utils.date.getDate(candidate.lastChangeDate),
    salary: candidate.salary,
    hrName: candidate.hrName,
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

  const date = utils.date.getSQL(new Date());
  candidate.lastChangeDate = date;

  return candidate;
}

module.exports = {
  createCandidate,
  updateCandidate,
  rebuildCandidate,
};
