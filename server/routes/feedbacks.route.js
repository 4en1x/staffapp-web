const controller = require('./../controllers/feedbacks.controller');
const router = require('express').Router();

// user + hr + admin section:
router.get('/:id', controller.readFeedback);
router.post('/:id', controller.updateFeedback);

module.exports = router;
