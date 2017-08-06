const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', (req, res) => controllers.vacancies.create(req, res));
router.get('/fillLists', (req, res) => controllers.vacancies.fillLists(req, res));
router.get('/:id', (req, res) => controllers.vacancies.readOne(req, res));
router.get('/', (req, res) => controllers.vacancies.read(req, res));
router.get('/:id/history', (req, res) => controllers.vacancies.readHistoryById(req, res));
router.get('/:id/candidatesHistory', (req, res) => controllers.vacancies.readCandidatesHistoryById(req, res));
router.get('/:id/pickCandidates', (req, res) => controllers.vacancies.pickCandidates(req, res));
router.patch('/:id', (req, res) => controllers.vacancies.update(req, res));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', (req, res) => controllers.vacancies.delete(req, res));

module.exports = router;
