const express = require("express");
const { getGenres, getGenre } = require("../controller/genreController");
const router = express.Router();

router.get("/", getGenres);

router.get("/:idGenre", getGenre);

// router.post("/", verifyAdminAuth, createGenre);

// router.delete("/", verifyAdminAuth, deleteGenre);

// router.put("/", verifyAdminAuth, updateGenre);

module.exports = router;
