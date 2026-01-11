import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';
import {
    Plus, Trash2, TrendingUp, Zap, X,
    Loader2, AlertTriangle, Image as ImageIcon,
    UploadCloud, CheckCircle2, AlertCircle
} from 'lucide-react';

const ShowcaseManager = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // --- Notification State ---
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    // --- Delete Confirmation State ---
    const [deleteId, setDeleteId] = useState(null);

    // --- Data States ---
    const [featuredData, setFeaturedData] = useState([]);
    const [popularData, setPopularData] = useState([]);

    // --- Form States ---
    const [formData, setFormData] = useState({
        name: "", category: "", price: "", oldPrice: "", rating: "4.5"
    });

    // File Upload States
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    // --- Fetch Data ---
    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            const res = await api.get(`/api/showcase?type=${activeTab}`);
            const data = await res.data;
            if (activeTab === "featured") setFeaturedData(data.data || []);
            else setPopularData(data.data || []);
        } catch (error) {
            showNotification("Failed to fetch data", "error");
        }
    };

    // --- Helpers ---
    const currentList = activeTab === 'featured' ? featuredData : popularData;
    const isLimitReached = currentList.length >= 4;

    const calculateDiscount = () => {
        if (formData.price && formData.oldPrice) {
            return Math.round(((formData.oldPrice - formData.price) / formData.oldPrice) * 100);
        }
        return 0;
    };

    // --- Notification Helper ---
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    // --- Handlers ---
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // --- Delete Logic ---
    const confirmDelete = (id) => {
        setDeleteId(id); // Opens confirmation modal
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/api/showcase/${deleteId}`);
            showNotification("Item removed successfully", "success");
            fetchData();
        } catch (err) {
            showNotification("Failed to delete item", "error");
        } finally {
            setDeleteId(null);
        }
    };

    // --- Submit Logic ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("oldPrice", formData.oldPrice);
        data.append("rating", formData.rating);
        data.append("type", activeTab);
        if (selectedFile) data.append("image", selectedFile);

        setIsLoading(true);

        try {
            const res = await api.post("/api/showcase/add", data);
            if (res.ok) {
                showNotification("Product added successfully!", "success");
                closeModal();
                fetchData();
            } else {
                throw new Error("Failed to add");
            }
        } catch (error) {
            showNotification("Error adding product", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: "", category: "", price: "", oldPrice: "", rating: "4.5" });
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans p-6 md:p-10 relative selection:bg-indigo-500/30">

            {/* --- Toast Notification --- */}
            {notification.show && (
                <div className={`fixed top-6 right-6 z-100 animate-in slide-in-from-top-5 fade-in duration-300 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${notification.type === 'success'
                    ? 'bg-[#0F1815] border-emerald-500/30 text-emerald-400'
                    : 'bg-[#1A1212] border-red-500/30 text-red-400'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    <div>
                        <h4 className="font-bold text-sm">{notification.type === 'success' ? 'Success' : 'Error'}</h4>
                        <p className="text-xs opacity-90">{notification.message}</p>
                    </div>
                    <button onClick={() => setNotification({ ...notification, show: false })} className="ml-4 opacity-50 hover:opacity-100">
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* --- Delete Confirmation Modal --- */}
            {deleteId && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#131926] border border-gray-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
                                <Trash2 size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Confirm Deletion</h3>
                            <p className="text-gray-400 text-sm mb-6">Are you sure you want to remove this item? This action cannot be undone.</p>
                            <div className="flex gap-3 w-full">
                                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">Cancel</button>
                                <button onClick={executeDelete} className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Showcase <span className="text-indigo-500">Manager</span></h1>
                    <p className="text-gray-400 text-sm">Curate your homepage with Featured items and Top Picks.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={isLimitReached}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-xl transform active:scale-95
            ${isLimitReached
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20' // Flat Color
                        }`}
                >
                    {isLimitReached ? <AlertTriangle size={18} /> : <Plus size={20} />}
                    <span>{isLimitReached ? "Limit Reached (4/4)" : "Add Product"}</span>
                </button>
            </div>

            {/* --- Stylish Tabs (Flat Design) --- */}
            <div className="flex p-1 bg-gray-900 rounded-2xl border border-gray-800 w-full md:w-fit mb-8">
                <button
                    onClick={() => setActiveTab('featured')}
                    className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${activeTab === 'featured' ? 'bg-gray-800 text-white shadow-md ring-1 ring-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <Zap size={16} className={activeTab === 'featured' ? 'text-purple-400 fill-purple-400' : ''} />
                    Featured
                    <span className="ml-2 bg-[#0B0F19] px-2 py-0.5 rounded-full text-xs text-gray-400">{featuredData.length}/4</span>
                </button>
                <button
                    onClick={() => setActiveTab('popular')}
                    className={`relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${activeTab === 'popular' ? 'bg-gray-800 text-white shadow-md ring-1 ring-white/10' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <TrendingUp size={16} className={activeTab === 'popular' ? 'text-emerald-400' : ''} />
                    Top Picks
                    <span className="ml-2 bg-[#0B0F19] px-2 py-0.5 rounded-full text-xs text-gray-400">{popularData.length}/4</span>
                </button>
            </div>

            {/* --- Grid Layout --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentList.map((item) => (
                    <div key={item._id} className="group relative bg-[#131926] rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50">

                        {/* Image Area */}
                        <div className="relative h-64 bg-gray-900 overflow-hidden">
                            {/* Use a valid image URL handling here */}
                            <img src={item.image?.url || item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />

                            {/* Solid Dark Overlay for text readability (No Gradient) */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                            {/* Discount Badge (Flat) */}
                            <div className="absolute top-3 left-3 bg-gray-900 border border-gray-700 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                                {item.discount || 0}% OFF
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => confirmDelete(item._id)}
                                className="absolute top-3 right-3 p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 relative">
                            {item.category && <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-1">{item.category}</p>}
                            <h3 className="font-bold text-gray-100 text-lg leading-tight truncate">{item.name}</h3>

                            <div className="flex items-end gap-2 mt-3 border-t border-gray-800 pt-3">
                                <span className="text-xl font-extrabold text-white">₹{item.price}</span>
                                <span className="text-sm text-gray-500 line-through mb-1">₹{item.oldPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {currentList.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-3xl bg-gray-900/20 text-gray-500">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <ImageIcon size={32} className="opacity-40" />
                        </div>
                        <p className="font-medium">No items yet in <span className="capitalize text-gray-300">{activeTab}</span></p>
                        <button onClick={() => setIsModalOpen(true)} className="mt-4 text-indigo-400 text-sm hover:underline">Add your first product</button>
                    </div>
                )}
            </div>

            {/* ================= MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>

                    <div className="relative w-full max-w-2xl bg-[#131926] border border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row">

                        {/* Left Side: Image Upload */}
                        <div className="w-full md:w-2/5 bg-[#0F131D] p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-800 relative group">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {previewUrl ? (
                                <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white font-medium"
                                    >
                                        <ImageIcon size={24} className="mb-2" /> Change Image
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="w-full aspect-3/4 rounded-2xl border-2 border-dashed border-gray-700 hover:border-indigo-500 hover:bg-gray-800 transition-all cursor-pointer flex flex-col items-center justify-center text-center p-4"
                                >
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <UploadCloud size={24} className="text-gray-400 group-hover:text-indigo-400" />
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium">Click to Upload</p>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                                </div>
                            )}
                        </div>

                        {/* Right Side: Form Details */}
                        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Add Product</h2>
                                    <span className={`text-xs px-2 py-0.5 rounded border mt-1 inline-block ${activeTab === 'featured' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                                        Adding to {activeTab === 'featured' ? "Featured" : "Top Picks"}
                                    </span>
                                </div>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">

                                {/* Name */}
                                <div className="group">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Product Name</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="e.g. Silk Bow" className="w-full bg-[#0F131D] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder-gray-600" />
                                </div>

                                {/* Category (Conditional) */}
                                {activeTab === 'featured' && (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Badge / Category</label>
                                        <input name="category" value={formData.category} onChange={handleInputChange} type="text" placeholder="e.g. Premium" className="w-full bg-[#0F131D] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all" />
                                    </div>
                                )}

                                {/* Prices */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Price (₹)</label>
                                        <input required name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="125" className="w-full bg-[#0F131D] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none font-mono" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">MRP (₹)</label>
                                        <input required name="oldPrice" value={formData.oldPrice} onChange={handleInputChange} type="number" placeholder="180" className="w-full bg-[#0F131D] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none font-mono" />
                                    </div>
                                </div>

                                {/* Submit Action */}
                                <div className="pt-4 mt-auto">
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <span className="text-sm text-gray-400">Calculated Discount:</span>
                                        <span className="text-sm font-bold text-green-400 bg-green-900/20 px-2 py-1 rounded-md border border-green-500/20">
                                            {calculateDiscount()}% OFF
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                      ${activeTab === 'featured'
                                                ? 'bg-purple-600 hover:bg-purple-500' // Flat
                                                : 'bg-emerald-600 hover:bg-emerald-500' // Flat
                                            }`}
                                    >
                                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                                        {isLoading ? "Saving..." : "Save Product"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ShowcaseManager;