const express = require("express");
const {
  getGenres,
  createGenre,
  getGenre,
  deleteGenre,
  updateGenre
} = require("../controller/genreController");
const router = express.Router();
const Genre = require("../db/models/genreModel");
const { verifyAdminAuth } = require("../util/auth");

router.get("/", getGenres);

router.get("/:_id", getGenre);

router.post("/", verifyAdminAuth, createGenre);

router.delete("/", verifyAdminAuth, deleteGenre);

router.put("/", verifyAdminAuth, updateGenre);

module.exports = router;
