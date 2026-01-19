const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");

const categoryPrefixMap = {
    "Hair Clips": "HC",
    "Scrunchies": "SC",
    "Headbands": "HB",
    "Barrettes": "BR",
    "Home & Kitchen": "HK",
    "Stationery": "ST"
};

const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "Trendclips Product" },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        stream.end(buffer);
    });
};

const generateProductId = async (category) => {
    const prefix = categoryPrefixMap[category];

    const lastProduct = await Product.findOne({
        category,
        productId: { $regex: `^${prefix}` }
    }).sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastProduct && lastProduct.productId) {
        const lastNumber = parseInt(
            lastProduct.productId.replace(prefix, "")
        );
        nextNumber = lastNumber + 1;
    }

    return `${prefix}${String(nextNumber).padStart(4, "0")}`;
};

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discount,
            category,
            quantity
        } = req.body;

        if (!title || !price || !category) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // 🔹 Generate unique product ID
        const productId = await generateProductId(category);

        // 🔹 Upload images to Cloudinary
        let uploadedImages = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await streamUpload(file.buffer);

                uploadedImages.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
        }

        // 🔹 Price calculation
        const finalPrice =
            discount > 0
                ? price - (price * discount) / 100
                : price;

        // 🔹 Save to DB
        const product = await Product.create({
            productId,
            title,
            description,
            images: uploadedImages,
            price,
            discount,
            finalPrice,
            category,
            quantity
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;

        // 🧠 filter object
        let filter = {};

        // ✅ agar category aayi hai to filter lagao
        if (category) {
            filter.category = category;
        }

        const products = await Product
            .find(filter)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.error("Get Products Error ❌", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // 1️⃣ Product find karo
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 2️⃣ Cloudinary se images delete karo
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                await cloudinary.uploader.destroy(img.public_id);
            }
        }

        // 3️⃣ MongoDB se product delete
        await Product.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params; // ✅ id milega ab

        const product = await Product.findById(id);


        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};