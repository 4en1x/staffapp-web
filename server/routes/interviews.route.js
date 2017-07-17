const controller = require('../controllers/interviews.controller');
const router = require('express').Router();

router.get('/', controller.readInterviews);
router.get('/:id', controller.readInterview);
router.delete('/:id', controller.deleteInterview);
router.patch('/:id', controller.updateInterview);

module.exports = router;
