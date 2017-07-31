const controllers = require('../controllers/controllers');
const router = require('express').Router();

// user + hr + admin section:
router.get('/:id', (req, res) => controllers.feedbacks.readOne(req, res));
router.put('/:id', (req, res) => controllers.feedbacks.update(req, res));

module.exports = router;
