const express = require("express");
const { nextTick } = require("process");
const { registerUser } = require("../controller/userController");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/", userController.registerUser);

router.post("/login", userController.login);

module.exports = router;
