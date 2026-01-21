const express = require("express");
const router = express.Router();
const {
    createContact,
    getAllContacts,
    markAsRead,
    replyContact,
} = require("../controllers/contactController");

// Public Route (Frontend form)
router.post("/contact", createContact);

// Admin Route
router.get("/admin/contacts", getAllContacts);
router.put("/admin/contacts/read/:id", markAsRead);
router.put("/admin/contacts/reply/:id", replyContact);

module.exports = router;
