const express = require("express");
const router = express.Router();

const controllers = require("../../Controllers/Auth/AuController");

const bodyParser = require('body-parser');
const path = require('path');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

router.post("/admin/login",controllers.adminLogin);
router.post("/admin/sendotp",controllers.adminOtpSend);

router.post("/user/login",controllers.userLogin);
router.post("/user/sendotp",controllers.userOtpSend);

module.exports = router;