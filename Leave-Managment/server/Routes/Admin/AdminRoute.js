const express = require("express");

const controllers = require("../../Controllers/Admin/AController");

const router = express.Router();

router.delete("/admin/delete/:id",controllers.userdelete);
router.get("/admin/details",controllers.userget);
router.put("/admin/status/:id",controllers.userstatus);
router.post("/admin/register",controllers.userpost);
router.get("/admin/:id",controllers.singleuserget);
router.put("/admin/:id",controllers.useredit);
router.post('/admin/logs', controllers.getAllLeaveRequests);
router.put("/admin/status/:id",controllers.userstatus);

module.exports = router;