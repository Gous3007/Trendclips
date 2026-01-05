import React, { useState } from "react";
import {
    Search,
    Filter,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Plus
} from "lucide-react";

const Products = () => {
    // 1. Categories List (User Requested)
    const categories = [
        "All",
        "Hair Clips",
        "Scrunchies",
        "Headbands",
        "Barrettes",
        "Home & Kitchen",
        "Stationery"
    ];

    // 2. Dummy Product Data (Mapping to categories)
    const allProducts = [
        {
            id: 1,
            name: "Velvet Scrunchie",
            price: "$12.00",
            category: "Scrunchies",
            stock: "In Stock",
            image: "https://images.unsplash.com/photo-1626162383827-013149c4d32e?w=100&h=100&fit=crop", // Dummy Image
        },
        {
            id: 2,
            name: "Pearl Hair Clip",
            price: "$8.50",
            category: "Hair Clips",
            stock: "In Stock",
            image: "https://images.unsplash.com/photo-1598300056393-8dd4b6d0c72c?w=100&h=100&fit=crop",
        },
        {
            id: 3,
            name: "Satin Headband",
            price: "$15.00",
            category: "Headbands",
            stock: "Out of Stock",
            image: "https://images.unsplash.com/photo-1605367623136-1e626e9596c5?w=100&h=100&fit=crop",
        },
        {
            id: 4,
            name: "Tortoiseshell Barrette",
            price: "$10.00",
            category: "Barrettes",
            stock: "In Stock",
            image: "https://images.unsplash.com/photo-1616423664074-907f885304e2?w=100&h=100&fit=crop",
        },
        {
            id: 5,
            name: "Ceramic Mug Set",
            price: "$25.00",
            category: "Home & Kitchen",
            stock: "In Stock",
            image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop",
        },
        {
            id: 6,
            name: "Premium Notebook",
            price: "$7.50",
            category: "Stationery",
            stock: "Out of Stock",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&h=100&fit=crop",
        },
        {
            id: 7,
            name: "Glitter Bobby Pins",
            price: "$5.00",
            category: "Hair Clips",
            stock: "In Stock",
            image: "https://images.unsplash.com/photo-1571216952774-7299a9101b63?w=100&h=100&fit=crop",
        }
    ];

    // State for Filter
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filtering Logic
    const filteredProducts = selectedCategory === "All"
        ? allProducts
        : allProducts.filter(product => product.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Products</h1>
                    <p className="text-gray-400 text-sm">Dashboard / Products</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Filters & Search Section */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Category Filter Dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-gray-400 text-sm whitespace-nowrap">Filter by:</span>
                    <div className="relative w-full md:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <Filter size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900/50 border-b border-gray-700 text-xs uppercase text-gray-400">
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Stock</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-700/50 transition-colors">
                                        {/* Product Name & Image */}
                                        <td className="p-4 flex items-center gap-3 min-w-[200px]">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover bg-gray-700"
                                            />
                                            <span className="font-medium text-white">{product.name}</span>
                                        </td>

                                        {/* Price */}
                                        <td className="p-4 text-gray-300 font-medium">
                                            {product.price}
                                        </td>

                                        {/* Category Badge */}
                                        <td className="p-4">
                                            <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/20">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Stock Status */}
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium border ${product.stock === "In Stock"
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : "bg-red-500/10 text-red-500 border-red-500/20"
                                                    }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                                                    <Edit size={18} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No products found in this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-gray-800 border-t border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-gray-400">
                        Showing <span className="text-white font-medium">1</span> to <span className="text-white font-medium">{filteredProducts.length}</span> of <span className="text-white font-medium">150</span> results
                    </span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700 disabled:opacity-50">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-sm font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                            ...
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                            15
                        </button>
                        <button className="p-2 border border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Products;