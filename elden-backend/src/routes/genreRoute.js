const express = require("express");
const { getGenres, createGenre } = require("../controller/genreController");
const router = express.Router();
const Genre = require("../db/models/genreModel");
const { verifyAdminAuth } = require("../util/auth");

router.get("/", getGenres);

router.post("/", verifyAdminAuth, createGenre);

module.exports = router;
