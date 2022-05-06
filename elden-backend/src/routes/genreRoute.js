const express = require("express");
const { getGenres, getGenre } = require("../controller/genreController");
const router = express.Router();

router.get("/", getGenres);

router.get("/:idGenre", getGenre);

module.exports = router;
