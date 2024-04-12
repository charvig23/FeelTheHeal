const express = require("express");
const applicationController = require("../controller/application.js");
const singleUpload = require("../middlewares/multer.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware.js");
const router = express.Router();


router.route('/submit/application').post(authMiddleware, singleUpload,  applicationController.submitApplication);
router.route("/get-application").get(adminAuthMiddleware, applicationController.getApplication);
router.route("/application/:id").put(adminAuthMiddleware, applicationController.updateApplication).get(adminAuthMiddleware, applicationController.getApplicationById);
router.get('/reviewedApplications', adminAuthMiddleware, applicationController.getReviewedApplications);
router.route('/approved/applications').get(applicationController.getApprovedApplications);
router.route('/confirm/donation/:id').post(applicationController.confirmDonation);
router.route('/delete/application/:id').get(applicationController.deleteApplication);


module.exports = router;