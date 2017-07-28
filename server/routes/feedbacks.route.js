const controllers = require('../controllers/controllers');
const router = require('express').Router();

// user + hr + admin section:
router.get('/:id', controllers.feedbacks.readOne);
router.post('/:id', controllers.feedbacks.update);

module.exports = router;
