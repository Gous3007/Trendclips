import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, ChevronDown, ChevronUp, MapPin, Check } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import AddAddressModal from "./AddAddressModal";
import api from "../../api/axios";
import { getGuestId } from "../../utils/guest";

const AddressPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [editAddress, setEditAddress] = useState(null);
    // 🛒 Cart Data
    const {
        cartItems = [],
        subtotal: passedSubtotal,
        deliveryFee: passedDeliveryFee,
        finalTotal: passedFinalTotal,
        buyNow = false,
    } = location.state || {};

    console.log("this is address items ", cartItems);
    // 🧮 Common calculation
    const calculatedSubtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const totalMRP = cartItems.reduce(
        (acc, item) => acc + item.mrp * item.quantity,
        0
    );

    const totalSavings = totalMRP - calculatedSubtotal;

    // 🔀 FINAL DECISION
    const subtotal = buyNow ? calculatedSubtotal : passedSubtotal;
    const deliveryFee = buyNow ? 70 : passedDeliveryFee;
    const finalTotal = buyNow
        ? calculatedSubtotal + 70
        : passedFinalTotal;

    // 🏠 Address State
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMobileSummary, setShowMobileSummary] = useState(false);

    useEffect(() => {
        const loadAddresses = async () => {
            const guestId = getGuestId();
            const res = await api.get(`/api/address/${guestId}`);

            setAddresses(res.data.addresses || []);

            if (res.data.addresses?.length > 0) {
                setSelectedAddressId(res.data.addresses[0]._id);
            }
        };
        loadAddresses();
    }, []);

    // ➕ Add Address Logic (Preserved)
    const handleAddNewAddress = async (newAddrData) => {
        const guestId = getGuestId();
        const res = await api.post("/api/address", {
            guestId,
            ...newAddrData
        });
        setAddresses(res.data.addresses);
        setSelectedAddressId(res.data.addresses[0]._id);
    };

    const handleSaveAddress = async (formData) => {
        const guestId = getGuestId();
        let res;

        if (editAddress) {
            // ✏️ EDIT ADDRESS
            res = await api.put(`/api/address/${editAddress._id}`, {
                guestId,
                ...formData,
            });
        } else {
            // ➕ ADD NEW ADDRESS
            res = await api.post("/api/address", {
                guestId,
                ...formData,
            });
        }

        setAddresses(res.data.addresses);

        if (res.data.addresses?.length > 0) {
            setSelectedAddressId(res.data.addresses[0]._id);
        }

        setIsModalOpen(false);
        setEditAddress(null);
    };

    const handleProceed = () => {
        if (!selectedAddressId) {
            alert("Please select an address");
            return;
        }
        const selectedAddr = addresses.find(a => a._id === selectedAddressId);
        navigate("/payment", {
            state: {
                cartItems,
                subtotal,
                deliveryFee,
                finalTotal,
                shippingAddress: selectedAddr,
                buyNow
            }
        });
    };

    // 📦 Reusable Order Summary Component
    const OrderSummaryCard = ({ isMobile }) => (
        <div className={`bg-white rounded-lg border border-gray-300 shadow-sm ${isMobile ? 'mb-4' : 'sticky top-24'}`}>

            {/* Mobile Toggle Header */}
            {isMobile && (
                <div
                    onClick={() => setShowMobileSummary(!showMobileSummary)}
                    className="p-3 flex justify-between items-center cursor-pointer bg-gray-50 border-b border-gray-200"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">Show Order Summary</span>
                        <span className="text-gray-500 text-xs">({cartItems.length} items)</span>
                    </div>
                    {showMobileSummary ? <ChevronUp size={18} className="text-gray-600" /> : <ChevronDown size={18} className="text-gray-600" />}
                </div>
            )}

            {/* Content Body */}
            <div className={`p-5 ${isMobile && !showMobileSummary ? 'hidden' : 'block'}`}>

                {/* 🖼️ IMAGE PREVIEW */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Items in delivery</p>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                        {cartItems.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="shrink-0 w-14 h-14 rounded-md border border-gray-200 p-1 bg-white">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                        {cartItems.length > 4 && (
                            <div className="w-14 h-14 rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                +{cartItems.length - 4}
                            </div>
                        )}
                    </div>
                </div>

                {/* Button (Desktop Only) */}
                {!isMobile && (
                    <button
                        onClick={handleProceed}
                        className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-gray-900 text-sm font-medium py-2 rounded-lg shadow-sm mb-4 transition-colors"
                    >
                        Use this address
                    </button>
                )}

                {/* Price Details */}
                <div className={`${!isMobile ? 'border-t border-gray-200 pt-4' : ''}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-3">Order Summary</h3>

                    <div className="flex justify-between text-sm mb-1 text-gray-600">
                        <span>Items ({cartItems.length}):</span>
                        <span>₹{Math.floor(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1 text-gray-600">
                        <span>Delivery:</span>
                        <span className="text-[#B12704] font-medium">{deliveryFee === 0 ? 'FREE' : `+ ₹${deliveryFee}`}</span>
                    </div>
                    {totalSavings > 0 && (
                        <div className="flex justify-between text-sm text-[#B12704] mb-2">
                            <span>Promotion Applied:</span>
                            <span>- ₹{Math.floor(totalSavings)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-[#B12704] mt-2 border-t border-gray-200 pt-3">
                        <span>Order Total:</span>
                        <span>₹{Math.floor(finalTotal)}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Total Strip */}
            {isMobile && !showMobileSummary && (
                <div className="px-4 py-3 flex justify-between items-center bg-white border-t border-gray-200">
                    <div>
                        <span className="text-gray-800 font-bold text-lg">₹{Math.floor(finalTotal)}</span>
                        <span className="text-xs text-blue-600 block ml-0.5">View details</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#EAEDED] font-sans pb-32 lg:pb-12">

            {/* Header / Checkout Stepper */}
            <div className="bg-[#232f3e] text-white py-3 px-4 shadow-sm sticky top-0 z-20">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-lg font-bold tracking-tight">Checkout</h1>

                    {/* Stepper (Hidden on very small screens) */}
                    <div className="hidden sm:flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Cart</span>
                        <ChevronRight size={14} className="text-gray-500" />
                        <span className="text-white font-bold">Address</span>
                        <ChevronRight size={14} className="text-gray-500" />
                        <span className="text-gray-400">Payment</span>
                    </div>

                    <div className="sm:hidden text-white font-bold text-sm">Review Address</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-6xl mx-auto p-4 lg:grid lg:grid-cols-12 lg:gap-8 mt-2">

                {/* ---------------- LEFT COLUMN (Addresses) ---------------- */}
                <div className="lg:col-span-8">

                    {/* Mobile Order Summary */}
                    <div className="block lg:hidden mb-4">
                        <OrderSummaryCard isMobile={true} />
                    </div>

                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Select a delivery address</h2>

                    {/* ADDRESS LIST */}
                    <div className="space-y-4">
                        {addresses.map((addr) => {
                            const isSelected = selectedAddressId === addr._id;

                            return (
                                <div
                                    key={addr._id}
                                    onClick={() => setSelectedAddressId(addr._id)}
                                    className={`relative p-5 rounded-lg cursor-pointer transition-all flex items-start gap-4
                                        ${isSelected
                                            ? 'bg-[#FDF8E3] border border-orange-500 shadow-sm'
                                            : 'bg-white border border-gray-300 hover:border-gray-400'
                                        }
                                    `}
                                >
                                    {/* Custom Radio Button */}
                                    <div className="pt-1">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                                            ${isSelected ? 'border-orange-600 bg-white' : 'border-gray-400 bg-white'}`}>
                                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-orange-600" />}
                                        </div>
                                    </div>

                                    {/* Address Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{addr.name}</span>
                                                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-600 bg-gray-200 rounded-sm">
                                                    {addr.addressType}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-800 leading-relaxed">
                                            {addr.flat}, {addr.area}
                                        </p>
                                        <p className="text-sm font-bold text-gray-800 uppercase">
                                            {addr.city}, {addr.state} {addr.pincode}
                                        </p>
                                        <p className="text-sm text-gray-800 mt-1">India</p>
                                        <p className="text-sm text-gray-800 mt-1">Phone number: {addr.mobile}</p>

                                        {isSelected && (
                                            <div className="mt-3 flex gap-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditAddress(addr);
                                                        setIsModalOpen(true);
                                                    }}
                                                    className="text-sm text-teal-700 hover:text-orange-700 hover:underline font-medium"
                                                >
                                                    Edit address
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Desktop Edit Link (if not selected) */}
                                    {!isSelected && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditAddress(addr);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-sm text-teal-700 hover:text-orange-700 hover:underline hidden sm:block"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            );
                        })}

                        {/* ADD ADDRESS BUTTON */}
                        <div
                            onClick={() => {
                                if (addresses.length < 3) {
                                    setEditAddress(null);
                                    setIsModalOpen(true);
                                }
                            }}
                            className={`flex items-center gap-3 p-4 rounded-lg border-2 border-dashed cursor-pointer transition-colors
                                ${addresses.length >= 3
                                    ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                                    : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-gray-400'
                                }
                            `}
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Plus size={20} className="text-gray-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    Add a new address
                                </h3>
                                {addresses.length >= 3 && (
                                    <p className="text-xs text-red-600 mt-0.5">Limit reached (Max 3 addresses)</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------- RIGHT COLUMN (Desktop Summary) ---------------- */}
                <div className="hidden lg:block lg:col-span-4">
                    <OrderSummaryCard isMobile={false} />

                    <div className="mt-4 p-4 bg-gray-50 rounded text-xs text-gray-500 leading-snug">
                        By placing your order, you agree to our privacy notice and conditions of use.
                    </div>
                </div>

            </div>

            {/* 📱 MOBILE BOTTOM FIXED BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-3 lg:hidden z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    onClick={handleProceed}
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 font-medium py-3.5 rounded-lg shadow-sm border border-[#FCD200]"
                >
                    Deliver to this address
                </button>
            </div>

            <AddAddressModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditAddress(null);
                }}
                onSave={handleSaveAddress}
                editData={editAddress}
            />
        </div>
    );
};

export default AddressPage;