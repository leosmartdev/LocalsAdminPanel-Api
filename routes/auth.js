const express = require('express');
const router = express.Router();
const { signup, login, adminlogin, myAccount } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/authHandler');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/adminlogin').post(adminlogin);
router.route('/me').get(verifyToken, myAccount);

module.exports = router;
