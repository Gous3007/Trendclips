import React, { useState } from 'react';
import { MapPin, Lock, ShieldCheck, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import TrendclipsLogo from '../../assets/Trendclips_Logo.png';
const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState('gpay');

    // Payment Options Data with Real Logo URLs
    const paymentOptions = [
        {
            id: 'gpay',
            name: 'Google Pay',
            // Using high-quality official brand assets references
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png',
            description: 'Pay instantly using your linked bank account.'
        },
        {
            id: 'phonepe',
            name: 'PhonePe',
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1280px-PhonePe_Logo.svg.png',
            description: 'Faster and secure UPI payments.'
        },
        {
            id: 'paytm',
            name: 'Paytm UPI',
            logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png',
            description: 'Pay directly from your bank account.'
        },
    ];

    const selectedOptionData = paymentOptions.find(o => o.id === selectedMethod);

    return (
        <div className="min-h-screen bg-gray-100/50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header / Breadcrumbs Area */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors md:hidden">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>

                    {/* Desktop Breadcrumbs */}
                    <div className="hidden md:flex items-center text-sm font-medium text-gray-500">
                        <span>Cart</span>
                        <span className="mx-3 text-gray-300">/</span>
                        <span>Address</span>
                        <span className="mx-3 text-gray-300">/</span>
                        <span className="text-blue-600 font-semibold">Payment</span>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Payment Methods (Span 8 columns on desktop) */}
                    <div className="lg:col-span-8 space-y-6 order-2 lg:order-1">

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-5 sm:p-6 border-b border-gray-100 bg-gray-50/80">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
                                    Payment Method
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Select a payment option to complete your order.</p>
                            </div>

                            <div className="p-5 sm:p-6 space-y-4">

                                {/* UPI Section Header */}
                                <div className="flex items-center gap-2 mb-2 px-1">
                                    <span className="bg-green-100 text-green-700 p-1 rounded-full"><ShieldCheck className="w-4 h-4" /></span>
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Recommended: UPI</h3>
                                </div>

                                {paymentOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => setSelectedMethod(option.id)}
                                        // Enhanced hover and selection styling
                                        className={`
                                          relative flex items-center p-4 sm:p-5 cursor-pointer rounded-xl border-2 transition-all duration-300 group
                                          ${selectedMethod === option.id
                                                ? 'border-blue-600 bg-blue-50/30 shadow-md ring-1 ring-blue-600 ring-opacity-50 scale-[1.01]'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm'
                                            }
                                        `}
                                    >
                                        {/* Custom Radio Button */}
                                        <div className={`
                                            w-6 h-6 rounded-full border-2 shrink-0 mr-5 flex items-center justify-center transition-all duration-200
                                            ${selectedMethod === option.id
                                                ? 'border-blue-600 bg-white'
                                                : 'border-gray-300 group-hover:border-blue-400 bg-white'}
                                            `}>
                                            {selectedMethod === option.id && (
                                                <div className="w-3 h-3 rounded-full bg-blue-600" />
                                            )}
                                        </div>

                                        {/* Real Logo Container */}
                                        <div className="w-16 h-16 sm:w-20 sm:h-16 flex items-center justify-center rounded-lg border border-gray-100 bg-white p-2 mr-5 shrink-0 overflow-hidden relative">
                                            {/* Using object-contain to keep logo aspect ratio correct */}
                                            <img
                                                src={option.logoSrc}
                                                alt={option.name + " Logo"}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg text-gray-900 truncate mb-1">{option.name}</h3>
                                            <p className="text-sm text-gray-500 leading-snug hidden sm:block">{option.description}</p>
                                        </div>

                                        {/* Success Checkmark Icon for Selected */}
                                        <div className={`absolute right-5 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${selectedMethod === option.id ? 'opacity-100' : 'opacity-0'}`}>
                                            <CheckCircle2 className="w-7 h-7 text-blue-600 fill-blue-50" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Safe Payment Banner */}
                            <div className="bg-blue-50 p-4 flex items-center justify-center gap-2 text-blue-800 text-sm font-medium border-t border-blue-100">
                                <Lock className="w-4 h-4" />
                                Your payment information is encrypted and secure.
                            </div>
                        </div>

                        {/* Unavailable Options - Simplified design */}
                        <div className="space-y-3 pt-4">
                            <h3 className="text-sm font-semibold text-gray-500 px-1 uppercase tracking-wider">Other Options</h3>
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center justify-between opacity-60 cursor-not-allowed">
                                <div className="flex items-center">
                                    <div className="w-12 h-10 bg-gray-200 rounded mx-4"></div> {/* Placeholder for card icon */}
                                    <span className="text-gray-700 font-medium">Credit / Debit Card</span>
                                </div>
                                <span className="text-xs font-medium bg-gray-200 text-gray-500 px-2.5 py-1 rounded-md">Temporarily Unavailable</span>
                            </div>
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex items-center justify-between opacity-60 cursor-not-allowed">
                                <div className="flex items-center">
                                    <div className="w-12 h-10 bg-gray-200 rounded mx-4 flex items-center justify-center text-gray-400">₹</div>
                                    <span className="text-gray-700 font-medium">Cash on Delivery</span>
                                </div>
                                <span className="text-xs font-medium bg-gray-200 text-gray-500 px-2.5 py-1 rounded-md">Unavailable for this location</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Order Summary (Span 4 columns on desktop) */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        {/* "lg:sticky lg:top-8" makes it sticky only on large screens so it doesn't block mobile view */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:sticky lg:top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Address Preview */}
                            <div className="bg-blue-50/80 p-4 rounded-xl flex items-start gap-3 mb-6">
                                <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Delivering to Home</p>
                                    <p className="font-bold text-sm text-gray-900 leading-tight line-clamp-2">Flat 402, Krishna Heights, Bandra West, Mumbai, 400050</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-4 text-sm border-b border-dashed border-gray-200 pb-6 mb-6 font-medium">
                                <div className="flex justify-between text-gray-600">
                                    <span>Item Total (2 Items)</span>
                                    <span>₹1,250.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600">FREE</span>
                                    {/* <span className="line-through text-gray-400 ml-2">₹50</span> */}
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Total Discount</span>
                                    <span>- ₹50.00</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-gray-500 text-sm">Grand Total</p>
                                    <h3 className="text-3xl font-extrabold text-gray-900">₹1,200</h3>
                                </div>
                                <p className="text-gray-500 text-xs mb-1">Inclusive of all taxes</p>
                            </div>

                            {/* Pay Button - Uses dynamic name based on selection */}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5">
                                <Lock className="w-5 h-5" />
                                <span>Pay via {selectedOptionData?.name}</span>
                            </button>

                            {/* Mobile specific note */}
                            <div className="mt-4 flex items-start gap-2 lg:hidden bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 border border-yellow-100">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <p>Please ensure you have the {selectedOptionData?.name} app installed on this device.</p>
                            </div>

                            <div className="mt-6 text-center border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5 font-medium">
                                    <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Safe & Secure Payments
                                </p>
                                {/* Trust Badges Placeholder */}
                                <div className="flex justify-center gap-2 mt-3  grayscale">
                                    <img src={TrendclipsLogo} alt="stripe" className="h-6 object-contain" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;