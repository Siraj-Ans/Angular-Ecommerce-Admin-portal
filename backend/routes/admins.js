const express = require("express");
const router = express.Router();
const adminsControllers = require("../../backend/controllers/admins");

router.post("/create-admin", adminsControllers.createAdmin);

router.get("/get-admins", adminsControllers.getAdmins);

router.delete("/delete-admin", adminsControllers.deleteAdmin);

module.exports = router;
