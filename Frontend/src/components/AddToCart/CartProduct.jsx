import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from "../../context/CartContext.jsx";

const AddTocart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity
    } = useCart();

    const deliveryFee = 5.00;
    const discountAmount = 10.00;

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee - discountAmount;

    return (
        <div className="min-h-screen bg-gray-50 pb-32 lg:pb-12 font-sans">

            {/* Mobile Header */}
            <div className="bg-white sticky top-0 z-10 shadow-sm border-b px-4 py-4 lg:hidden flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-orange-600" />
                    Cart <span className="text-gray-400 text-sm font-normal">({cartItems.length})</span>
                </h1>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">

                {/* Desktop Header */}
                <div className="hidden lg:flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <span className="text-gray-500 text-lg font-medium">{cartItems.length} Items</span>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">

                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">

                                    {/* Product Image - Smaller on mobile */}
                                    <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Content - Side by Side Layout */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
                                                    {item.name}
                                                </h3>
                                                <p className="text-orange-500 font-bold mt-1">₹{item.price.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            {/* Quantity Controls - Compact */}
                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-8 sm:h-10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, 'dec')}
                                                    className="w-8 sm:w-10 h-full flex items-center justify-center text-gray-600 active:bg-gray-200"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 sm:w-10 text-center text-sm font-semibold text-gray-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 'inc')}
                                                    className="w-8 sm:w-10 h-full flex items-center justify-center text-gray-600 active:bg-gray-200"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-12 rounded-xl text-center text-gray-500 shadow-sm">
                                Your cart is empty.
                            </div>
                        )}
                    </div>

                    {/* Desktop Order Summary (Hidden on Mobile) */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg text-green-700">
                                    <span className="text-sm font-medium">Total Savings</span>
                                    <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-gray-200 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">₹{total > 0 ? total.toFixed(2) : '0.00'}</span>
                                </div>
                            </div>
                            <button className="w-full mt-8 bg-orange-500 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all cursor-pointer">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Order Summary (Inline - just the details) */}
                    <div className="lg:hidden mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span>₹{deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount</span>
                                <span>-₹{discountAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* FIXED MOBILE BOTTOM BAR (The Amazon Style Checkout) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Total Price</span>
                        <span className="text-xl font-bold text-gray-900">₹{total > 0 ? total.toFixed(2) : '0.00'}</span>
                    </div>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                        Checkout <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">{cartItems.length}</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default AddTocart;