import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import AddAddressModal from "./AddAddressModal";
import api from "../../api/axios";
import { getGuestId } from "../../utils/guest";

const AddressPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 🛒 Cart Data
    const {
        cartItems = [],
        subtotal: passedSubtotal,
        deliveryFee: passedDeliveryFee,
        finalTotal: passedFinalTotal,
        buyNow = false,
    } = location.state || {};

    // 🧮 Common calculation (cart & buy now dono ke liye)
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

    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMobileSummary, setShowMobileSummary] = useState(false); // Toggle for mobile summary

    // ➕ Add Address Logic
    const handleAddNewAddress = async (newAddrData) => {
        const guestId = getGuestId();

        const res = await api.post("/api/address", {
            guestId,
            ...newAddrData
        });

        setAddresses(res.data.addresses);
        setSelectedAddressId(res.data.addresses[0]._id);
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
                buyNow // 🔥 pass it forward
            }
        });
    };

    // 📦 Reusable Order Summary Component
    const OrderSummaryCard = ({ isMobile }) => (
        <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${isMobile ? 'mb-4' : 'sticky top-20'}`}>

            {/* Mobile Toggle Header */}
            {isMobile && (
                <div
                    onClick={() => setShowMobileSummary(!showMobileSummary)}
                    className="p-4 flex justify-between items-center cursor-pointer bg-gray-50 border-b"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">Order Summary</span>
                        <span className="text-gray-500 text-sm">({cartItems.length} items)</span>
                    </div>
                    {showMobileSummary ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            )}

            {/* Content Body (Hidden on mobile if toggled off, visible on desktop) */}
            <div className={`p-5 ${isMobile && !showMobileSummary ? 'hidden' : 'block'}`}>

                {/* 🖼️ IMAGE PREVIEW (The feature you asked for) */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex -space-x-3">
                        {cartItems.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="relative w-12 h-12 rounded-full border-2 border-white bg-white shadow-sm overflow-hidden z-10 hover:z-20 transition-all">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                        {cartItems.length > 4 && (
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 z-0">
                                +{cartItems.length - 4}
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">Review items</span>
                </div>

                {/* Button (Desktop Only) */}
                {!isMobile && (
                    <button onClick={handleProceed} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 rounded-lg shadow-sm mb-4 border border-yellow-500">
                        Use this address
                    </button>
                )}

                {/* Price Details */}
                <div className={`${!isMobile ? 'border-t pt-4' : ''}`}>
                    {!isMobile && <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>}

                    <div className="flex justify-between text-sm mb-1 text-gray-600">
                        <span>Quentity {cartItems.length} </span>
                        <span>₹{Math.floor(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1 text-gray-600">
                        <span>Delivery:</span>
                        <span className="text-green-600">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                    {totalSavings > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                            <span>Total Discount</span>
                            <span>- ₹{Math.floor(totalSavings)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 border-t pt-2 border-dashed">
                        <span>Order Total:</span>
                        <span>₹{Math.floor(finalTotal)}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Total Strip (Always visible if closed) */}
            {isMobile && !showMobileSummary && (
                <div className="px-4 py-2 flex justify-between items-center bg-white">
                    <span className="text-gray-600 text-sm">Total:</span>
                    <span className="font-bold text-lg">₹{Math.floor(finalTotal)}</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#EAEDED] font-sans pb-32 lg:pb-8">

            {/* Header */}
            <div className="bg-[#232f3e] text-white py-3 px-4 shadow-md sticky top-0 z-20">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-lg lg:text-xl font-bold">Review Address</h1>
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-green-400 font-bold">Cart</span>
                        <ChevronRight size={14} />
                        <span className="text-white font-bold border-b-2 border-orange-400 pb-0.5">Address</span>
                        <ChevronRight size={14} />
                        <span>Payment</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 lg:grid lg:grid-cols-12 lg:gap-6 mt-2">

                {/* ---------------- LEFT COLUMN ---------------- */}
                <div className="lg:col-span-8 space-y-4">

                    {/* 📱 MOBILE ORDER SUMMARY (Visible Here) */}
                    <div className="block lg:hidden">
                        <OrderSummaryCard isMobile={true} />
                    </div>

                    <h2 className="text-lg lg:text-xl font-bold text-orange-700 mb-2">Select a delivery address</h2>

                    {/* ADDRESS LIST */}
                    <div className="space-y-4">
                        {addresses.map((addr) => {
                            const isSelected = selectedAddressId === addr._id;
                            return (
                                <div
                                    key={addr.id}
                                    onClick={() => setSelectedAddressId(addr._id)}
                                    className={`relative bg-white p-4 rounded-lg cursor-pointer border-2 transition-all
                                        ${isSelected ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'}
                                    `}
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className="pt-1">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-orange-500 bg-white' : 'border-gray-400 bg-white'}`}>
                                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{addr.name}</span>
                                                <span className="px-2 py-0.5 bg-gray-100 text-xs font-bold text-gray-600 uppercase border rounded">{addr.type}</span>
                                            </div>
                                            <div className="text-sm text-gray-700 leading-relaxed">
                                                <p>{addr.flat}, {addr.area}</p>
                                                <p className="font-medium uppercase mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                <p className="mt-1">India</p>
                                                <p className="mt-2 text-gray-900 font-medium">Phone: {addr.mobile}</p>
                                            </div>
                                            {isSelected && (
                                                <div className="hidden lg:block mt-4">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleProceed(); }}
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-2 px-6 rounded-md shadow-sm border border-yellow-500"
                                                    >
                                                        Use this address
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* ADD ADDRESS BUTTON */}
                        <div onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
                            <Plus className="text-gray-400" />
                            <span className="text-gray-600 font-bold">Add a new address</span>
                        </div>
                    </div>
                </div>

                {/* ---------------- RIGHT COLUMN (DESKTOP SUMMARY) ---------------- */}
                <div className="hidden lg:block lg:col-span-4">
                    <OrderSummaryCard isMobile={false} />
                </div>

            </div>

            {/* 📱 MOBILE STICKY FOOTER */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 lg:hidden z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    onClick={handleProceed}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-medium py-3 rounded-lg shadow-sm border border-yellow-500"
                >
                    Deliver to this address
                </button>
            </div>

            <AddAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddNewAddress} />
        </div>
    );
};

export default AddressPage;