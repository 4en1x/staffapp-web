const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.get('/', controllers.candidates.read.bind(controllers.candidates));
router.get('/:id', controllers.candidates.readOne.bind(controllers.candidates));
router.post('/', controllers.candidates.create.bind(controllers.candidates));
router.patch('/:id', controllers.candidates.update.bind(controllers.candidates));

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.candidates.delete.bind(controllers.candidates));

module.exports = router;
