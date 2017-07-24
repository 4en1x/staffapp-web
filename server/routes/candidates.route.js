const controller = require('../controllers/candidates.controller');
const authorization = require('../services/auth.service');
const router = require('express').Router();


// hr + admin section:
router.use(authorization.checkHR);
router.get('/', controller.readCandidates);
router.get('/:id', controller.readCandidate);
router.post('/', controller.createCandidate);
router.patch('/:id', controller.updateCandidate);

// admin section:
router.use(authorization.checkAdmin);
router.delete('/:id', controller.deleteCandidate);

module.exports = router;
