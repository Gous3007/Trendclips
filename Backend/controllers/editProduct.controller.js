const Product = require("../model/Product");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const deleteFromCloudinary = async (public_id) => {
    return cloudinary.uploader.destroy(public_id);
};

const streamUpload = (fileBuffer, folder = "products") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};
/* ================================
   GET PRODUCT BY productId
================================ */
exports.getProductByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/* ================================
   UPDATE PRODUCT BY productId
================================ */
exports.updateProductByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        // 1. Get product first
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // 2. DELETE images from cloudinary
        const deletedImages = req.body.deletedImages || [];

        if (deletedImages.length > 0) {
            for (const public_id of deletedImages) {
                await cloudinary.uploader.destroy(public_id);
            }
        }

        // 3. UPLOAD new images
        let newUploadedImages = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await streamUpload(file.buffer, "products");

                newUploadedImages.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        // 4. FILTER old images (remove deleted ones)
        const remainingImages = product.images.filter(
            img => !deletedImages.includes(img.public_id)
        );

        // 5. MERGE old + new images
        const finalImages = [...remainingImages, ...newUploadedImages];

        // 6. Update product
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.finalPrice = req.body.finalPrice;
        product.discount = req.body.discount;
        product.category = req.body.category;
        product.quantity = req.body.quantity;
        product.status = req.body.status;
        product.images = finalImages;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });

    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

