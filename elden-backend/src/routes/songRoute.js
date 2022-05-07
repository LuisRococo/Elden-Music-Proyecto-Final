const express = require("express");
const {
  createSong,
  getSong,
  getSongs,
} = require("../controller/songController");
const { verifyAdminAuth } = require("../util/auth");
const router = express.Router();

router.get("/", getSongs);

router.get("/:_id", getSong);

router.post("/", verifyAdminAuth, createSong);

module.exports = router;
