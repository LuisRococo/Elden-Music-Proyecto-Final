const express = require("express");
const {
  getAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
} = require("../controller/albumController");
const router = express.Router();
const { verifyAdminAuth } = require("../util/auth");

router.get("/", getAlbums);

router.get("/", getAlbum);

router.post("/", verifyAdminAuth, createAlbum);

router.delete("/", verifyAdminAuth, deleteAlbum);

module.exports = router;
