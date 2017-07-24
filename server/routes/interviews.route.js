const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// user + hr + admin section:
router.get('/', controllers.interviews.read.bind(controllers.interviews));
router.get('/:id', controllers.interviews.readOne.bind(controllers.interviews));

// hr + admin section:
router.use(authorization.checkHR);
router.patch('/:id', controllers.interviews.update.bind(controllers.interviews));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.interviews.delete.bind(controllers.interviews));

module.exports = router;
