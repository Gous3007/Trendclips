import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
    Search,
    Filter,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Plus,
    Loader2,
    AlertTriangle, // Delete warning icon
    X,
    CheckCircle // Success icon
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
    const [searchQuery, setSearchQuery] = useState(""); // State for Search
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete Modal States
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Success Message State
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

    // 1. Open Delete Modal
    const confirmDelete = (productId) => {
        setProductToDelete(productId);
        setDeleteModalOpen(true);
    };

    // 2. Execute Delete
    const executeDelete = async () => {
        if (!productToDelete) return;

        try {
            setIsDeleting(true);
            await api.delete(`/api/products/delete/${productToDelete}`);

            // Update UI
            setProducts((prev) => prev.filter((p) => p._id !== productToDelete));

            // Show Success Message
            setShowSuccessToast(true);
            setTimeout(() => setShowSuccessToast(false), 3000); // Hide after 3 sec

        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    // --- HELPER FUNCTIONS ---

    // Truncate Text (For Name & Description)
    const truncateText = (text, limit) => {
        if (!text) return "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    // Format Price (Remove decimals)
    const formatPrice = (price) => {
        return Math.floor(price); // 195.72 -> 195
    };

    // Filtering Logic (Category + Search)
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // --- SKELETON LOADER ---
    const TableSkeleton = () => (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse border-b border-gray-700/50">
                    <td className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-700 rounded-lg"></div><div className="h-4 bg-gray-700 rounded w-32"></div></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-700 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-700 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-700 rounded w-16"></div></td>
                    <td className="p-4"><div className="flex justify-end gap-2"><div className="w-8 h-8 bg-gray-700 rounded-lg"></div><div className="w-8 h-8 bg-gray-700 rounded-lg"></div></div></td>
                </tr>
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
                    <p className="text-gray-400 text-sm mt-1">Dashboard / Products Management</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/20 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg font-medium">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Filters & Search Section */}
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">

                {/* Category Filter */}
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
                        <Filter size={16} className="absolute right-3 top-3 text-gray-500 group-hover:text-blue-400 transition-colors pointer-events-none" />
                    </div>
                </div>

                {/* Search Bar (Updated Logic) */}
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
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

            {/* Products Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900/80 border-b border-gray-700 text-xs uppercase text-gray-400 tracking-wider">
                                <th className="p-5 font-semibold">Product</th>
                                <th className="p-5 font-semibold">Price</th>
                                <th className="p-5 font-semibold">Category</th>
                                <th className="p-5 font-semibold">Stock</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {loading ? (
                                <TableSkeleton />
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-700/30 border-l-2 border-l-transparent hover:border-l-blue-500 transition-all">

                                        {/* Product Name (Truncated) & Image */}
                                        <td className="p-4 flex items-center gap-4 min-w-[200px]">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-700 border border-gray-600 shrink-0">
                                                <img
                                                    src={product.images?.[0]?.url || "/no-image.png"}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white" title={product.title}>
                                                    {truncateText(product.title, 20)}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {truncateText(product.description, 30)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Price (Formatted) */}
                                        <td className="p-4 text-gray-300 font-medium">
                                            ₹{formatPrice(product.finalPrice || product.price)}
                                        </td>

                                        {/* Category Badge */}
                                        <td className="p-4">
                                            <span className="bg-gray-700/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/10">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Stock Status */}
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex w-fit items-center gap-1.5 ${product.quantity > 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.quantity > 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                                                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </td>

                                        {/* Actions (Delete Button Updated) */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                
                                                {/* Delete Button Triggers Modal */}
                                                <button
                                                    onClick={() => confirmDelete(product._id)}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                                        <div className="bg-gray-700/50 p-4 rounded-full mb-3">
                                            <Search size={24} className="text-gray-400" />
                                        </div>
                                        <p className="text-lg font-medium text-gray-300">No products found</p>
                                        <p className="text-sm">Try adjusting your filters or search query.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Visual Only) */}
                <div className="bg-gray-800 border-t border-gray-700/50 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-gray-400">
                        Showing <span className="text-white font-medium">1</span> to <span className="text-white font-medium">{filteredProducts.length}</span> results
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-600/20">1</button>
                        <button className="p-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Products;