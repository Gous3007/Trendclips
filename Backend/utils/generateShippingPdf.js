const PDFDocument = require("pdfkit");

const generateShippingPdf = (order, address) => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        doc.fontSize(18).text("Shipping Label", { align: "center" });
        doc.moveDown();

        doc.fontSize(12);
        doc.text(`Order ID: ${order.orderId}`);
        doc.text(`Name: ${address.name}`);
        doc.text(`Mobile: ${address.mobile}`);
        doc.text(`Address: ${address.flat}, ${address.area}`);
        doc.text(`City: ${address.city}`);
        doc.text(`State: ${address.state}`);
        doc.text(`Pincode: ${address.pincode}`);
        doc.text(`Country: ${address.country}`);
        doc.moveDown();
        doc.text(`Total Amount: ₹${order.priceDetails.total}`);

        doc.end();
    });
};

module.exports = generateShippingPdf;
