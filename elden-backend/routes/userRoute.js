const express = require("express");
const { nextTick } = require("process");
const { registerUser } = require("../controller/userController");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    const asnwer = await registerUser(userName, email, password);
    res.send(asnwer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
