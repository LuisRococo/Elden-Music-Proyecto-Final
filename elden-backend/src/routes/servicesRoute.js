const express = require("express");
const {
  getUserSongs,
  buyItems,
  isSongBought,
  isAlbumBougth,
} = require("../controller/servicesController");
const { verifyClientAuth } = require("../util/auth");
const router = express.Router();

router.get("/user-songs", verifyClientAuth, getUserSongs);

router.post("/buy-songs", verifyClientAuth, buyItems);

router.get("/is-song-bought/:idSong", verifyClientAuth, isSongBought);

router.get("/is-album-bought/:idAlbum", verifyClientAuth, isAlbumBougth);

module.exports = router;
