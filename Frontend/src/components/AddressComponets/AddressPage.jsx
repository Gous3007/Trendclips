import React, { useState } from 'react';
import {
    MapPin,
    Plus,
    Home,
    Briefcase,
    MoreVertical,
    Phone,
    CheckCircle2,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';

const AddressPage = () => {
    const [selectedAddress, setSelectedAddress] = useState(1); // Default selected address ID

    // Mock Address Data
    const addresses = [
        {
            id: 1,
            type: 'Home',
            name: 'Gous Choudhary', // Using context aware name or generic
            phone: '+91 98765 43210',
            addressLine1: 'Flat 402, Krishna Heights',
            addressLine2: 'Near City Mall, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            isDefault: true
        },
        {
            id: 2,
            type: 'Work',
            name: 'Gous Choudhary',
            phone: '+91 98765 43210',
            addressLine1: 'Growfinix Tech Hub, Office 204',
            addressLine2: 'Tech Park, Hinjewadi Phase 1',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411057',
            isDefault: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header / Breadcrumbs */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors md:hidden">
                        <ArrowLeft className="w-5 h-5 mr-2" /> Back
                    </button>

                    <div className="hidden md:flex items-center text-sm font-medium text-gray-500">
                        <span>Cart</span>
                        <span className="mx-3 text-gray-300">/</span>
                        <span className="text-blue-600 font-semibold">Address</span>
                        <span className="mx-3 text-gray-300">/</span>
                        <span>Payment</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Select Delivery Address
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Address List */}
                    <div className="lg:col-span-8 space-y-5 order-2 lg:order-1">

                        {/* Add New Address Button */}
                        <button className="w-full flex items-center justify-between p-5 bg-white border border-blue-200 hover:border-blue-400 rounded-xl shadow-sm text-blue-600 hover:bg-blue-50 transition-all duration-200 group dashed-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-semibold text-gray-900">Add New Address</span>
                                    <span className="text-xs text-gray-500">Deliver to a different location</span>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        </button>

                        <div className="space-y-4">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1">Saved Addresses</h2>

                            {addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    onClick={() => setSelectedAddress(addr.id)}
                                    className={`
                                        relative bg-white p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300
                                        ${selectedAddress === addr.id
                                            ? 'border-blue-600 shadow-md bg-blue-50/20 ring-1 ring-blue-600 ring-opacity-10'
                                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                        }
                                    `}
                                >
                                    {/* Header: Type Badge & Actions */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`
                                            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide
                                            ${addr.type === 'Home' ? 'bg-indigo-100 text-indigo-700' : 'bg-orange-100 text-orange-700'}
                                        `}>
                                            {addr.type === 'Home' ? <Home className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                                            {addr.type}
                                        </div>

                                        {/* Edit/Delete Options (Visual Only) */}
                                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Name & Phone */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                                        <h3 className="text-lg font-bold text-gray-900">{addr.name}</h3>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Phone className="w-3.5 h-3.5 mr-1.5" />
                                            {addr.phone}
                                        </div>
                                    </div>

                                    {/* Address Details */}
                                    <div className="text-gray-600 text-sm leading-relaxed mb-4 pr-8">
                                        <p>{addr.addressLine1}, {addr.addressLine2}</p>
                                        <p className="font-medium text-gray-900 mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                                    </div>

                                    {/* Selection Indicator */}
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        {selectedAddress === addr.id ? (
                                            <span className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                                <CheckCircle2 className="w-5 h-5 fill-blue-100" />
                                                Deliver Here
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm font-medium pl-1">Tap to select</span>
                                        )}

                                        {/* Edit Button */}
                                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:sticky lg:top-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>

                            {/* Mini Cart Preview */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex -space-x-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white" title="Product 1"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white" title="Product 2"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">+2</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="font-bold text-gray-900 block">4 Items</span> in your cart
                                </div>
                            </div>

                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Bag Total</span>
                                    <span>₹1,250.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-dashed border-gray-200">
                                    <span>Total Amount</span>
                                    <span>₹1,250.00</span>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center justify-center gap-2">
                                <span>Continue to Payment</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-xs text-gray-400 text-center mt-4 leading-normal">
                                By continuing, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddressPage;