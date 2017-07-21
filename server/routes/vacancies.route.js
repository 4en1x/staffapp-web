const controller = require('../controllers/vacancies.controller');
const router = require('express').Router();
const authorization = require('../services/auth.service');

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', controller.createVacancy);
router.get('/:id', controller.readVacancy);
router.get('/', controller.readVacancies);
router.patch('/:id', controller.updateVacancy);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controller.deleteVacancy);

module.exports = router;
