import React, { useEffect, useState } from "react";
import { Star, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const RelatedProducts = ({ currentCategory, currentProductId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/api/products/all");
                if (res.data.success) {
                    setProducts(res.data.products);
                }
            } catch (err) {
                console.error("Related products error", err);
            }
        };

        fetchProducts();
    }, []);

    // 🔥 CATEGORY PRIORITY LOGIC
    const sortedProducts = [
        ...products.filter(
            p => p.category === currentCategory && p._id !== currentProductId
        ),
        ...products.filter(
            p => p.category !== currentCategory
        )
    ];
    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">You Might Also Like</h2>
                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {sortedProducts.slice(0, 8).map(product => (
                        console.log("Rendering product:", product) ||
                        <div
                            key={product._id}
                            onClick={() => navigate(`/info/products/${product._id}`)}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                <img
                                    src={product.images?.[0]?.url}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Discount Badge */}
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {product.discount}% OFF
                                </div>

                                {/* Wishlist Button */}
                                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                                    <Heart size={16} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="p-3 sm:p-4">
                                <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                                    {product.title}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded">
                                        <span className="font-semibold">{product.rating}</span>
                                        <Star size={10} className="ml-0.5 fill-white" />
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        ({product.reviews ? product.reviews.toLocaleString() : "No reviews"})
                                    </span>
                                </div>

                                {/* Price */}
                                <span className="text-lg font-semibold text-gray-900">
                                    ₹{Math.floor(product.finalPrice)}
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                    ₹{product.price}
                                </span>

                                {/* Prime Badge */}
                                <div className="mt-2">
                                    <span className="inline-flex items-center text-xs text-teal-700 font-medium">
                                        <svg className="w-12 h-3 mr-1" viewBox="0 0 60 20" fill="currentColor">
                                            <path d="M35.176 17.146c-5.768 4.255-14.134 6.518-21.34 6.518-10.096 0-19.184-3.735-26.063-9.95-.541-.487-.056-1.151.593-.772 7.422 4.32 16.605 6.923 26.087 6.923 6.397 0 13.428-1.327 19.897-4.076.976-.415 1.794.642.826 1.357z" transform="scale(0.7) translate(10, -5)" />
                                            <path d="M37.501 14.46c-.736-.943-4.871-.446-6.727-.224-.564.067-.651-.423-.143-.777 3.294-2.318 8.703-1.649 9.332-.872.63.777-.164 6.162-3.238 8.734-.473.396-.924.185-.714-.339.697-1.744 2.262-5.65 1.49-6.522z" transform="scale(0.7) translate(10, -5)" />
                                        </svg>
                                        prime
                                    </span>
                                </div>

                                {/* Delivery Info */}
                                <p className="text-xs text-gray-600 mt-1">
                                    Get it by <span className="font-semibold text-gray-900">Tomorrow</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
                        View More Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;