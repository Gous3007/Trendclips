import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Truck, AlertOctagon, XCircle, ArrowRight } from 'lucide-react';
import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

const AddTocart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
   
    // 🛠️ SETTINGS
    const FREE_DELIVERY_LIMIT = 2000;
    const DELIVERY_CHARGE = 1;

    // 🧮 CALCULATIONS
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalMRP = cartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
    const totalSavings = totalMRP - subtotal;

    const isFreeDelivery = subtotal >= FREE_DELIVERY_LIMIT;
    const deliveryFee = isFreeDelivery ? 0 : DELIVERY_CHARGE;
    const finalTotal = subtotal + deliveryFee;
    const amountNeededForFree = FREE_DELIVERY_LIMIT - subtotal;

    // 🛡️ GLOBAL VALIDATION: Check if ANY item exceeds its specific STOCK
    // Note: Ensure your cartItem object has a 'stock' property from the backend
    const hasStockError = cartItems.some(item => item.quantity > item.stock);

    return (
        <div className="min-h-screen bg-gray-50 pb-40 lg:pb-12 font-sans text-gray-800">

            {/* 🚚 1. TOP FREE DELIVERY NOTIFICATION (Fixed Logic) */}
            <div className={`px-4 py-3 text-sm font-medium text-center shadow-sm sticky top-0 z-30 transition-colors
                ${isFreeDelivery ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
                    <Truck size={18} className={isFreeDelivery ? "" : "animate-pulse"} />
                    {isFreeDelivery ? (
                        <span>🎉 Congratulations! No delivery fees applied.</span>
                    ) : (
                        <span>
                            Shop for <strong>₹{Math.ceil(amountNeededForFree)}</strong> more to get <span className="underline decoration-yellow-400 decoration-2">Free Delivery</span>
                        </span>
                    )}
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="max-w-6xl mx-auto px-4 py-6 lg:grid lg:grid-cols-12 lg:gap-8">

                {/* LEFT: CART ITEMS */}
                <div className="lg:col-span-8 space-y-4">

                    <div className="flex items-center justify-between pb-2 border-b lg:border-none">
                        <h1 className="text-xl font-bold text-gray-900">Shopping Cart ({cartItems.length})</h1>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map(item => {
                            // 🔥 LOGIC: Check User Quantity vs Available Stock
                            // Suppose item.stock comes from backend (e.g., 4)
                            const isOutOfStock = item.quantity > item.stock;

                            return (
                                <div key={item.id}
                                    className={`bg-white rounded-xl p-4 flex gap-4 border transition-all relative overflow-hidden
                                     ${isOutOfStock ? 'border-red-500 bg-red-50' : 'border-gray-200 shadow-sm'}`}>

                                    {/* 🖼️ IMAGE SECTION WITH OVERLAY */}
                                    <div className="relative w-28 h-28 shrink-0 bg-white rounded-lg p-2 border border-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />

                                        {/* ⚠️ OUT OF STOCK OVERLAY */}
                                        {isOutOfStock && (
                                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg backdrop-blur-[1px] z-10">
                                                <XCircle className="text-red-500 mb-1" size={28} />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wider text-center px-1">
                                                    Out of Stock
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* DETAILS SECTION */}
                                    <div className="flex-1 flex flex-col justify-between z-10">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-sm lg:text-base font-medium text-gray-900 line-clamp-2 leading-relaxed hover:text-orange-600 cursor-pointer">
                                                    {item.name}
                                                </h3>
                                                <p className="font-bold text-lg text-green-600 ml-2 whitespace-nowrap">
                                                    ₹{Math.floor(item.price)}
                                                </p>
                                            </div>

                                            <p className="text-xs text-gray-500 line-through mt-1">M.R.P.: ₹{item.mrp}</p>

                                            {/* STOCK STATUS TEXT */}
                                            {isOutOfStock ? (
                                                <div className="flex items-center gap-1 mt-2 text-red-600 text-xs font-bold animate-pulse">
                                                    <AlertOctagon size={14} />
                                                    <span>Product out of stock! Only {item.stock} left.</span>
                                                </div>
                                            ) : (
                                                <p className="text-xs text-green-600 font-bold mt-1">In Stock</p>
                                            )}
                                        </div>

                                        {/* QUANTITY & REMOVE */}
                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Control */}
                                            <div className={`flex items-center bg-white border rounded-md shadow-sm h-8 
                                                ${isOutOfStock ? 'border-red-300' : 'border-gray-300'}`}>

                                                <button
                                                    onClick={() => updateQuantity(item.id, 'dec')}
                                                    className="px-3 bg-gray-50 hover:bg-gray-100 h-full flex items-center rounded-l-md border-r"
                                                >
                                                    <Minus size={14} className="text-gray-600" />
                                                </button>

                                                <span className={`px-4 font-bold text-sm ${isOutOfStock ? 'text-red-600' : 'text-gray-800'}`}>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => updateQuantity(item.id, 'inc')}
                                                    className="px-3 bg-gray-50 hover:bg-gray-100 h-full flex items-center rounded-r-md border-l"
                                                >
                                                    <Plus size={14} className="text-gray-600" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-sm font-medium text-gray-500 hover:text-red-600 underline decoration-dotted transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={18} className="text-gray-600 hover:text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: ORDER SUMMARY (Sticky Desktop) */}
                <div className="lg:col-span-4 mt-6 lg:mt-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">

                        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

                        <div className="space-y-3 text-sm border-b pb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>₹{Math.floor(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>- ₹{Math.floor(totalSavings)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span className={isFreeDelivery ? "text-green-600 font-bold" : "text-gray-800"}>
                                    {isFreeDelivery ? "FREE" : `₹${DELIVERY_CHARGE}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-4">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-xl font-bold text-gray-900">₹{Math.floor(finalTotal)}</span>
                        </div>

                        {/* DESKTOP CHECKOUT BUTTON */}
                        <button
                            onClick={() =>
                                navigate("/address", {
                                    state: {
                                        cartItems,
                                        subtotal,
                                        deliveryFee,
                                        finalTotal
                                    }
                                   
                                })
                            }
                            disabled={hasStockError || cartItems.length === 0}
                            className={`w-full py-3.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2
                                ${hasStockError
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:shadow-lg'
                                }`}
                        >
                            {hasStockError ? 'Some items are out of stock' : 'Proceed to Checkout'}
                        </button>

                        {hasStockError && (
                            <p className="text-xs text-red-500 text-center mt-2 font-medium">
                                Please remove or reduce out-of-stock items.
                            </p>
                        )}
                    </div>
                </div>

            </div>

            {/* MOBILE BOTTOM BAR (Sticky) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">

                {/* Mobile Stock Error Alert */}
                {hasStockError && (
                    <div className="flex items-center justify-center gap-2 bg-red-100 text-red-700 text-xs py-1.5 px-3 mb-2 rounded font-bold border border-red-200">
                        <AlertOctagon size={14} />
                        Product Out of Stock
                    </div>
                )}

                <div className="flex gap-3 items-center">
                    <div className="flex-1 flex flex-col pl-2">
                        <span className="text-xl font-bold text-gray-900">₹{Math.floor(finalTotal)}</span>
                        <span className="text-xs text-green-600 font-medium">You save ₹{Math.floor(totalSavings)}</span>
                    </div>

                    <button
                        onClick={() =>
                            navigate("/address", {
                                state: {
                                    cartItems,
                                    subtotal,
                                    deliveryFee,
                                    finalTotal
                                }
                            })
                        }
                        disabled={hasStockError || cartItems.length === 0}
                        className={`flex-1 px-4 py-3 rounded-lg font-bold text-sm shadow-sm transition-colors
                             ${hasStockError
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-yellow-400 text-gray-900 active:bg-yellow-500'
                            }`}
                    >
                        {hasStockError ? 'Out of Stock' : 'Checkout'}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AddTocart;