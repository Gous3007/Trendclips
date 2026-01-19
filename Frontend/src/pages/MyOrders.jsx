import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Navigation ke liye import
import api from "../api/axios";
import { getGuestId } from "../utils/guest";
import {
    CheckCircle2,
    Truck,
    PackageCheck,
    XCircle,
    Clock,
    Search,
    ShoppingBag
} from "lucide-react";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const guestId = getGuestId();

    useEffect(() => {
        if (guestId) {
            setLoading(true);
            api.get(`/api/order/my-orders/${guestId}`)
                .then(res => {
                    if (res.data.success) {
                        setOrders(res.data.orders);
                    }
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [guestId]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric"
        });
    };

    const getStatusConfig = (status) => {
        const normalizedStatus = status?.toUpperCase();
        switch (normalizedStatus) {
            case 'DELIVERED':
                return {
                    icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />,
                    text: 'Delivered',
                    color: 'text-green-700',
                    subText: 'Package was handed to resident'
                };
            case 'SHIPPED':
                return {
                    icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6" />,
                    text: 'On the way',
                    color: 'text-blue-700',
                    subText: 'Package is in transit'
                };
            case 'CONFIRMED':
                return {
                    icon: <PackageCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
                    text: 'Order Confirmed',
                    color: 'text-orange-600',
                    subText: 'We have received your order'
                };
            case 'CANCELLED':
                return {
                    icon: <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
                    text: 'Cancelled',
                    color: 'text-red-600',
                    subText: 'Order cancelled'
                };
            default:
                return {
                    icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
                    text: 'Processing',
                    color: 'text-gray-600',
                    subText: 'Preparing for dispatch'
                };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-4 sm:py-8 px-2 sm:px-4 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* --- Page Header & Breadcrumb --- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">
                            <Link to="/shop" className="hover:underline hover:text-orange-600">Shop</Link>
                            <span className="mx-1">›</span>
                            <span>My Orders</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-normal text-gray-800">Your Orders</h2>
                    </div>

                    {/* Search Bar (Visual Only - Amazon Style) */}
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search all orders"
                            className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-sm"
                        />
                        <button className="absolute right-0 top-0 h-full px-3 bg-gray-100 rounded-r-md border-l border-gray-300 hover:bg-gray-200">
                            <Search className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* --- Empty State --- */}
                {orders.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
                        <div className="flex justify-center mb-4">
                            <ShoppingBag className="w-16 h-16 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">You haven't placed any orders yet.</h3>
                        <p className="text-gray-500 mb-6">Check out our store to find something you like!</p>
                        <Link
                            to="/shop"
                            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-8 rounded-md shadow-sm transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* --- Orders List --- */
                    <div className="space-y-6">
                        {orders.map(order => {
                            const statusUI = getStatusConfig(order.orderStatus);

                            return (
                                <div key={order._id} className="border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                                    {/* --- Amazon-like Header --- */}
                                    <div className="bg-gray-100 px-4 sm:px-6 py-3 border-b border-gray-200 text-sm text-gray-600">
                                        <div className="flex flex-col sm:flex-row justify-between gap-y-3">

                                            <div className="flex gap-8 sm:gap-12">
                                                {/* Date */}
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] uppercase font-bold text-gray-500">Order Placed</span>
                                                    <span className="text-gray-700">{formatDate(order.createdAt)}</span>
                                                </div>

                                                {/* Total */}
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] uppercase font-bold text-gray-500">Total</span>
                                                    <span className="text-gray-700">₹{Math.floor(order.priceDetails?.total || 0)}</span>
                                                </div>

                                                {/* Ship To (Hidden on very small mobile) */}
                                                <div className="hidden sm:flex flex-col">
                                                    <span className="text-[11px] uppercase font-bold text-gray-500">Ship To</span>
                                                    <span className="text-blue-600 hover:underline cursor-pointer">
                                                        {order.shippingAddress?.fullName || "Guest"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Order ID & Link */}
                                            <div className="flex flex-col sm:items-end">
                                                <span className="text-[11px] uppercase font-bold text-gray-500">Order # {order.orderId}</span>
                                                <div className="flex gap-2 sm:mt-1">
                                                    {/* Simple link back to shop if they want to browse details */}
                                                    <Link to="/shop" className="text-blue-600 hover:text-orange-700 hover:underline text-xs sm:text-sm">
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Body --- */}
                                    <div className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">

                                            {/* Left: Status & Content */}
                                            <div className="flex-1">
                                                <h3 className={`font-bold text-lg mb-1 flex items-center gap-2 ${statusUI.color}`}>
                                                    {statusUI.text}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-4">{statusUI.subText}</p>

                                                {/* Products Grid */}
                                                <div className="flex flex-wrap gap-4 mt-3">
                                                    {order.items.map((item) => (
                                                        <Link to={`/product/${item.productId}`} key={item._id} className="group">
                                                            <div className="relative">
                                                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 border border-gray-200 rounded p-1 flex items-center justify-center">
                                                                    <img
                                                                        src={item.image}
                                                                        alt="Product"
                                                                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                                                                    />
                                                                </div>
                                                                {item.quantity > 1 && (
                                                                    <span className="absolute -bottom-2 -right-2 bg-gray-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                                                        {item.quantity}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Actions (Desktop) / Bottom (Mobile) */}
                                            <div className="flex sm:flex-col gap-3 mt-2 sm:mt-0 sm:w-48">
                                                <Link
                                                    to="/shop"
                                                    className="flex-1 text-center bg-yellow-400 hover:bg-yellow-500 text-sm text-gray-900 border border-yellow-500 rounded-md py-1.5 px-4 shadow-sm font-medium transition-colors"
                                                >
                                                    Buy it again
                                                </Link>
                                                <Link
                                                    to="/shop"
                                                    className="flex-1 text-center bg-white hover:bg-gray-50 text-sm text-gray-800 border border-gray-300 rounded-md py-1.5 px-4 shadow-sm font-medium transition-colors"
                                                >
                                                    View your item
                                                </Link>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;