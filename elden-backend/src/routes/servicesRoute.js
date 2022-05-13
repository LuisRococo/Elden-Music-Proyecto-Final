const express = require("express");
const {
  getUserSongs,
  buyItems,
  isSongBought,
  isAlbumBougth,
  searchByName,
} = require("../controller/servicesController");
const { verifyClientAuth } = require("../util/auth");
const router = express.Router();

router.get("/user-songs", verifyClientAuth, getUserSongs);

router.post("/buy-songs", verifyClientAuth, buyItems);

router.get("/is-song-bought/:idSong", verifyClientAuth, isSongBought);

router.get("/is-album-bought/:idAlbum", verifyClientAuth, isAlbumBougth);

//SEARCH
router.get("/search-by-name/:name", searchByName);

module.exports = router;
