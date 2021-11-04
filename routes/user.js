const express = require('express');
const router = express.Router();
const { getUserList, updateUserProfile, deleteUserAccount } = require('../controllers/users');
const { signup } = require('../controllers/auth');

router.route('/manage-users').get(getUserList).post(signup).put(updateUserProfile);
router.route('/manage-users/:userId').delete(deleteUserAccount);

module.exports = router;
