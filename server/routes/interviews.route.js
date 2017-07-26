const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// user + hr + admin section:
router.get('/', (req, res) => controllers.interviews.read(req, res));
router.get('/:id', (req, res) => controllers.interviews.readOne(req, res));

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', (req, res) => controllers.interviews.create(req, res));
router.patch('/:id', (req, res) => controllers.interviews.update(req, res));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', (req, res) => controllers.interviews.delete(req, res));

module.exports = router;
