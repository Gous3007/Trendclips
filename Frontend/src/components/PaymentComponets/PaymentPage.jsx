import React, { useState } from 'react';
import {
    MapPin, Lock, ShieldCheck, CheckCircle2, ArrowLeft,
    AlertCircle, Truck, Wallet, ChevronRight, Loader2
} from 'lucide-react';
import TrendclipsLogo from '../../../public/Trendclips_Logo-Photoroom.png';
import { load } from "@cashfreepayments/cashfree-js";
import api from "../../api/axios";
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState('gpay');
    const [isLoading, setIsLoading] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const {
        cartItems = [],
        subtotal = 0,
        deliveryFee = 0,
        finalTotal = 0,
        shippingAddress = {}
    } = location.state || {};

    console.log("cart items at payment page:", cartItems);

    // 🧮 CALCULATIONS
    const subtotals = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalMRP = cartItems.reduce((acc, item) => acc + item.mrp * item.quantity, 0);
    const totalSavings = totalMRP - subtotals;

    // Payment Methods Data
    const paymentOptions = [
        {
            id: 'gpay',
            name: 'Google Pay',
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png',
            description: 'Instant payment via UPI',
            recommended: true
        },
        {
            id: 'phonepe',
            name: 'PhonePe',
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1280px-PhonePe_Logo.svg.png',
            description: 'Secure UPI payment',
            recommended: false
        },
        {
            id: 'paytm',
            name: 'Paytm',
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png',
            description: 'Wallet or UPI',
            recommended: false
        },
    ];

    const selectedOptionData = paymentOptions.find(o => o.id === selectedMethod);

    const handlePayment = async () => {
        setIsLoading(true);
        setProcessingMessage('Securely connecting to gateway...');

        try {
            // Simulate a slight delay for better UX (so the loader is visible)
            await new Promise(resolve => setTimeout(resolve, 800));

            const res = await api.post("/api/payment/create", {
                amount: finalTotal,
                selectedMethod,
                shippingAddress,
                cartItems,
                deliveryFee,
                subtotal
            });

            setProcessingMessage('Initializing Payment...');

            const cashfree = await load({
                mode: "sandbox",
                paymentSessionId: res.data.paymentSessionId
            });

            cashfree.checkout({
                paymentSessionId: res.data.paymentSessionId,
                redirectTarget: "_self"
            });

        } catch (err) {
            console.error("Payment Error", err);
            setIsLoading(false);
            alert("Unable to initiate payment. Please try again.");
        }
        // Note: We don't set loading false here immediately if redirecting, 
        // but for SPA behavior, if logic fails, we stop loading.
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans pb-24 md:pb-10 relative">

            {/* 🟢 FULL SCREEN LOADING OVERLAY */}
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <Lock className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                        <p className="text-gray-500 text-sm mb-4">{processingMessage}</p>
                        <div className="flex justify-center gap-2 text-xs text-green-600 font-medium bg-green-50 py-2 rounded-lg">
                            <ShieldCheck className="w-4 h-4" /> 256-bit Secure Encryption
                        </div>
                    </div>
                </div>
            )}

            {/* 🟢 HEADER (Simple Amazon Style) */}
            <header className="bg-white shadow-sm sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="md:hidden p-2 -ml-2 text-gray-600">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <img src={TrendclipsLogo} alt="Logo" className="h-8 object-contain" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                        <Lock className="w-4 h-4 text-green-600" />
                        <span className="hidden sm:inline">100% Secure Checkout</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* 🟢 LEFT COLUMN: Delivery & Payment Options */}
                    <div className="lg:col-span-8 space-y-5">

                        {/* 1. Address Summary (Amazon Style) */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-gray-400">1</span> Delivery Address
                                </h3>
                                <button onClick={() => navigate(-1)} className="text-blue-600 text-sm font-medium hover:underline">Change</button>
                            </div>
                            <div className="p-4 flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900">{shippingAddress.firstName} {shippingAddress.lastName}</p>
                                    <p className="text-sm text-gray-600 mt-0.5">
                                        {shippingAddress.addressLine1}, {shippingAddress.city}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {shippingAddress.state} - <span className="font-bold">{shippingAddress.pincode}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">Mobile: {shippingAddress.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method Selection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                                    <span className="text-blue-600">2</span> Select Payment Method
                                </h3>
                            </div>

                            <div className="p-2 sm:p-4 space-y-3">
                                {paymentOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => setSelectedMethod(option.id)}
                                        className={`
                                            relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group
                                            ${selectedMethod === option.id
                                                ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        {/* Radio Circle */}
                                        <div className={`
                                            w-5 h-5 rounded-full border-2 shrink-0 mr-4 flex items-center justify-center
                                            ${selectedMethod === option.id ? 'border-blue-600' : 'border-gray-300'}
                                        `}>
                                            {selectedMethod === option.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                                        </div>

                                        {/* Logo */}
                                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1 mr-4 shrink-0">
                                            <img src={option.logoSrc} alt={option.name} className="w-full h-full object-contain" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-gray-900">{option.name}</h4>
                                                {option.recommended && (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full uppercase tracking-wide">
                                                        Fastest
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                                        </div>

                                        {/* Checkmark for Visual Confirmation */}
                                        {selectedMethod === option.id && (
                                            <CheckCircle2 className="w-6 h-6 text-blue-600 animate-in fade-in zoom-in duration-200" />
                                        )}
                                    </div>
                                ))}

                                {/* Unavailable Methods (Visual styling like Amazon grayed out) */}
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-2">Unavailable</p>
                                    <div className="flex items-center p-3 rounded-lg border border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed mb-2">
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 mr-4"></div>
                                        <div className="w-12 h-8 bg-gray-200 rounded mr-4"></div>
                                        <span className="text-sm font-medium text-gray-500">Credit / Debit Card</span>
                                    </div>
                                    <div className="flex items-center p-3 rounded-lg border border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed">
                                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 mr-4"></div>
                                        <Wallet className="w-12 h-8 text-gray-300 p-1 mr-4" />
                                        <span className="text-sm font-medium text-gray-500">Cash on Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🟢 RIGHT COLUMN: Order Summary (Desktop Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 lg:sticky lg:top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
                                <div className="flex justify-between">
                                    <span>Items ({cartItems.length})</span>
                                    <span>₹{Math.floor(subtotals)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery</span>
                                    {deliveryFee === 0 ? (
                                        <span className="text-green-600 font-medium">FREE</span>
                                    ) : (
                                        <span>₹{deliveryFee}</span>
                                    )}
                                </div>
                                {totalSavings > 0 && (
                                    <div className="flex justify-between text-green-700 font-medium">
                                        <span>Total Discount</span>
                                        <span>- ₹{totalSavings}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-bold text-gray-900">Order Total</span>
                                <span className="text-2xl font-bold text-gray-900">₹{Math.floor(finalTotal)}</span>
                            </div>

                            {/* Desktop Pay Button */}
                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="hidden lg:block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium text-base py-3.5 rounded-lg shadow-sm border border-[#FCD200] transition-colors"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                                    </span>
                                ) : (
                                    `Pay ₹${Math.floor(finalTotal)}`
                                )}
                            </button>

                            {/* Security Note */}
                            <div className="mt-4 flex gap-3 text-xs text-gray-500 bg-gray-50 p-3 rounded border border-gray-100">
                                <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0" />
                                <p>
                                    Your transaction is secured with 256-bit SSL encryption.
                                    We do not store your payment details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* 🟢 MOBILE STICKY BOTTOM BAR */}
            {/* This mimics the Amazon mobile app experience where the Pay button is always accessible */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] lg:hidden z-40">
                <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
                    <div>
                        <p className="text-xs text-gray-500">Total Payable</p>
                        <p className="text-xl font-bold text-gray-900">₹{finalTotal}</p>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-black font-bold py-3.5 rounded-lg shadow-sm border border-[#FCD200] active:scale-[0.98] transition-transform"
                    >
                        {isLoading ? 'Processing...' : `Pay via ${selectedOptionData?.name}`}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PaymentPage;