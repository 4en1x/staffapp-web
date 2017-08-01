const controllers = require('../controllers/controllers');
const router = require('express').Router();


router.get('/', (req, res) => controllers.notifications.read(req, res));
router.get('/:id', (req, res) => controllers.notifications.readOne(req, res));
router.patch('/:id', (req, res) => controllers.notifications.update(req, res));
router.delete('/:id', (req, res) => controllers.notifications.delete(req, res));

module.exports = router;
