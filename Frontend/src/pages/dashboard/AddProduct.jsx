import React, { useState, useRef, useEffect } from 'react';
import { Upload, ChevronDown, X, Image as ImageIcon, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const AddProductPage = () => {
    // --- State Management ---
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0); // For Slider
    const [isModalOpen, setIsModalOpen] = useState(false); // For Full Screen View
    const fileInputRef = useRef(null);

    // Default placeholder when no images
    const defaultPlaceholder = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400";

    // --- Handlers ---

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
        // Adjust preview index if needed
        if (previewIndex >= selectedImages.length - 1) {
            setPreviewIndex(Math.max(0, selectedImages.length - 2));
        }
    };

    // Slider Navigation
    const nextSlide = (e) => {
        e.stopPropagation();
        setPreviewIndex((prev) => (prev + 1) % selectedImages.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setPreviewIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-8">

            {/* --- Full Screen Image Modal --- */}
            {isModalOpen && selectedImages.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fadeIn">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Modal Slider Controls */}
                    <button onClick={prevSlide} className="absolute left-4 md:left-10 text-white bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-colors">
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <img
                        src={selectedImages[previewIndex].url}
                        alt="Full View"
                        className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                    />

                    <button onClick={nextSlide} className="absolute right-4 md:right-10 text-white bg-gray-800/50 p-3 rounded-full hover:bg-gray-700 transition-colors">
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="absolute bottom-6 text-gray-400 text-sm bg-gray-900/80 px-4 py-1 rounded-full">
                        {previewIndex + 1} / {selectedImages.length}
                    </div>
                </div>
            )}


            <div className="max-w-7xl mx-auto">

                {/* --- Header Section (Buttons Moved Here) --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <span>Products</span>
                            <span>/</span>
                            <span className="text-gray-200 font-medium">Add New Product</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Add New Product</h1>
                    </div>

                    {/* Action Buttons (Top Right) */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 font-medium px-6 py-2.5 rounded-lg transition-colors border border-gray-700">
                            Cancel
                        </button>
                        <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-2.5 rounded-lg shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
                            Save Product
                        </button>
                    </div>
                </div>

                {/* --- Main Grid Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === Left Column (Forms) === */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Product Info */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Product Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Title</label>
                                    <input type="text" placeholder="e.g. Silk Scrunchie Set" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Description</label>
                                    <textarea rows="5" placeholder="Describe the product..." className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Media Upload */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-white">Media</h2>
                                <span className="text-gray-400 text-sm">{selectedImages.length} images selected</span>
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleImageChange} multiple accept="image/*" className="hidden" />

                            <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-pink-500/30 bg-pink-500/5 rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-500/10 hover:border-pink-500/50 transition-all group mb-6">
                                <div className="bg-pink-500/20 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-pink-400" />
                                </div>
                                <p className="text-gray-200 font-medium">Click to upload multiple images</p>
                            </div>

                            {/* Thumbnails */}
                            {selectedImages.length > 0 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 animate-fadeIn">
                                    {selectedImages.map((imgData, index) => (
                                        <div
                                            key={index}
                                            className={`relative group aspect-square bg-gray-900 rounded-lg overflow-hidden border cursor-pointer ${previewIndex === index ? 'border-indigo-500 ring-2 ring-indigo-500/50' : 'border-gray-700'}`}
                                            onClick={() => setPreviewIndex(index)}
                                        >
                                            <img src={imgData.url} alt="Thumbnail" className="w-full h-full object-cover" />
                                            <button onClick={(e) => { e.stopPropagation(); removeImage(index); }} className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded opacity-0 group-hover:opacity-100 transition-all">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pricing & Inventory */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                                <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input type="number" placeholder="19.99" className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Discount (%)</label>
                                        <input type="number" placeholder="e.g. 10" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                                <h2 className="text-lg font-bold text-white mb-4">Inventory</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                        <div className="relative">
                                            <select className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                                                <option>Scrunchies</option>
                                                <option>Hair Clips</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                                        <input type="number" placeholder="100" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === Right Column (Preview Slider) === */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg sticky top-8">
                            <h2 className="text-lg font-bold text-white mb-4">Product Preview</h2>

                            {/* Slider Container */}
                            <div className="bg-[#EBC6B0]/90 rounded-lg p-6 mb-4 flex items-center justify-center relative">

                                {/* Frame */}
                                <div className="bg-white p-2 shadow-xl w-4/5 aspect-3/4 relative group">

                                    {/* Main Image */}
                                    <div
                                        className="w-full h-full relative overflow-hidden cursor-zoom-in"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <img
                                            src={selectedImages.length > 0 ? selectedImages[previewIndex].url : defaultPlaceholder}
                                            alt="Preview"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Hover Overlay Hint */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Maximize2 className="text-white w-6 h-6 drop-shadow-md" />
                                        </div>
                                    </div>

                                    {/* Slider Arrows (Only show if multiple images) */}
                                    {selectedImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevSlide}
                                                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all z-10"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={nextSlide}
                                                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all z-10"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Dots Indicator */}
                                {selectedImages.length > 1 && (
                                    <div className="absolute bottom-2 flex gap-1.5">
                                        {selectedImages.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === previewIndex ? 'bg-gray-800 w-3' : 'bg-gray-800/40'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-1 text-center sm:text-left">
                                <h3 className="text-lg font-bold text-white">Silk Scrunchie Set</h3>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <span className="text-xl font-bold text-blue-400">$17.99</span>
                                    <span className="text-sm text-gray-500 line-through">$19.99</span>
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