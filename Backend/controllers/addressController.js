const Address = require("../model/Address");

exports.saveAddress = async (req, res) => {
    try {
        await Address.create(req.body);

        const addresses = await Address.find({
            guestId: req.body.guestId
        });

        res.json({ success: true, addresses });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.getAddresses = async (req, res) => {
    const addresses = await Address.find({
        guestId: req.params.guestId
    });

    res.json({ addresses });
};

exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { guestId } = req.body;

        const address = await Address.findById(id);

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (address.guestId !== guestId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Address.findByIdAndUpdate(
            id,
            {
                ...req.body,
                addressType: req.body.type // 🔥 FIX mapping
            },
            { new: true }
        );

        const addresses = await Address.find({ guestId }).sort({ createdAt: -1 });

        res.json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Failed to update address" });
    }
};
