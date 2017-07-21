const db = require('../dao');
const service = require('../services/vacancies.service');
const { toCamel } = require('convert-keys');

async function createVacancy(req, res) {
  const { vacancy, skills, city } = service.createVacancy(req.body);
  try {
    await db.vacancies.create(vacancy, skills, city);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

async function deleteVacancy(req, res) {
  try {
    await db.vacancies.delete(req.params.id);
    res.end();
  } catch (err) {
    if (err.message === '404') {
      res.status(404).end();
      return;
    }
    res.status(500).end();
  }
}

async function readVacancy(req, res) {
  try {
    const vacancy = await db.vacancies.readOne(req.params.id);
    if (!vacancy) {
      res.status(404).end();
    }
    res.json(toCamel(vacancy));
  } catch (err) {
    res.status(500).end();
  }
}

async function readVacancies(req, res) {
  try {
    const vacancies = await db.vacancies.readPage(req.query.p);
    res.json(toCamel(vacancies));
  } catch (err) {
    res.status(500).end();
  }
}

async function updateVacancy(req, res) {
  const id = req.params.id;
  const { vacancy, skills, city } = service.updateVacancy(req.body);

  try {
    await db.vacancies.update(id, vacancy, skills, city);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
}

module.exports = {
  createVacancy,
  deleteVacancy,
  readVacancy,
  readVacancies,
  updateVacancy,
};
