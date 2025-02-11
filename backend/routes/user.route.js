const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { register, login, logout, updateProfile } = require('../controllers/user.controller')
const { singleUpload } = require('../middlewares/multer');

router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, updateProfile);

module.exports = router;