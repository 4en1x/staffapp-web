const controllers = require('../controllers/controllers');
const router = require('express').Router();

<<<<<<< HEAD

router.get('/:id', controller.readFeedback);
router.put('/:id', controller.updateFeedback);
=======
// user + hr + admin section:
router.get('/:id', controllers.feedbacks.readOne);
router.post('/:id', controllers.feedbacks.update);
>>>>>>> develop

module.exports = router;
