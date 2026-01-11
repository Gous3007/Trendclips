import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import api from '../../api/axios';

import {
    Upload, ChevronDown, ExternalLink, Trash2,
    Save, ArrowLeft, Plus, Image as ImageIcon,
    Search, Loader2, AlertCircle, Package, Tag, Layers,
    CheckCircle, XCircle, X
} from 'lucide-react';

// Define your categories here to ensure they match backend data
const CATEGORIES = [
    "Headbands",
    "Scrunchies",
    "Hair Clips",
    "Barrettes",
    "Home & Kitchen",
    "Stationery",
    "Accessories"
];

const EditProductPage = () => {
    // --- States ---
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [fetchError, setFetchError] = useState(null);

    // --- Notification State ---
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // --- Product Data State ---
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",          // Selling Price (finalPrice)
        comparePrice: "",   // MRP (price)
        sku: "",
        category: "Headbands",
        quantity: 0,
        inStock: true
    });

    const [galleryImages, setGalleryImages] = useState([]);
    const [activeImage, setActiveImage] = useState(null);
    const fileInputRef = useRef(null);
    const [deletedImages, setDeletedImages] = useState([]);

    // --- Notification Helper ---
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        // Auto hide after 4 seconds
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 4000);
    };

    // --- 1. Fetch Data Logic ---
    const handleFetchProduct = async (e) => {
        if (e) e.preventDefault();
        if (!searchId) return;

        try {
            setIsLoading(true);
            setFetchError(null);

            const res = await api.get(`/api/edit/get/${searchId}`);
            const product = res.data.data || res.data;

            // Ensure category exists in our list, otherwise default to first or keep backend value
            const fetchedCategory = product.category || "Headbands";

            setProductData({
                name: product.title || "",
                description: product.description || "",
                price: product.finalPrice || 0,
                comparePrice: product.price || 0,
                category: fetchedCategory, // Set Category correctly
                quantity: product.quantity || 0,
                inStock: product.status === "active",
                sku: product.productId || "",
            });

            const backendImages = Array.isArray(product.images) ? product.images : [];
            const formattedImages = backendImages.map((img, index) => {
                const imageUrl = typeof img === 'string' ? img : img.url;
                return {
                    id: `server-${index}-${Date.now()}`,
                    src: imageUrl,
                    public_id: img.public_id || null
                };
            });

            setGalleryImages(formattedImages);
            setActiveImage(formattedImages.length > 0 ? formattedImages[0].src : null);

            showNotification("Product data loaded successfully", "success");

        } catch (err) {
            console.error("Error fetching product:", err);
            setFetchError("Product not found or Server Error");
            showNotification("Failed to fetch product details", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. Update Logic ---
    const handleUpdateProduct = async () => {
        try {
            setIsSaving(true);

            const price = parseFloat(productData.comparePrice);
            const finalPrice = parseFloat(productData.price);
            const discount = price > 0 ? ((price - finalPrice) / price) * 100 : 0;

            const formData = new FormData();
            deletedImages.forEach(id => {
                formData.append("deletedImages[]", id);
            });
            formData.append("title", productData.name);
            formData.append("description", productData.description);
            formData.append("price", price);
            formData.append("finalPrice", finalPrice);
            formData.append("discount", Math.round(discount));
            formData.append("category", productData.category);
            formData.append("quantity", productData.quantity);
            formData.append("status", productData.inStock ? "active" : "inactive");

            // ✅ ONLY new images upload karo
            galleryImages.forEach(img => {
                if (img.file) {
                    formData.append("images", img.file);
                }
            });

            await api.put(
                `/api/edit/update/${searchId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            showNotification("Product updated successfully!", "success");

        } catch (err) {
            console.error("Update Error:", err);
            showNotification("Failed to update product", "error");
        } finally {
            setIsSaving(false);
        }
    };


    // --- Helpers ---
    const handleInputChange = (field, value) => {
        setProductData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const newImages = files.map(file => ({
            id: Date.now() + Math.random(),
            src: URL.createObjectURL(file), // preview only
            file: file                      // 👈 IMPORTANT
        }));

        setGalleryImages(prev => [...prev, ...newImages]);
    };


    const handleDeleteImage = (id, src, public_id) => {
        setGalleryImages(prev => prev.filter(img => img.id !== id));

        if (public_id) {
            setDeletedImages(prev => [...prev, public_id]);
        }

        if (src === activeImage) {
            setActiveImage(null);
        }
    };

    const discountPercent = productData.comparePrice > 0
        ? Math.round(((productData.comparePrice - productData.price) / productData.comparePrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans p-4 md:p-8 relative">

            {/* --- CUSTOM NOTIFICATION TOAST --- */}
            {notification.show && (
                <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-500 animate-in slide-in-from-top-5 fade-in ${notification.type === 'success'
                    ? 'bg-green-500/10 border-green-500/50 text-green-400'
                    : 'bg-red-500/10 border-red-500/50 text-red-400'
                    }`}>
                    <div className={`mt-0.5 p-1 rounded-full ${notification.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    </div>
                    <div className="flex-1 mr-2">
                        <h4 className="font-bold text-sm text-gray-100">
                            {notification.type === 'success' ? 'Success' : 'Error'}
                        </h4>
                        <p className="text-xs opacity-90">{notification.message}</p>
                    </div>
                    <button
                        onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto">

                {/* --- Header --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 mb-2 cursor-pointer hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back to Products</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Edit Product</h1>
                        <p className="text-gray-500 text-sm mt-1">Update details for ID: <span className="text-indigo-400 font-mono">{searchId || '...'}</span></p>
                    </div>
                </div>

                {/* --- Search Bar --- */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-8 shadow-xl relative overflow-hidden">
                    {isLoading && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/20"><div className="h-full bg-indigo-500 animate-loading-bar"></div></div>}
                    <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                        <div className="grow w-full md:w-auto">
                            <label className="block text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">Find Product</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className={`w-5 h-5 ${isLoading ? 'text-indigo-400' : 'text-gray-500'}`} />
                                </div>
                                <input
                                    type="text"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleFetchProduct(e)}
                                    placeholder="Enter Product ID (e.g., HB0001)"
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-600 font-mono"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleFetchProduct}
                            disabled={isLoading || !searchId}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isLoading || !searchId ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'}`}
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Fetch Details"}
                        </button>
                    </div>
                </div>

                {/* --- Main Grid --- */}
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Basic Info */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Title</label>
                                    <input
                                        type="text"
                                        value={productData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea
                                        rows="8"
                                        value={productData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm leading-relaxed"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* 2. Media */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-indigo-400" /> Media
                            </h2>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" multiple accept="image/*" />

                            {/* Main Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Active Preview</span>
                                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-900 relative flex items-center justify-center">
                                        {activeImage ? (
                                            <img src={activeImage} alt="Active" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="text-gray-600 flex flex-col items-center">
                                                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                                <span className="text-sm">No image selected</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs uppercase text-gray-500 font-bold tracking-wider">Upload New</span>
                                    <div onClick={() => fileInputRef.current.click()} className="aspect-square rounded-xl border-2 border-dashed border-gray-600 bg-gray-900/50 hover:bg-gray-900 hover:border-indigo-500 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4 group">
                                        <div className="bg-gray-800 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform shadow-lg group-hover:bg-indigo-600 group-hover:text-white">
                                            <Upload className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                                        </div>
                                        <p className="text-gray-300 font-medium text-sm">Click to upload</p>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                                {galleryImages.map((img) => (
                                    <div key={img.id} onClick={() => setActiveImage(img.src)} className={`aspect-square rounded-lg border overflow-hidden relative group cursor-pointer transition-all ${activeImage === img.src ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-700'}`}>
                                        <img src={img.src} alt="Gallery" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(img.id, img.src, img.public_id);
                                            }} className="p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md transition-transform hover:scale-110">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => fileInputRef.current.click()} className="aspect-square rounded-lg border border-dashed border-gray-600 bg-gray-900/30 flex items-center justify-center hover:bg-gray-800 hover:text-indigo-400 transition-all text-gray-500">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* 3. Pricing */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-indigo-400" /> Pricing
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Selling Price (Final)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic">₹</span>
                                        <input type="number" value={productData.price} onChange={(e) => handleInputChange('price', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">MRP (Compare At)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic">₹</span>
                                        <input type="number" value={productData.comparePrice} onChange={(e) => handleInputChange('comparePrice', e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-4 text-sm">
                                <div className="bg-gray-900/50 px-3 py-2 rounded border border-gray-700 text-gray-400">
                                    Discount: <span className="text-red-400 font-mono">{discountPercent}% OFF</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* 1. Status */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Availability</h2>
                            <div className="flex items-center justify-between mb-6 p-3 bg-gray-900 rounded-lg border border-gray-700">
                                <span className={`font-medium ${productData.inStock ? 'text-green-400' : 'text-gray-500'}`}>
                                    {productData.inStock ? 'Active' : 'Inactive'}
                                </span>
                                <button onClick={() => handleInputChange('inStock', !productData.inStock)} className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${productData.inStock ? 'bg-green-500' : 'bg-gray-600'}`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${productData.inStock ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        value={productData.quantity}
                                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Organization (FIXED DROPDOWN) */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-indigo-400" /> Organization
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <div className="relative">
                                        <select
                                            value={productData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                        >
                                            {CATEGORIES.map((cat, index) => (
                                                <option key={index} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">SKU / Product ID</label>
                                    <input type="text" disabled value={productData.sku} className="w-full bg-gray-900/50 border border-gray-700 text-gray-500 rounded-lg px-4 py-3 cursor-not-allowed" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Actions */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg sticky top-6">
                            <button
                                onClick={handleUpdateProduct}
                                disabled={isSaving}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 mb-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default EditProductPage;