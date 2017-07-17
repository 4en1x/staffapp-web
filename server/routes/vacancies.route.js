const controller = require('../controllers/vacancies.controller');
const router = require('express').Router();

router.post('/', controller.createVacancy);
router.get('/:id', controller.readVacancy);
router.delete('/:id', controller.deleteVacancy);
router.get('/', controller.readVacancies);
router.patch('/:id', controller.updateVacancy);

module.exports = router;
