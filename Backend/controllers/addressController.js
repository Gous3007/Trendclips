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
