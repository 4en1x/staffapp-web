const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', controllers.hirings.create);
router.get('/', controllers.hirings.read);
router.get('/:id', controllers.hirings.readOne);
router.patch('/:id', controllers.hirings.update);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.hirings.delete);

module.exports = router;
