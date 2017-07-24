const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// user + hr + admin section:
router.get('/', controllers.interviews.read);
router.get('/:id', controllers.interviews.readOne);

// hr + admin section:
router.use(authorization.checkHR);
router.patch('/:id', controllers.interviews.update);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.interviews.delete);

module.exports = router;
