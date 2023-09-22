const express = require("express");

const controllers = require("../../Controllers/User/UController");
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));
router.post("/User/leaveform",controllers.leaveControl);
router.post('/User/Home', controllers.getAccountInfo);
router.post('/User/Logs', controllers.getLeaveRecords);


module.exports = router;