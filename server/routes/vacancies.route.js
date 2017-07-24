const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', controllers.vacancies.create.bind(controllers.vacancies));
router.get('/:id', controllers.vacancies.readOne.bind(controllers.vacancies));
router.get('/', controllers.vacancies.read.bind(controllers.vacancies));
router.patch('/:id', controllers.vacancies.update.bind(controllers.vacancies));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.vacancies.delete.bind(controllers.vacancies));

module.exports = router;
