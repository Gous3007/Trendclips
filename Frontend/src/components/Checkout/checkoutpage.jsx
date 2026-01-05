import React, { useState } from "react";
import { Check, Truck, MapPin, CreditCard, ChevronRight } from "lucide-react";

const CheckoutPage = () => {
    // Mock Data bilkul image jaisa
    const cartItems = [
        {
            id: 1,
            name: "Pastel Pink Scrunchie",
            qty: 2,
            price: 10.0,
            image: "https://images.unsplash.com/photo-1616423668735-a7b218f7823f?auto=format&fit=crop&q=80&w=150&h=150",
        },
        {
            id: 2,
            name: "Mint Green Clip",
            qty: 1,
            price: 8.5,
            image: "https://images.unsplash.com/photo-1627916531872-9118501257df?auto=format&fit=crop&q=80&w=150&h=150",
        },
        {
            id: 3,
            name: "Lavender Headband",
            qty: 1,
            price: 12.0,
            image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=150&h=150",
        },
    ];

    const subtotal = 30.5;
    const shipping = 0.0;
    const discount = 5.0;
    const grandTotal = subtotal + shipping - discount;

    const [formData, setFormData] = useState({
        fullName: "John Doe",
        mobile: "+1 234 567 890",
        pinCode: "123456",
        address: "123 Pastel Lane",
        city: "Springfield",
        state: "Illinois",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb / Progress Steps */}
                <div className="mb-8 flex items-center text-sm font-medium text-gray-500">
                    <span className="flex items-center text-purple-600">
                        <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center mr-2">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        Address
                    </span>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="hover:text-purple-600 cursor-pointer">Delivery</span>
                    <ChevronRight size={16} className="mx-2" />
                    <span>Payment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SECTION: Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Shipping Address Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Shipping Address</h2>
                            <p className="text-gray-500 text-sm mb-6">Please enter your shipping details.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Pin Code</label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Area/Street</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all text-gray-800 bg-gray-50/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Slot Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Choose a Delivery Slot</h2>

                            <div className="relative flex items-center p-4 border-2 border-purple-500 bg-purple-50/30 rounded-xl cursor-pointer">
                                <div className="h-5 w-5 rounded-full border-2 border-purple-600 bg-white flex items-center justify-center mr-4">
                                    <div className="h-2.5 w-2.5 rounded-full bg-purple-600"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900">Standard Delivery</p>
                                    <p className="text-sm text-gray-500">Estimated Delivery: 3-5 Business Days</p>
                                </div>
                                <span className="font-bold text-gray-900">Free</span>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SECTION: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Product List */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                                <p className="text-sm font-bold text-gray-900">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-4"></div>

                            {/* Breakdown */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>Shipping</span>
                                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span className="font-medium">-${discount.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-4"></div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-base font-bold text-gray-900">Grand Total</span>
                                <span className="text-2xl font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
                            </div>

                            {/* Button */}
                            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-200 transition-all active:scale-95">
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;