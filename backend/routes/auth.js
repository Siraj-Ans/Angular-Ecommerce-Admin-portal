const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.get("/login", authControllers.login);

router.post("/sign-up", authControllers.signup);

module.exports = router;
