import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Search,
    Filter,
    Trash2,
    Plus,
    Loader2,
    AlertTriangle,
    X,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Package
} from "lucide-react";

const Products = () => {
    // 1. Categories List
    const categories = [
        "All",
        "Hair Clips",
        "Scrunchies",
        "Headbands",
        "Barrettes",
        "Home & Kitchen",
        "Stationery"
    ];

    // --- STATES ---
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete Modal States
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/products/all");
            const data = await res.data;
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- HANDLERS ---
    const confirmDelete = (productId) => {
        setProductToDelete(productId);
        setDeleteModalOpen(true);
    };

    const executeDelete = async () => {
        if (!productToDelete) return;

        try {
            setIsDeleting(true);
            await api.delete(`/api/products/delete/${productToDelete}`);
            setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000);
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    // --- HELPER FUNCTIONS ---
    const formatPrice = (price) => Math.floor(price);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.productId && product.productId.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // --- CARD SKELETON LOADER ---
    const CardSkeleton = () => (
        <>
            {[...Array(10)].map((_, index) => (
                <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse flex flex-col">
                    <div className="h-48 bg-gray-700 w-full"></div>
                    <div className="p-4 space-y-3 flex-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        <div className="flex justify-between pt-4 mt-auto">
                            <div className="h-6 bg-gray-700 rounded w-16"></div>
                            <div className="h-6 bg-gray-700 rounded w-8"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-4 md:p-6 font-sans relative">

            {/* --- DELETE CONFIRMATION MODAL --- */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center transform scale-100 transition-all">
                        <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="text-red-500 w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
                        <p className="text-gray-400 mb-6 text-sm">
                            Are you sure you want to delete this product? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- SUCCESS TOAST POPUP --- */}
            {showSuccessToast && (
                <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideUp">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Product deleted successfully!</span>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Products</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your inventory</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg font-medium">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Filters & Search Section */}
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-gray-400 text-sm whitespace-nowrap font-medium">Filter by:</span>
                    <div className="relative w-full md:w-64 group">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 cursor-pointer transition-all"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <Filter size={16} className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                    </div>
                </div>

                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Name or ID..."
                        className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-500"
                    />
                    <Search size={18} className="absolute left-3 top-3 text-gray-500" />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-gray-500 hover:text-white">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* 🔥 PRODUCTS GRID (5 Columns on XL) 🔥 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

                {loading ? (
                    <CardSkeleton />
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all group relative flex flex-col"
                        >
                            {/* Image Section */}
                            <div className="h-48 overflow-hidden relative bg-gray-900">
                                <img
                                    src={product.images?.[0]?.url || "/no-image.png"}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Floating Delete Button (Visible on Hover) */}
                                <button
                                    onClick={() => confirmDelete(product._id)}
                                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                                    title="Delete Product"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* Category Badge Overlay */}
                                <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded">
                                    {product.category}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="p-4 flex flex-col flex-1">
                                {/* Title */}
                                <h3 className="font-semibold text-white truncate text-sm" title={product.title}>
                                    {product.title}
                                </h3>

                                {/* 🔥 Product ID (Small below title) */}
                                <div className="flex items-center gap-1.5 mt-1 mb-3">
                                    <Package size={12} className="text-gray-500" />
                                    <p className="text-xs text-gray-500 font-mono tracking-wide truncate">
                                        ID: {product.productId || product._id || "N/A"}
                                    </p>
                                </div>

                                {/* Price & Stock (Bottom aligned) */}
                                <div className="mt-auto flex items-center justify-between border-t border-gray-700 pt-3">
                                    <span className="text-lg font-bold text-white">
                                        ₹{formatPrice(product.finalPrice || product.price)}
                                    </span>

                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${product.quantity > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${product.quantity > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                                        {product.quantity > 0 ? "In Stock" : "Sold Out"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    /* No Results State */
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                        <div className="bg-gray-800 p-4 rounded-full mb-3 shadow-lg">
                            <Search size={32} className="text-gray-400" />
                        </div>
                        <p className="text-lg font-medium text-gray-300">No products found</p>
                        <p className="text-sm">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            {/* Pagination (Optional - keeping visual layout consistent) */}
            <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                    <button className="p-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-600/20">1</button>
                    <button className="p-2 border border-gray-700 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Products;