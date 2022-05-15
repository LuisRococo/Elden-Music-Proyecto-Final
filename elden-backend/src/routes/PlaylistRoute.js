const express = require("express");
const {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
} = require("../controller/playlistController");
const router = express.Router();
const { verifyClientAuth } = require("../util/auth");

router.get("/", verifyClientAuth, getPlaylists);

router.post("/", verifyClientAuth, createPlaylist);

router.post("/:id", verifyClientAuth, deletePlaylist);

module.exports = router;
