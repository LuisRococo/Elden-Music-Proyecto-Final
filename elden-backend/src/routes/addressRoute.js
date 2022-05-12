const express = require("express");
const {
  getAddressDefault,
  createAddress,
  deleteAddress,
  getUserAddresses,
} = require("../controller/addressController");
const router = express.Router();
const { verifyClientAuth } = require("../util/auth");

router.get("/", verifyClientAuth, getUserAddresses);

router.get("/default", verifyClientAuth, getAddressDefault);

router.post("/", verifyClientAuth, createAddress);

router.delete("/", verifyClientAuth, deleteAddress);

module.exports = router;
