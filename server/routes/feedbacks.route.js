const controller = require('./../controllers/feedbacks.controller');
const router = require('express').Router();


router.get('/:id', controller.readFeedback);
router.put('/:id', controller.updateFeedback);

module.exports = router;
