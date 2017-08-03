const controller = require('../controllers/controllers');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.get('/', (req, res) => controller.users.read(req, res));

module.exports = router;
