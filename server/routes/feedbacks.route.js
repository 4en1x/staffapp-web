const controllers = require('../controllers/controllers');
const router = require('express').Router();

// user + hr + admin section:
router.get('/:id', controllers.feedbacks.readOne.bind(controllers.feedbacks));
router.put('/:id', controllers.feedbacks.update.bind(controllers.feedbacks));

module.exports = router;
