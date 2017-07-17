const controller = require('../controllers/hirings.controller');
const router = require('express').Router();

router.post('/', controller.createHiring);
router.get('/', controller.readHirings);
router.get('/:id', controller.readHiring);
router.patch('/:id', controller.updateHiring);
router.delete('/:id', controller.deleteHiring);

module.exports = router;
