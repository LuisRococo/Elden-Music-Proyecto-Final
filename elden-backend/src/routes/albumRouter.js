const express = require("express");
const {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
} = require("../controller/albumController");
const router = express.Router();

router.get("/", getAlbums);

router.get("/", getAlbum);

router.post("/", createAlbum);

router.put("/", updateAlbum);

router.delete("/", deleteAlbum);

module.exports = router;
