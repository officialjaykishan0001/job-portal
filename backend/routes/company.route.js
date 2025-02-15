const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { registerCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/company.controller');
const { singleUpload } = require('../middlewares/multer')

router.route('/register').post(isAuthenticated, registerCompany);
router.route('/get').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, singleUpload, updateCompany);

module.exports = router;