const express = require("express");
const { getTopSongsSinger } = require("../controller/topSongsController");
const router = express.Router();

router.get("/:idSinger", getTopSongsSinger);

module.exports = router;
