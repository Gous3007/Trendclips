const express = require("express");
const router = express.Router();

const {
    saveAddress,
    getAddresses
} = require("../controllers/addressController");

router.post("/address", saveAddress);
router.get("/address/:guestId", getAddresses);

module.exports = router;
