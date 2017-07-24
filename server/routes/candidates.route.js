const controllers = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();


// hr + admin section:
router.use(authorization.checkHR);
router.get('/', controllers.candidates.read);
router.get('/:id', controllers.candidates.readOne);
router.post('/', controllers.candidates.create);
router.patch('/:id', controllers.candidates.update);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controllers.candidates.delete);

module.exports = router;
