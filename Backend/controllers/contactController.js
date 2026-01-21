const Contact = require("../model/Contact");

// 📩 SAVE CONTACT MESSAGE
exports.createContact = async (req, res) => {
    try {
        const { fullName, email, phone, message } = req.body;

        // Basic validation
        if (!fullName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Full name, email and message are required",
            });
        }

        const contact = await Contact.create({
            fullName,
            email,
            phone,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: contact,
        });
    } catch (error) {
        console.error("Contact Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

// 📋 GET ALL CONTACTS (ADMIN)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            data: contacts,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
};

// 👀 MARK AS READ
exports.markAsRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: "Read" },
            { new: true }
        );

        res.json({ success: true, data: contact });
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
};

// 💬 REPLY TO CONTACT
exports.replyContact = async (req, res) => {
    try {
        const { reply } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            {
                reply,
                status: "Replied",
            },
            { new: true }
        );

        res.json({
            success: true,
            message: "Reply saved",
            data: contact,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to reply" });
    }
};
