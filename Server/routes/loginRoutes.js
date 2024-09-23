const router = require('express').Router();
const loginController = require('../controllers/loginController');
// const { verifytoken } = require('../middleware/authmiddleware');
// Route for user login
router.post('/login', loginController.loginUsers);

// Route for user signup
router.post('/signup', loginController.signupUsers);

// Route for user logout
router.post('/logout',  loginController.logoutUsers);

module.exports = router;
