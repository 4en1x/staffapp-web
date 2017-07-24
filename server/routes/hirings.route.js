const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', controllers.hirings.create.bind(controllers.hirings));
router.get('/', controllers.hirings.read.bind(controllers.hirings));
router.get('/:id', controllers.hirings.readOne.bind(controllers.hirings));
router.patch('/:id', controllers.hirings.update.bind(controllers.hirings));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.hirings.delete.bind(controllers.hirings));

module.exports = router;
