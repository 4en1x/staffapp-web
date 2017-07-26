const controller = require('../controllers/search.controller');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// hr + admin section:
router.use(authorization.checkHR);
router.get('/', (req, res) => controller.search(req, res));

module.exports = router;
