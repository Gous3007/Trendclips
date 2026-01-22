const express = require("express");
const router = express.Router();

const {
    saveAddress,
    getAddresses,
    updateAddress
} = require("../controllers/addressController");

router.post("/address", saveAddress);
router.get("/address/:guestId", getAddresses);
router.put("/:id", updateAddress);
module.exports = router;
