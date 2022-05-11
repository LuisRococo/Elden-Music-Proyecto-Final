const express = require("express");
const {
  getUserSongs,
  buySongs,
  isSongBought,
} = require("../controller/servicesController");
const { verifyClientAuth } = require("../util/auth");
const router = express.Router();

router.get("/user-songs", verifyClientAuth, getUserSongs);

router.post("/buy-songs", verifyClientAuth, buySongs);

router.get("/is-song-bought", verifyClientAuth, isSongBought);

module.exports = router;
