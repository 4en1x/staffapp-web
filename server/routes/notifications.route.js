const controllers = require('../controllers/controllers');
const router = require('express').Router();


router.get('/', (req, res) => controllers.notifications.read(req, res));
router.patch('/:id', (req, res) => controllers.notifications.update(req, res));

module.exports = router;
