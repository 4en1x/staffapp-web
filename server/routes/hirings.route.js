const controller = require('../controllers/hirings.controller');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.post('/', controller.createHiring);
router.get('/', controller.readHirings);
router.get('/:id', controller.readHiring);
router.patch('/:id', controller.updateHiring);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controller.deleteHiring);

module.exports = router;
