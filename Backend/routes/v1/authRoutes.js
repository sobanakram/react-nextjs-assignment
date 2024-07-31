const router = require("express").Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middlewares/authMiddleware');

//auth routes
router.post('/log_in', authController.login);
router.patch('/sign_out', authMiddleware.verifyAuth, authController.signout);

module.exports = router;