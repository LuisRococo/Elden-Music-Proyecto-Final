const express = require("express");
const { getFile, getSong } = require("../controller/fileController");
const { getGenres, getGenre } = require("../controller/genreController");
const { laterAuth } = require("../util/auth");
const router = express.Router();

router.get("/songs/:idSong", laterAuth, getSong);

router.get("/:idFile", getFile);

module.exports = router;
