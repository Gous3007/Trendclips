import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import api from "../api/axios";
import TrendclipsLogo from "../../public/Trendclips_Logo-Photoroom.png";
import qr from "../../public/Trendclips qr Code.png";

const InvoiceDownload = ({ orderId }) => {
    const [order, setOrder] = useState(null);
    const invoiceRef = useRef(null);

    const itemsPerPage = 4; // User requirement: Max 4 items per page

    /* ================= FETCH ORDER ================= */
    useEffect(() => {
        if (!orderId) return;

        const fetchInvoice = async () => {
            try {
                const res = await api.get(`/api/order/invoice/${orderId}`);
                if (res.data?.success) {
                    setOrder(res.data.order);
                }
            } catch (err) {
                console.error("Invoice fetch error", err);
            }
        };

        fetchInvoice();
    }, [orderId]);

    /* ================= DOWNLOAD PDF ================= */
    const downloadPDF = () => {
        if (!invoiceRef.current) return;

        const element = invoiceRef.current;

        const opt = {
            margin: 0,
            filename: `Invoice_${order.orderId}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: 0
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['css'] } // Ensures pages split correctly
        };

        html2pdf().from(element).set(opt).save();
    };

    if (!order) return null;

    const { items, shippingAddress, priceDetails, createdAt } = order;

    /* ================= CALCULATIONS ================= */
    const totalMRP = items.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
    const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = totalMRP - subTotal;
    const finalAmount = subTotal + priceDetails.deliveryFee;

    const invoiceDate = new Date(createdAt).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric'
    });

    /* ================= PAGINATION LOGIC ================= */
    // Split items into chunks of 4
    const pages = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
        pages.push(items.slice(i, i + itemsPerPage));
    }

    /* ================= UI ================= */
    return (
        <>
            {/* DOWNLOAD BUTTON */}
            <button
                onClick={downloadPDF}
                style={{
                    padding: "12px 25px",
                    background: "#FF9900",
                    color: "#111",
                    borderRadius: "8px",
                    border: "1px solid #a88734",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "15px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    marginBottom: "20px"
                }}
            >
                Download Official Invoice
            </button>

            {/* HIDDEN INVOICE TEMPLATE */}
            <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                <div ref={invoiceRef}>
                    {pages.map((pageItems, pageIndex) => {
                        const isLastPage = pageIndex === pages.length - 1;

                        return (
                            <div
                                key={pageIndex}
                                style={{
                                    width: "210mm",
                                    padding: "15mm",
                                    backgroundColor: "#fff",
                                    fontFamily: "Arial, sans-serif",
                                    fontSize: "12px",
                                    color: "#333",
                                    boxSizing: "border-box",
                                    position: "relative",
                                    pageBreakAfter: isLastPage ? "avoid" : "always"
                                }}
                            >
                                {/* --- HEADER (Repeated on every page for context) --- */}
                                {pageIndex === 0 && (
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                                        <div>
                                            <div style={{ margin: "0", fontSize: "24px", fontStyle: "italic", fontWeight: "bold" }}>
                                                <img src={TrendclipsLogo} alt="Trendclips" width={"75px"} />
                                            </div>
                                            <p style={{ margin: "5px 0 0", fontSize: "14px", fontWeight: "bold" }}>Tax Invoice/Bill of Supply/Cash Memo</p>
                                            <p style={{ margin: "2px 0 0", fontSize: "12px" }}>
                                                (Original for Recipient) {pages.length > 1 && `- Page ${pageIndex + 1} of ${pages.length}`}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <h3 style={{ margin: "0 0 5px", fontSize: "16px" }}>Invoice Details</h3>
                                            <p style={{ margin: "2px 0" }}><b>Order ID:</b> {order.orderId}</p>
                                            <p style={{ margin: "2px 0" }}><b>Invoice Date:</b> {invoiceDate}</p>
                                        </div>
                                    </div>
                                )}
                                {/* --- ADDRESS SECTION (Repeated to maintain layout) --- */}
                                {pageIndex === 0 && (
                                    <div style={{ display: "flex", border: "1px solid #000", marginBottom: "15px" }}>
                                        <div style={{ width: "50%", padding: "10px", borderRight: "1px solid #000" }}>
                                            <h4 style={{ margin: "0 0 5px", fontSize: "13px", textTransform: "uppercase" }}>Sold By:</h4>
                                            <p style={{ margin: "0", fontWeight: "bold" }}>TrendClips Store</p>
                                            <p style={{ margin: "2px 0" }}>Nath Nagar Ausa</p>
                                            <p style={{ margin: "2px 0" }}>Latur, Maharashtra, 413520</p>
                                        </div>
                                        <div style={{ width: "50%", padding: "10px" }}>
                                            <h4 style={{ margin: "0 0 5px", fontSize: "13px", textTransform: "uppercase" }}>Billing & Shipping Address:</h4>
                                            <p style={{ margin: "0", fontWeight: "bold" }}>{shippingAddress.name}</p>
                                            <p style={{ margin: "2px 0" }}>{shippingAddress.flat}, {shippingAddress.area}</p>
                                            <p style={{ margin: "2px 0" }}>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                                            <p style={{ margin: "2px 0" }}><b>Phone:</b> {shippingAddress.mobile}</p>
                                        </div>
                                    </div>
                                )}
                                {/* --- TABLE (Only shows 4 items max per page) --- */}
                                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "15px", fontSize: "12px" }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f0f2f2", borderBottom: "1px solid #000" }}>
                                            <th style={{ padding: "8px", textAlign: "center", border: "1px solid #ccc", width: "5%" }}>Sl.</th>
                                            <th style={{ padding: "8px", textAlign: "left", border: "1px solid #ccc", width: "45%" }}>Description</th>
                                            <th style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc", width: "15%" }}>Unit Price</th>
                                            <th style={{ padding: "8px", textAlign: "center", border: "1px solid #ccc", width: "10%" }}>Qty</th>
                                            <th style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc", width: "10%" }}>Net Amount</th>
                                            <th style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc", width: "15%" }}>Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pageItems.map((item, i) => (
                                            <tr key={i}>
                                                {/* Calculate correct Serial Number based on page index */}
                                                <td style={{ padding: "8px", textAlign: "center", border: "1px solid #ccc" }}>
                                                    {(pageIndex * itemsPerPage) + i + 1}
                                                </td>
                                                <td style={{ padding: "8px", textAlign: "left", border: "1px solid #ccc" }}>
                                                    <div style={{ fontWeight: "bold" }}>{item.name}</div>
                                                    <div style={{ fontSize: "10px", color: "#555" }}>Item ID: {item.productId}</div>
                                                </td>
                                                <td style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc" }}>₹{item.mrp.toFixed(2)}</td>
                                                <td style={{ padding: "8px", textAlign: "center", border: "1px solid #ccc" }}>{item.quantity}</td>
                                                <td style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc" }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                                                <td style={{ padding: "8px", textAlign: "right", border: "1px solid #ccc", fontWeight: "bold" }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* --- TOTALS & SCANNER (ONLY ON LAST PAGE) --- */}
                                {isLastPage ? (
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        {/* LEFT SIDE: SCANNER IMAGE DIV */}
                                        <div style={{ width: "55%", paddingRight: "10px" }}>
                                            <div style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginBottom: "5px",
                                                marginTop: "25px"
                                            }}>
                                                <img
                                                    src={qr}
                                                    alt="Scan to Pay"
                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                />
                                            </div>
                                            <p style={{ margin: "0", fontSize: "10px", fontWeight: "bold" }}>Scan & Visit Our Website</p>
                                        </div>

                                        {/* RIGHT SIDE: CALCULATIONS */}
                                        <div style={{ width: "40%", border: "1px solid #ccc", padding: "10px", borderRadius: "4px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                                <span>Total Price:</span>
                                                <span>₹{totalMRP.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                                <span>Discount:</span>
                                                <span>- ₹{discount.toFixed(2)}</span>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                                <span>Shipping Charges:</span>
                                                <span>{priceDetails.deliveryFee === 0 ? "Free" : `₹${priceDetails.deliveryFee.toFixed(2)}`}</span>
                                            </div>
                                            <div style={{ borderTop: "1px solid #000", margin: "5px 0" }}></div>
                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "16px" }}>
                                                <span>Grand Total:</span>
                                                <span>₹{finalAmount.toFixed(2)}</span>
                                            </div>
                                            <div style={{ fontSize: "10px", textAlign: "right", marginTop: "5px", fontStyle: "italic" }}>
                                                (Inclusive of all taxes)
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // If NOT last page, show a small "Continued..." message
                                    <div style={{ textAlign: "right", fontStyle: "italic", marginTop: "20px" }}>
                                        Continued on next page...
                                    </div>
                                )}

                                {/* --- SIGNATURE (ONLY ON LAST PAGE) --- */}
                                {isLastPage && (
                                    <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                        <div style={{ width: "60%", fontSize: "10px" }}>
                                            <p style={{ fontWeight: "bold", marginBottom: "2px" }}>Terms & Conditions:</p>
                                            <ol style={{ paddingLeft: "15px", margin: "0" }}>
                                                <li>Goods once sold will not be taken back unless defective.</li>
                                                <li>Subject to Mumbai Jurisdiction only.</li>
                                                <li>This is a computer generated invoice.</li>
                                            </ol>
                                        </div>
                                        <div
                                            style={{
                                                textAlign: "right",
                                                width: "30%",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-end"
                                            }}
                                        >
                                            {/* Company Name */}
                                            <p
                                                style={{
                                                    marginBottom: "6px",
                                                    fontWeight: "bold",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                For TrendClips Store
                                            </p>

                                            {/* Signature Box (Perfect Centered) */}
                                            <div
                                                style={{
                                                    width: "140px",
                                                    height: "60px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginBottom: "6px"
                                                }}
                                            >
                                                <img
                                                    src="https://res.cloudinary.com/drppaqhmd/image/upload/v1769260348/uzeygmmz1uimaqoh5v6v.png"
                                                    alt="Authorized Signature"
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain",
                                                        display: "block"
                                                    }}
                                                />
                                            </div>

                                            {/* Signature Line */}
                                            <div
                                                style={{
                                                    width: "140px",
                                                    borderBottom: "1px solid #333",
                                                    marginBottom: "4px"
                                                }}
                                            ></div>

                                            {/* Label */}
                                            <p
                                                style={{
                                                    fontSize: "11px",
                                                    margin: 0
                                                }}
                                            >
                                                Authorized Signatory
                                            </p>
                                        </div>


                                    </div>
                                )}

                                {/* --- WATERMARK (Bottom of every page) --- */}
                                {/* {isLastPage && (
                                    <div style={{
                                        position: "absolute",
                                        bottom: "15mm",
                                        left: "0",
                                        right: "0",
                                        textAlign: "center",
                                        fontSize: "10px",
                                        color: "#999",
                                        marginTop: "100px"
                                    }}>
                                        Nath Nagar In Front Of Kumarswami Colleage Ausa, Latur, Maharashtra, 413520
                                    </div>
                                )} */
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default InvoiceDownload;