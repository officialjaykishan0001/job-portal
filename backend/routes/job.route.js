const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { postJob, getAllJobs, getAdminJobs, getJobById } = require('../controllers/job.controller')

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(isAuthenticated, getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);

module.exports = router;