const controller = require('../controllers/candidates.controller');
const router = require('express').Router();

router.get('/', controller.readCandidates);
router.get('/:id', controller.readCandidate);
router.post('/', controller.createCandidate);
router.patch('/:id', controller.updateCandidate);
router.delete('/:id', controller.deleteCandidate);

module.exports = router;
