const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.get('/', (req, res) => controllers.candidates.read(req, res));
router.get('/:id', (req, res) => controllers.candidates.readOne(req, res));
router.post('/', (req, res) => controllers.candidates.create(req, res));
router.patch('/:id', (req, res) => controllers.candidates.update(req, res));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', (req, res) => controllers.candidates.delete(req, res));

module.exports = router;
