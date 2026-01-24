import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
// 1. Import Toast library
import toast, { Toaster } from "react-hot-toast";

const AdminOrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllItems, setShowAllItems] = useState(false);

    useEffect(() => {
        api.get(`/api/dashboard/admin/order/${id}`)
            .then(res => setOrder(res.data.order))
            .catch(err => toast.error("Failed to load order"))
            .finally(() => setLoading(false));
    }, [id]);

    // 2. ACTUAL SHIPPING LOGIC (Called after confirmation)
    const executeShipping = async () => {
        // Promise toast: Shows Loading -> Success -> Error automatically
        const shippingPromise = api.post(`/api/dashboard/admin/order/ship/${order._id}`);

        toast.promise(shippingPromise, {
            loading: 'Generating Shipping Label...',
            success: 'Order Shipped Successfully!',
            error: 'Failed to ship order.',
        }, {
            style: {
                background: '#333',
                color: '#fff',
            },
        });

        try {
            const res = await shippingPromise;

            // Open PDF
            window.open(res.data.pdf, "_blank");

            // Update State
            setOrder(prev => ({
                ...prev,
                orderStatus: "SHIPPED",
                shippingPdf: res.data.pdf
            }));
        } catch (error) {
            console.error(error);
        }
    };

    // 3. TRIGGER CONFIRMATION TOAST
    const confirmShipOrder = () => {
        toast((t) => (
            <div className="flex flex-col gap-4 items-center">
                <span className="font-semibold text-lg text-gray-800">
                    Ship this order?
                </span>

                <div className="flex gap-4 mt-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            executeShipping();
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-md transition-colors"
                    >
                        Yes, Ship it
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-5 py-2 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            position: "top-center",
            style: {
                minWidth: "320px",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                background: "#FFFFFF",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            },
        });
    };

    const handlePrintInvoice = () => {
        if (order.shippingPdf) {
            window.open(order.shippingPdf, "_blank");
        } else {
            toast.error("Invoice not available yet", {
                style: { background: '#333', color: '#fff' }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "SHIPPED": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "CONFIRMED": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "CANCELLED": return "bg-red-500/20 text-red-400 border-red-500/30";
            default: return "bg-gray-700 text-gray-300 border-gray-600";
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );

    const visibleItems = showAllItems ? order.items : order.items.slice(0, 2);
    const remainingItems = order.items.length - 2;

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100 p-6 md:p-10 font-sans">

            {/* 4. TOASTER COMPONENT (Required to show notifications) */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* --- HEADER SECTION --- */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Order Details</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus}
                        </span>
                    </div>
                    <p className="text-gray-400">Order ID: <span className="font-mono text-gray-200">#{order.orderId}</span></p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handlePrintInvoice}
                        disabled={!order.shippingPdf}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all ${order.shippingPdf
                            ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-500 shadow-sm"
                            : "bg-gray-800/50 text-gray-500 border-gray-700 cursor-not-allowed"
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        {order.shippingPdf ? "Download/Print Invoice" : "Invoice Unavailable"}
                    </button>

                    {order.orderStatus === "CONFIRMED" && (
                        <button
                            onClick={confirmShipOrder} // Changed from shipOrder to confirmShipOrder
                            className="flex items-center gap-2 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition-all shadow-lg shadow-yellow-500/20 transform active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            Ship Order
                        </button>
                    )}
                </div>
            </div>

            {/* --- MAIN GRID --- */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: ITEMS & SUMMARY */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items Card */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                            <h3 className="text-lg font-semibold text-white">Items Ordered ({order.items.length})</h3>
                        </div>

                        <div className="p-2">
                            {visibleItems.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-4 rounded-lg border border-gray-700/60 bg-gray-800/40 hover:bg-gray-700/30 transition-colors"
                                >
                                    {/* Product Image */}
                                    <div className="h-20 w-20 shrink-0 rounded-md overflow-hidden border border-gray-600 bg-gray-900">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "/placeholder.png";
                                            }}
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        {/* Title + Price */}
                                        <div className="flex justify-between items-start gap-4">
                                            <h4 className="font-medium text-gray-200 text-base leading-snug line-clamp-2">
                                                {item.name}
                                            </h4>

                                            <p className="font-bold text-white whitespace-nowrap text-lg">
                                                ₹{Math.floor(item.price * item.quantity)}
                                            </p>
                                        </div>

                                        {/* Product ID */}
                                        <p className="text-xs text-gray-400 mt-1">
                                            Product ID:
                                            <span className="ml-1 font-mono text-gray-300">
                                                {item.productId || "N/A"}
                                            </span>
                                        </p>

                                        {/* Seller */}
                                        <p className="text-sm text-gray-400 mt-1">
                                            Sold by: <span className="text-gray-300">TrendClips Retail</span>
                                        </p>

                                        {/* Quantity & Unit Price */}
                                        <div className="mt-3 flex items-center gap-4 text-sm">
                                            <span className="bg-gray-700/70 text-gray-200 px-2.5 py-1 rounded-md">
                                                Qty: {item.quantity}
                                            </span>

                                            <span className="text-gray-400">
                                                Unit Price: ₹{Math.floor(item.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            ))}


                            {order.items.length > 2 && (
                                <button
                                    onClick={() => setShowAllItems(!showAllItems)}
                                    className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 hover:bg-gray-700/50 transition-colors border-t border-gray-700"
                                >
                                    {showAllItems ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            Show Less
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            See {remainingItems} more items
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-400">
                                <span>Item(s) Subtotal:</span>
                                <span>₹{Math.floor(order.priceDetails.subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Delivery:</span>
                                <span>₹{order.priceDetails.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Payment Method:</span>
                                <span className="capitalize text-gray-200">{order.payment.method}</span>
                            </div>
                            <div className="border-t border-gray-700 pt-3 mt-3 flex justify-between text-xl font-bold text-white">
                                <span>Grand Total:</span>
                                <span className="text-yellow-500">₹{Math.floor(order.priceDetails.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: CUSTOMER INFO */}
                <div className="space-y-6">
                    {/* Shipping Address Card */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                        <div className="p-4 bg-gray-700/30 border-b border-gray-700">
                            <h3 className="font-semibold text-white">Shipping Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="bg-blue-500/10 p-2 rounded-full text-blue-400 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-white text-lg">{order.shippingAddress.name}</p>
                                    <p className="text-blue-400 text-sm font-medium">{order.shippingAddress.mobile}</p>
                                </div>
                            </div>

                            <div className="pl-12 text-gray-300 text-sm space-y-1 relative">
                                <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-gray-700"></div>
                                <p>{order.shippingAddress.flat}, {order.shippingAddress.area}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                                <p className="font-mono text-gray-400">{order.shippingAddress.pincode}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Tracking Card */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl p-6">
                        <h3 className="font-semibold text-white mb-4">Tracking</h3>
                        {order.orderStatus === "SHIPPED" ? (
                            <div className="relative pl-6 border-l-2 border-green-500 space-y-6">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase font-bold">Current Status</p>
                                    <p className="text-green-400 font-medium">Shipped</p>
                                    <p className="text-xs text-gray-500 mt-1">Package has left our facility.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6 text-gray-500 bg-gray-900/50 rounded border border-dashed border-gray-700">
                                <p>Order not yet shipped</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetail;