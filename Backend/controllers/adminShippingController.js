const Order = require("../model/Order");
const PDFDocument = require("pdfkit");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const bwipjs = require("bwip-js");
const axios = require("axios");

exports.shipOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // --- 1. CONFIGURATION ---
        const LOGO_URL = "https://res.cloudinary.com/drppaqhmd/image/upload/v1768930397/joiu7i1kl5dqoumoovww.png";
        const PRIMARY_COLOR = "#232f3e";
        const ACCENT_COLOR = "#444444";
        const MAX_VISIBLE_ITEMS = 4;

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        if (order.orderStatus !== "CONFIRMED") return res.status(400).json({ message: "Order already shipped" });

        // --- 2. PREPARE ASSETS ---
        const [logoBuffer, barcodeBuffer, qrCodeBuffer] = await Promise.all([
            axios.get(LOGO_URL, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data)).catch(() => null),
            bwipjs.toBuffer({ bcid: 'code128', text: order.orderId, scale: 2, height: 10, includetext: true, textxalign: 'center' }),
            bwipjs.toBuffer({ bcid: 'qrcode', text: `https://trendclips.in/track/${order.orderId}`, scale: 2 })
        ]);

        // --- 3. PDF SETUP ---
        const doc = new PDFDocument({
            margin: 20,
            size: 'A6',
            autoFirstPage: false // Manually control first page
        });

        let buffers = [];
        doc.on("data", buffers.push.bind(buffers));

        const formatPrice = (amount) => `Rs. ${Math.round(amount).toLocaleString('en-IN')}`;
        const drawLine = (y) => doc.moveTo(20, y).lineTo(277, y).lineWidth(0.5).strokeColor("#cccccc").stroke();

        // --- 4. SINGLE PAGE CREATION ---
        doc.addPage({ size: 'A6', margin: 20 });

        // Border
        doc.rect(10, 10, 277, 400).lineWidth(1).strokeColor("#000000").stroke();

        // Header
        let yPos = 25;
        if (logoBuffer) {
            doc.image(logoBuffer, 20, yPos - 5, { width: 60 });
        } else {
            doc.fontSize(16).font("Helvetica-Bold").text("Trendclips", 20, yPos);
        }

        doc.fontSize(8).font("Helvetica").fillColor(ACCENT_COLOR)
            .text("SHIPPING LABEL / INVOICE", 20, yPos, { align: "right", width: 257 });

        yPos += 25;
        drawLine(yPos);

        // Barcode
        yPos += 10;
        doc.image(barcodeBuffer, 80, yPos, { width: 140, height: 35, align: "center" });
        yPos += 45;

        // Address Box (COMPACT)
        doc.rect(20, yPos, 257, 60).fillColor("#f3f3f3").fill();
        doc.fillColor("black");

        doc.fontSize(7).font("Helvetica-Bold").text("SHIP TO:", 25, yPos + 8);
        doc.text("ORDER ID:", 180, yPos + 8);

        doc.fontSize(8).font("Helvetica-Bold").text(order.shippingAddress.name, 25, yPos + 20);
        doc.fontSize(7).font("Helvetica").text(order.orderId, 180, yPos + 20);
        doc.text(new Date().toLocaleDateString('en-IN'), 180, yPos + 32);

        doc.fontSize(7).font("Helvetica").text(
            `${order.shippingAddress.flat}, ${order.shippingAddress.area}\n` +
            `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}\n` +
            `Mob: ${order.shippingAddress.mobile}`,
            25, yPos + 32, { width: 150, lineGap: 1 }
        );

        yPos += 70;

        // >> PRODUCT TABLE (COMPACT VERSION) <<
        const tableTop = yPos;

        doc.fontSize(7).font("Helvetica-Bold").fillColor(ACCENT_COLOR);
        doc.text("ITEM DESCRIPTION", 20, tableTop);
        doc.text("QTY", 200, tableTop, { width: 20, align: "center" });
        doc.text("AMOUNT", 230, tableTop, { width: 45, align: "right" });

        doc.moveTo(20, tableTop + 8).lineTo(277, tableTop + 8).lineWidth(1).strokeColor("black").stroke();

        let itemY = tableTop + 12;
        doc.font("Helvetica").fontSize(7).fillColor("black");

        // Visible items
        const visibleItems = order.items.slice(0, MAX_VISIBLE_ITEMS);
        const remainingItems = order.items.slice(MAX_VISIBLE_ITEMS);

        visibleItems.forEach((item) => {
            const totalPrice = formatPrice(item.price * item.quantity);

            doc.text(item.name.substring(0, 35), 20, itemY, {
                width: 175
            });

            doc.text(item.quantity.toString(), 200, itemY, { width: 20, align: "center" });
            doc.text(totalPrice, 230, itemY, { width: 45, align: "right" });

            itemY += 12;
        });

        // Agar remaining items hain
        if (remainingItems.length > 0) {
            const remainingPrice = remainingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            doc.font("Helvetica-Oblique").fillColor("#666666");
            doc.text(`+ ${remainingItems.length} more items...`, 20, itemY);
            doc.text("-", 200, itemY, { width: 20, align: "center" });
            doc.text(formatPrice(remainingPrice), 230, itemY, { width: 45, align: "right" });

            itemY += 12;
            doc.fillColor("black").font("Helvetica");
        }

        drawLine(itemY);

        // >> SUMMARY SECTION (COMPACT)
        let summaryY = itemY + 8;
        const summaryLeft = 140;

        doc.fontSize(7).font("Helvetica");

        doc.text("Subtotal:", summaryLeft, summaryY);
        doc.text(formatPrice(order.priceDetails.subtotal), 200, summaryY, { align: "right", width: 77 });

        summaryY += 10;

        doc.text("Delivery Fee:", summaryLeft, summaryY);
        const deliveryText = order.priceDetails.deliveryFee === 0 ? "FREE" : formatPrice(order.priceDetails.deliveryFee);
        doc.text(deliveryText, 200, summaryY, { align: "right", width: 77 });

        summaryY += 10;

        // Grand Total (COMPACT)
        doc.rect(summaryLeft - 10, summaryY, 147, 18).fillColor(PRIMARY_COLOR).fill();
        doc.fillColor("white").fontSize(8).font("Helvetica-Bold");
        doc.text("GRAND TOTAL:", summaryLeft, summaryY + 5);
        doc.text(formatPrice(order.priceDetails.total), 200, summaryY + 5, { align: "right", width: 72 });

        // >> FOOTER (COMPACT)
        const footerY = Math.min(summaryY + 25, 380); // Ensure it fits
        doc.fillColor("black");
        doc.image(qrCodeBuffer, 25, footerY, { width: 40, height: 40 });

        doc.fontSize(9).font("Helvetica-Bold").text("Thank You", 75, footerY + 8);
        doc.fontSize(6).font("Helvetica").text("Visit us at trendclips.in for support", 75, footerY + 20);
        
        // Page break prevention - end the page properly
        doc.flushPages();

        // --- 5. FINALIZE ---
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
                console.error(uploadErr);
                res.status(500).json({ message: "Error uploading PDF" });
            }
        });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};