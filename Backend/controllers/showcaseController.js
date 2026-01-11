const Showcase = require("../model/Showcase");
const cloudinary = require("../config/cloudinary");


const streamUpload = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        stream.end(buffer);
    });
};

/* ================= ADD PRODUCT ================= */
exports.addShowcase = async (req, res) => {
    try {
        const { name, category, price, oldPrice, rating, type } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // 🔥 Folder Logic
        const folder =
            type === "featured"
                ? "Showcase Images/Featured Image"
                : "Showcase Images/Popular Image";

        // 🔥 Upload to Cloudinary
        const uploadResult = await streamUpload(req.file.buffer, folder);

        const discount = Math.round(
            ((oldPrice - price) / oldPrice) * 100
        );

        const product = await Showcase.create({
            name,
            category,
            price,
            oldPrice,
            rating,
            discount,
            addedAs: type,
            image: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            }
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= GET PRODUCTS ================= */
exports.getShowcase = async (req, res) => {
    try {
        const { type } = req.query;

        const data = await Showcase.find({ addedAs: type })
            .sort({ createdAt: -1 });

        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/* ================= DELETE PRODUCT ================= */
exports.deleteShowcase = async (req, res) => {
    try {
        const product = await Showcase.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 🔥 Delete from Cloudinary
        await cloudinary.uploader.destroy(
            product.image.public_id
        );

        // 🔥 Delete from MongoDB
        await product.deleteOne();

        res.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHomeProducts = async (req, res) => {
    try {
        const featured = await Showcase.find({ addedAs: "featured" })
            .limit(4)
            .sort({ createdAt: -1 });

        const popular = await Showcase.find({ addedAs: "popular" })
            .limit(4)
            .sort({ createdAt: -1 });

        res.status(200).json({
            featured,
            popular,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
