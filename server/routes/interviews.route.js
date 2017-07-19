const controller = require('../controllers/interviews.controller');
const authorization = require('../services/auth.service');
const router = require('express').Router();

// user + hr + admin section:
router.get('/', controller.readInterviews);
router.get('/:id', controller.readInterview);

// hr + admin section:
router.use(authorization.checkHR);
router.patch('/:id', controller.updateInterview);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controller.deleteInterview);

module.exports = router;
