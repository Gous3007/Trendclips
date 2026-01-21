const Order = require("../model/Order");
const PDFDocument = require("pdfkit");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const bwipjs = require("bwip-js");
const axios = require("axios"); // 1. Axios import karein

exports.shipOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const LOGO_URL = "https://res.cloudinary.com/drppaqhmd/image/upload/v1768930397/joiu7i1kl5dqoumoovww.png";
        // ------------------------------------

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.orderStatus !== "CONFIRMED") return res.status(400).json({ message: "Order already shipped" });

        // 1. PDF Setup (A6 Size)
        const doc = new PDFDocument({ margin: 15, size: 'A6' });
        let buffers = [];
        doc.on("data", buffers.push.bind(buffers));

        // Helper: Price Formatting
        const formatPrice = (amount) => Math.round(amount);

        // 2. PREPARE ASSETS (Barcode, QR, & Logo Fetch)
        // Hum Promise.all use karenge taaki sab parallel me fast load ho

        let logoBuffer = null;

        try {
            // A. Fetch Logo from URL
            const response = await axios.get(LOGO_URL, { responseType: 'arraybuffer' });
            logoBuffer = Buffer.from(response.data, 'utf-8');
        } catch (error) {
            console.error("Logo Fetch Error:", error.message);
            // Agar link kharab hua to logoBuffer null rahega, code crash nahi hoga
        }

        // B. Generate Barcode
        const barcodeBuffer = await bwipjs.toBuffer({
            bcid: 'code128', text: order.orderId, scale: 2, height: 8, includetext: true, textxalign: 'center',
        });

        // C. Generate QR Code
        const qrCodeBuffer = await bwipjs.toBuffer({
            bcid: 'qrcode', text: 'https://trendclips.in', scale: 2, textxalign: 'center',
        });


        // --- 3. PDF DRAWING START ---

        // Logo Section
        if (logoBuffer) {
            try {
                // Agar Logo mil gaya to image lagao
                doc.image(logoBuffer, 15, 10, { width: 50 }); // Width adjust karein
            } catch (err) {
                // Corrupt image handling
                doc.fontSize(14).font("Helvetica-Bold").text("Trendclips", 15, 15);
            }
        } else {
            // Agar Logo fetch fail hua to Text dikhao
            doc.fontSize(14).font("Helvetica-Bold").text("Trendclips", 15, 15);
        }

        doc.fontSize(8).font("Helvetica").text("Shipping Label / Invoice", 15, 35);

        // Barcode (Top Right)
        doc.image(barcodeBuffer, 160, 10, { width: 120 });

        doc.moveTo(15, 55).lineTo(280, 55).stroke(); // Divider Line

        // 4. SHIPPING ADDRESS
        const topSectionY = 65;
        doc.fontSize(9).font("Helvetica-Bold").text("Ship To:", 15, topSectionY);
        doc.font("Helvetica").fontSize(8);

        const addressText = `${order.shippingAddress.name}\n` +
            `${order.shippingAddress.flat}, ${order.shippingAddress.area}\n` +
            `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n` +
            `Mob: ${order.shippingAddress.mobile}`;

        doc.text(addressText, 15, topSectionY + 12, { width: 160, lineGap: 2 });

        // Date & Order ID
        doc.font("Helvetica-Bold").text("Date:", 190, topSectionY);
        doc.font("Helvetica").text(new Date().toLocaleDateString(), 190, topSectionY + 12);

        doc.font("Helvetica-Bold").text("Order #:", 190, topSectionY + 30);
        doc.font("Helvetica").text(order.orderId, 190, topSectionY + 42);

        // 5. PRODUCT TABLE
        const tableTop = 135;
        doc.rect(15, tableTop, 265, 15).fill("#eeeeee").stroke();
        doc.fillColor("black");

        doc.font("Helvetica-Bold").fontSize(7);
        doc.text("Item", 20, tableTop + 5);
        doc.text("Qty", 180, tableTop + 5);
        doc.text("Amt", 240, tableTop + 5);

        let yPosition = tableTop + 20;
        doc.font("Helvetica").fontSize(8);

        order.items.forEach((item) => {
            const totalPrice = formatPrice(item.price * item.quantity);
            doc.text(item.name.substring(0, 35), 20, yPosition, { width: 150, ellipsis: true });
            doc.text(item.quantity.toString(), 185, yPosition);
            doc.text("₹" + totalPrice, 240, yPosition);
            yPosition += 15;
        });

        doc.moveTo(15, yPosition).lineTo(280, yPosition).stroke();

        // 6. TOTALS
        yPosition += 10;
        doc.font("Helvetica-Bold").fontSize(9);
        doc.text("Total:", 180, yPosition);
        doc.text("₹" + formatPrice(order.priceDetails.total), 238, yPosition);

        // 7. FOOTER
        const footerY = 320;
        doc.image(qrCodeBuffer, 120, footerY, { width: 50 });
        doc.fontSize(7).font("Helvetica").text("Scan to Visit Website", 15, footerY + 55, { align: "center", width: 265 });
        doc.text("Thank you for shopping!", 15, footerY + 65, { align: "center", width: 265 });

        // --- END ---

        doc.on("end", async () => {
            try {
                const pdfBuffer = Buffer.concat(buffers);
                const upload = await new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "shipping_pdfs",
                            resource_type: "raw",
                            format: "pdf",
                            public_id: `label_${order.orderId}`,
                            use_filename: true,
                            unique_filename: false,
                        },
                        (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        }
                    );
                    streamifier.createReadStream(pdfBuffer).pipe(stream);
                });

                order.orderStatus = "SHIPPED";
                order.shippingPdf = upload.secure_url;
                await order.save();

                res.status(200).json({ success: true, message: "Order shipped", pdf: upload.secure_url });
            } catch (uploadErr) {
                res.status(500).json({ message: "Error uploading PDF" });
            }
        });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};