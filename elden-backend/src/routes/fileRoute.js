const express = require("express");
const { getFile } = require("../controller/fileController");
const { getGenres, getGenre } = require("../controller/genreController");
const router = express.Router();

router.get("/:idFile", getFile);

module.exports = router;
