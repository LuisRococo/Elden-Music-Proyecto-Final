const express = require("express");
const {
  getSingers,
  getSinger,
  updateSinger,
  deleteSinger,
  createSinger,
} = require("../controller/singerController");
const { verifyAdminAuth } = require("../util/auth");
const router = express.Router();

router.get("/", getSingers);

router.get("/:_id", getSinger);

router.post("/", verifyAdminAuth, createSinger);

router.delete("/", deleteSinger);

router.put("/", updateSinger);

module.exports = router;
