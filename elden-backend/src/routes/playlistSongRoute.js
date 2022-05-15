const express = require("express");
const {
  addSongToPlaylist,
  removeSongFromPlaylist,
} = require("../controller/playlistController");
const router = express.Router();
const { verifyClientAuth } = require("../util/auth");

router.post("/", verifyClientAuth, addSongToPlaylist);

router.delete("/", verifyClientAuth, removeSongFromPlaylist);

module.exports = router;
