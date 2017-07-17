const controller = require('./../controllers/feedbacks.controller');
const router = require('express').Router();


router.get('/:id', controller.readFeedback);
router.post('/:id', controller.updateFeedback);

module.exports = router;
