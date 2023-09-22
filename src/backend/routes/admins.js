const express = require("express");
const router = express.Router();
const adminsController = require("../controllers/admins");

router.get("/get-admins", adminsController.getAdmins);

router.delete("/delete-admin", adminsController.deleteAdmin);

module.exports = router;
