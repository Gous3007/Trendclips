const cloudinary = require("../config/cloudinary");

const uploadPdfCloudinary = (buffer, orderId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "raw",
                folder: "shipping-labels",
                public_id: `order_${orderId}`,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        ).end(buffer);
    });
};

module.exports = uploadPdfCloudinary;
