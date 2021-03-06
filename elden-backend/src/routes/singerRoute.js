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

router.get("/:idSinger", getSinger);

router.post("/", verifyAdminAuth, createSinger);

router.delete("/", verifyAdminAuth, deleteSinger);

router.put("/", verifyAdminAuth, updateSinger);

module.exports = router;
