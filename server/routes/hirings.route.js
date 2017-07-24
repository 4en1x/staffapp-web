const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', (req, res) => controllers.hirings.create(req, res));
router.get('/', (req, res) => controllers.hirings.read(req, res));
router.get('/:id', (req, res) => controllers.hirings.readOne(req, res));
router.patch('/:id', (req, res) => controllers.hirings.update(req, res));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', (req, res) => controllers.hirings.delete(req, res));

module.exports = router;
