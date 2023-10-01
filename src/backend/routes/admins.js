const express = require("express");
const router = express.Router();
const adminsControllers = require("../controllers/admins");

router.get("/get-admins", adminsControllers.getAdmins);

router.delete("/delete-admin", adminsControllers.deleteAdmin);

module.exports = router;
