import React, { useState, useRef, useEffect } from 'react';
import {
    Upload, ChevronDown, ExternalLink, Trash2,
    Save, ArrowLeft, Plus, X, Image as ImageIcon
} from 'lucide-react';

const EditProductPage = () => {
    // --- States ---
    const [inStock, setInStock] = useState(true);

    // File Input Ref
    const fileInputRef = useRef(null);

    // Initial Data
    const [galleryImages, setGalleryImages] = useState([
        { id: 1, src: "https://images.unsplash.com/photo-1605218427368-35b8665b1285?auto=format&fit=crop&w=600" },
        { id: 2, src: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&w=600" },
        { id: 3, src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600" },
    ]);

    // State for the "Current Main Image" being viewed
    const [activeImage, setActiveImage] = useState(galleryImages[0]?.src || null);

    // --- Handlers ---

    // 1. Handle File Upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map(file => ({
                id: Date.now() + Math.random(), // Unique ID
                src: URL.createObjectURL(file), // Create local preview URL
                file: file // Store actual file for backend
            }));

            const updatedGallery = [...galleryImages, ...newImages];
            setGalleryImages(updatedGallery);

            // Automatically show the newly uploaded image as active
            setActiveImage(newImages[0].src);
        }
    };

    // 2. Handle Image Selection (Clicking thumbnail updates main view)
    const handleSelectImage = (src) => {
        setActiveImage(src);
    };

    // 3. Handle Delete Image
    const handleDeleteImage = (id, src) => {
        // Filter out the deleted image
        const updatedGallery = galleryImages.filter(img => img.id !== id);
        setGalleryImages(updatedGallery);

        // Memory Cleanup (Good practice)
        if (src.startsWith('blob:')) {
            URL.revokeObjectURL(src);
        }

        // If we deleted the currently active image, switch to another one
        if (src === activeImage) {
            if (updatedGallery.length > 0) {
                setActiveImage(updatedGallery[0].src);
            } else {
                setActiveImage(null); // No images left
            }
        }
    };

    // Trigger hidden file input
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 md:p-8">

            {/* --- Main Container --- */}
            <div className="max-w-7xl mx-auto">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <button className="hover:text-white transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                            <span className="text-sm font-medium">Back to Products</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Edit Product: Velvet Scrunchie</h1>
                        <p className="text-gray-400 mt-1 text-sm">Manage product details, inventory, and media.</p>
                    </div>

                    <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 transition-all text-sm font-medium">
                        <ExternalLink className="w-4 h-4" /> View Live Page
                    </button>
                </div>

                {/* --- Grid Layout --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === Left Column (Main Content) === */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. General Info */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Velvet Scrunchie"
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea
                                        rows="4"
                                        defaultValue="Soft, luxurious velvet scrunchie available in multiple colors. Perfect for all hair types, providing a strong hold without causing damage."
                                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* 2. Images Section (Functional) */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Images</h2>

                            {/* Hidden Input for Uploads */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />

                            {/* Split View: Current vs New */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                {/* Current Image (Active View) */}
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-400 font-medium">Current Image</span>
                                    <div className="aspect-square rounded-xl overflow-hidden border border-gray-700 bg-gray-900 relative group flex items-center justify-center">
                                        {activeImage ? (
                                            <>
                                                <img
                                                    src={activeImage}
                                                    alt="Current"
                                                    className="w-full h-full object-cover transition-opacity duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                    <span className="text-white text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">Main Preview</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500 flex flex-col items-center">
                                                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                                                <span className="text-sm">No image selected</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload New Image Box */}
                                <div className="space-y-2">
                                    <span className="text-sm text-gray-400 font-medium">New Image</span>
                                    <div
                                        onClick={triggerFileInput}
                                        className="aspect-square rounded-xl border-2 border-dashed border-gray-600 bg-gray-900/50 hover:bg-gray-900 hover:border-indigo-500 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4 group"
                                    >
                                        <div className="bg-gray-800 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                            <Upload className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <p className="text-gray-300 font-medium text-sm">Drop image here, or <span className="text-indigo-400">browse</span></p>
                                        <p className="text-gray-500 text-xs mt-1">1200×1200 recommended</p>
                                    </div>
                                </div>
                            </div>

                            {/* Gallery Grid (Thumbnails) */}
                            <div className="space-y-2">
                                <span className="text-sm text-gray-400 font-medium">Image Gallery ({galleryImages.length})</span>
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">

                                    {/* Mapped Images */}
                                    {galleryImages.map((img) => (
                                        <div
                                            key={img.id}
                                            onClick={() => handleSelectImage(img.src)}
                                            className={`aspect-square rounded-lg border overflow-hidden relative group cursor-pointer transition-all ${activeImage === img.src ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-700 hover:border-gray-500'}`}
                                        >
                                            <img src={img.src} alt="Gallery" className="w-full h-full object-cover" />

                                            {/* Hover Actions (Delete) */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteImage(img.id, img.src); }}
                                                    className="p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md transition-colors shadow-sm"
                                                    title="Delete Image"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add More Button (Small) */}
                                    <div
                                        onClick={triggerFileInput}
                                        className="aspect-square rounded-lg border border-dashed border-gray-600 bg-gray-900/30 flex items-center justify-center cursor-pointer hover:bg-gray-800 hover:border-indigo-500 hover:text-indigo-400 transition-all text-gray-500"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Pricing Section */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Pricing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input type="number" defaultValue="12.00" className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Compare at price</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input type="number" defaultValue="15.00" className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* === Right Column (Sidebar) === */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* 1. Status Card (Toggle) */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Status</h2>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-300 font-medium">In Stock</span>
                                <button
                                    onClick={() => setInStock(!inStock)}
                                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${inStock ? 'bg-indigo-600' : 'bg-gray-600'}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${inStock ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        </div>

                        {/* 2. Organization Card */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4">Organization</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <div className="relative">
                                        <select className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                                            <option>Scrunchies</option>
                                            <option>Accessories</option>
                                            <option>Hair Care</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                                    <input type="text" defaultValue="velvet, luxury, soft" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">SKU</label>
                                    <input type="text" defaultValue="VS-PNK-001" className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Actions Card */}
                        <div className="space-y-3">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Update Product
                            </button>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg border border-gray-700 transition-colors">
                                Save as Draft
                            </button>
                            <button className="w-full text-red-400 hover:text-red-300 font-medium py-2 text-sm transition-colors flex items-center justify-center gap-2 mt-2">
                                <Trash2 className="w-4 h-4" /> Delete Product
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditProductPage;