import React, { useState, useRef } from 'react';
import { Upload, ChevronDown, X, ChevronLeft, ChevronRight, Maximize2, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

const AddProductPage = () => {
    // --- State Management (LOGIC UNCHANGED) ---
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    // Default placeholder when no images
    const defaultPlaceholder = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [packOf, setPackOf] = useState("");

    const handleSaveProduct = async () => {
        try {
            setLoading(true);
            setSuccessMsg("");

            // Simulate API delay for demonstration (Remove this setTimeout in real usage if your API is fast)
            // await new Promise(resolve => setTimeout(resolve, 3000)); 

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discount", discount);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("packOf", packOf);

            selectedImages.forEach((img) => {
                formData.append("images", img.file);
            });

            const res = await api.post("/api/products/create", formData);
            const data = await res.data;

            if (data.success) {
                setSuccessMsg("Product added successfully!");
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers (LOGIC UNCHANGED) ---

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map(file => ({
                file: file,
                url: URL.createObjectURL(file)
            }));
            setSelectedImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (indexToRemove) => {
        setSelectedImages(prev => {
            const updated = prev.filter((_, i) => i !== indexToRemove);
            URL.revokeObjectURL(prev[indexToRemove].url);
            return updated;
        });
        if (previewIndex >= selectedImages.length - 1) {
            setPreviewIndex(Math.max(0, selectedImages.length - 2));
        }
    };

    const nextSlide = (e) => {
        if (e) e.stopPropagation();
        setPreviewIndex((prev) => (prev + 1) % selectedImages.length);
    };

    const prevSlide = (e) => {
        if (e) e.stopPropagation();
        setPreviewIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
    };

    // --- Custom Styles for Animations ---
    const customStyles = `
        /* Success Checkmark Animations */
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 30px #10B981; } }
        
        .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #10B981; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        .checkmark { width: 56px; height: 56px; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; margin: 10% auto; box-shadow: inset 0px 0px 0px #10B981; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
        .checkmark__check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }

        /* Bouncing Dots Animation */
        @keyframes bounceDelay {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
        }
        .dot-animate {
            animation: bounceDelay 0.6s infinite alternate;
        }
    `;

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans p-4 md:p-8 relative">
            <style>{customStyles}</style>

            {/* --- LOADING OVERLAY (DOT DOT DOT ANIMATION) --- */}
            {loading && !successMsg && (
                <div className="fixed inset-0 z-70 flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-gray-800/80 p-8 rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col items-center">
                        {/* Dot Container */}
                        <div className="flex gap-3 mb-4">
                            <div className="w-4 h-4 bg-indigo-500 rounded-full dot-animate" style={{ animationDelay: '0s' }}></div>
                            <div className="w-4 h-4 bg-indigo-500 rounded-full dot-animate" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-4 h-4 bg-indigo-500 rounded-full dot-animate" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <p className="text-gray-200 font-medium tracking-wide animate-pulse">Saving Product...</p>
                    </div>
                </div>
            )}

            {/* --- SUCCESS MODAL WITH ANIMATION --- */}
            {successMsg && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all scale-100">
                        <div className="mb-4">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                        <p className="text-gray-400 mb-6">{successMsg}</p>
                        <button
                            onClick={() => setSuccessMsg("")}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-emerald-600/20"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* --- FULL SCREEN IMAGE MODAL --- */}
            {isModalOpen && selectedImages.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fadeIn">
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors z-50">
                        <X className="w-6 h-6" />
                    </button>
                    <button onClick={prevSlide} className="absolute left-4 md:left-10 text-white bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-colors z-50">
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <img src={selectedImages[previewIndex].url} alt="Full View" className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl" />
                    <button onClick={nextSlide} className="absolute right-4 md:right-10 text-white bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-colors z-50">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-6 text-gray-400 text-sm bg-gray-900/80 px-4 py-1 rounded-full">
                        {previewIndex + 1} / {selectedImages.length}
                    </div>
                </div>
            )}

            {/* Main Content (No blur class here anymore, blur is handled by the overlay above) */}
            <div className="max-w-7xl mx-auto">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <span>Products</span>
                            <span>/</span>
                            <span className="text-gray-200 font-medium">Add New Product</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Add New Product</h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors border border-gray-700">
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveProduct}
                            disabled={loading}
                            className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2
                                ${loading
                                    ? "bg-indigo-600 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-500 text-white hover:-translate-y-0.5"
                                }
                            `}
                        >
                            Save Product
                        </button>
                    </div>
                </div>

                {/* --- Main Grid Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === Left Column (Forms) === */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Product Info */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">Product Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="e.g. Silk Scrunchie Set" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="6"
                                        placeholder={`Write product description like:
• Premium quality material
• Comfortable for daily use
• Long-lasting & durable

You can also write paragraphs.`}
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                        Pack Of
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={packOf}
                                        onChange={(e) => setPackOf(e.target.value)}
                                        placeholder="e.g. 2, 4, 6"
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />

                                    <p className="text-xs text-gray-400 mt-1">
                                        Enter number of items included in one pack (e.g. Pack of 4)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Media Upload */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-white">Media</h2>
                                <span className="text-gray-400 text-sm bg-gray-900 px-2 py-1 rounded">{selectedImages.length} images</span>
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleImageChange} multiple accept="image/*" className="hidden" />

                            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-gray-600 bg-gray-900/50 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-900 hover:border-indigo-500 transition-all group mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="bg-gray-800 p-3 rounded-full mb-3 group-hover:scale-110 group-hover:bg-indigo-600 transition-all z-10">
                                    <Upload className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                                </div>
                                <p className="text-gray-300 font-medium z-10 group-hover:text-white transition-colors">Click to upload images</p>
                                <p className="text-gray-500 text-sm mt-1 z-10">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>

                            {/* Thumbnails */}
                            {selectedImages.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 animate-fadeIn">
                                    {selectedImages.map((imgData, index) => (
                                        <div
                                            key={index}
                                            className={`relative group aspect-square bg-gray-900 rounded-lg overflow-hidden border cursor-pointer transition-all ${previewIndex === index ? 'border-indigo-500 ring-2 ring-indigo-500/50 scale-105 shadow-lg shadow-indigo-500/20' : 'border-gray-700 hover:border-gray-500'}`}
                                            onClick={() => setPreviewIndex(index)}
                                        >
                                            <img src={imgData.url} alt="Thumbnail" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 hover:scale-110 transition-all">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pricing & Inventory */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
                                <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Price</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-serif">₹</span>
                                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0.00" className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Discount (%)</label>
                                        <input value={discount} onChange={(e) => setDiscount(e.target.value)} type="number" placeholder="0" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl">
                                <h2 className="text-lg font-bold text-white mb-4">Inventory</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                                        <div className="relative">
                                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                                                <option value="" disabled selected>Select Category</option>
                                                <option>Hair Accessories</option>
                                                <option>Neck & Hand Accessories</option>
                                                <option>Home & Kitchen</option>
                                                <option>Stationery</option>
                                                <option>Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Quantity</label>
                                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="0" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === Right Column (Preview Slider) === */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-xl sticky top-8">
                            <h2 className="text-lg font-bold text-white mb-4">Product Preview</h2>

                            {/* Slider Container */}
                            <div className="bg-linear-to-br from-gray-700 to-gray-600 rounded-lg p-6 mb-4 flex items-center justify-center relative min-h-[300px]">

                                {/* Frame */}
                                <div className="bg-white p-2 shadow-2xl w-full aspect-3/4 relative group rounded-sm transform transition-transform hover:scale-[1.02] duration-300">

                                    {/* Main Image */}
                                    <div
                                        className="w-full h-full relative overflow-hidden cursor-zoom-in bg-gray-100"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <img
                                            src={selectedImages.length > 0 ? selectedImages[previewIndex].url : defaultPlaceholder}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Hover Overlay Hint */}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                            <Maximize2 className="text-white w-8 h-8 drop-shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Slider Arrows */}
                                    {selectedImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevSlide}
                                                className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-gray-900 rounded-full p-2 shadow-xl hover:bg-gray-100 hover:scale-110 transition-all z-20 opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-gray-900 rounded-full p-2 shadow-xl hover:bg-gray-100 hover:scale-110 transition-all z-20 opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Dots Indicator */}
                                {selectedImages.length > 1 && (
                                    <div className="absolute bottom-3 flex gap-2">
                                        {selectedImages.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === previewIndex ? 'bg-white w-6 shadow-glow' : 'bg-white/40 w-1.5'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                                <h3 className="text-white font-semibold truncate">{title || "Product Title"}</h3>
                                <p className="text-gray-400 text-sm mt-1 truncate">{description || "Product description will appear here..."}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="text-emerald-400 font-bold text-lg">₹{price || "0.00"}</span>
                                    {discount > 0 && (
                                        <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/20">
                                            {discount}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddProductPage;