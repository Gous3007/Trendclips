import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { flyToCart } from "../../utils/flyToCart.js";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

const categories = [
    { id: 1, name: "Hair Clips", image: "https://m.media-amazon.com/images/I/61L9MRQdoGL._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 2, name: "Scrunchies", image: "https://m.media-amazon.com/images/I/81yyuU2jddL._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 3, name: "Headbands", image: "https://m.media-amazon.com/images/I/51rbbgUbx0L._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 4, name: "Barrettes", image: "https://m.media-amazon.com/images/I/71+Oqacy34L._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 5, name: "Home & Kitchen", image: "https://m.media-amazon.com/images/I/51yc7Nsy73L._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 6, name: "Stationery", image: "https://m.media-amazon.com/images/I/8115Djt33ML._AC_UL480_FMwebp_QL65_.jpg" },
];

// --- SKELETON LOADER COMPONENT ---
const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
            {/* Image Placeholder */}
            <div className="h-44 sm:h-52 bg-gray-200 rounded-xl mb-3 w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Title Placeholder (2 lines) */}
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

            {/* Category Placeholder */}
            <div className="h-3 bg-gray-100 rounded w-1/3 mb-4"></div>

            {/* Price & Button Placeholder */}
            <div className="flex items-center justify-between mt-auto">
                <div className="space-y-1">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-100 rounded w-10"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    );
};

const ProductCollection = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();



    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [products, setProducts] = useState([]);

    // Loading states
    const [loadingHome, setLoadingHome] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);

    // --- Fetch Showcase (Featured/Popular) ---
    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const res = await api.get("/api/showcase/homepage");
                setFeaturedProducts(res.data.featured);
                setPopularProducts(res.data.popular);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingHome(false);
            }
        };
        fetchHomeProducts();
    }, []);

    // --- Fetch All Products (Top Picks) with Sort & Limit ---
    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            const startTime = Date.now(); // Start timer

            try {
                const res = await api.get("/api/products/all");
                const data = await res.data;

                // Sort by Newest First (Assuming '_id' is roughly chronological or use 'createdAt')
                const sortedProducts = data.products.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                setProducts(sortedProducts);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                // Calculate how much time passed
                const elapsedTime = Date.now() - startTime;
                const minDelay = 1000; // 1 second minimum

                // If fetch was too fast, wait the remaining time
                if (elapsedTime < minDelay) {
                    setTimeout(() => {
                        setLoadingProducts(false);
                    }, minDelay - elapsedTime);
                } else {
                    setLoadingProducts(false);
                }
            }
        };

        fetchProducts();
    }, []);

    // --- Slider Logic ---
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [topPicksIndex, setTopPicksIndex] = useState(0);
    const [popIndex, setPopIndex] = useState(0);

    // Limit Top Picks to 8 items
    const limitedTopPicks = products.slice(0, 8);

    const nextFeatured = () => {
        if (!featuredProducts.length) return;
        setFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
    };
    const prevFeatured = () => {
        setFeaturedIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };


    const nextPopular = () => {
        if (!popularProducts.length) return;
        setPopIndex((prev) => (prev + 1) % popularProducts.length);
    };
    const prevPopular = () => {
        if (!popularProducts.length) return;
        setPopIndex((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

                {/* HEADER */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600 mb-3 tracking-tight">
                        Glamour Hair Accessories
                    </h1>
                    <p className="text-gray-600 text-base sm:text-lg">Elevate your style with our premium collection</p>
                </div>

                {/* CATEGORY SECTION */}
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-600">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => navigate(`/shop/${cat.name}`)}
                                className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group text-center transform hover:-translate-y-2"
                            >
                                <div className="w-full h-32 sm:h-36 overflow-hidden rounded-2xl mb-4 bg-linear-to-br from-purple-100 via-pink-100 to-blue-100">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 text-base sm:text-lg">
                                    {cat.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FEATURED COLLECTION SLIDER */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">Featured Collection</h2>
                            <p className="text-sm sm:text-base text-gray-500">Premium picks just for you ⭐</p>
                        </div>
                        <div className="hidden sm:flex gap-3">
                            <button onClick={prevFeatured} className="bg-pink-400 p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                                <ChevronLeft size={22} className="text-white" />
                            </button>
                            <button onClick={nextFeatured} className="bg-pink-400 p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                                <ChevronRight size={22} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Featured Loader or Content */}
                    {loadingHome ? (
                        <div className="h-96 w-full bg-gray-200 rounded-3xl animate-pulse"></div>
                    ) : (
                        <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 shadow-2xl">
                            <div
                                className="flex transition-all duration-700 ease-in-out"
                                style={{ transform: `translateX(-${featuredIndex * 100}%)` }}
                            >
                                {featuredProducts.map((item) => (
                                    <div key={item.id} className="min-w-full px-2">
                                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500">
                                            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-linear-to-br from-purple-200 via-pink-200 to-blue-200">
                                                <img
                                                    ref={(el) => (item.imgRef = el)}
                                                    src={item.image.url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-linear-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                                        FEATURED
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 right-4">
                                                    <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all">
                                                        <Heart size={20} className="text-red-500" />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <span className="inline-block bg-purple-500/80 backdrop-blur-sm text-xs px-3 py-1.5 rounded-full mb-2 font-semibold">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="font-bold text-2xl sm:text-3xl mb-2">{item.name}</h3>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={16} className={i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
                                                        ))}
                                                        <span className="text-sm ml-1">({item.rating})</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-linear-to-br from-white to-purple-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-baseline gap-2 mb-1">
                                                            <p className="font-bold text-3xl sm:text-4xl text-gray-600">₹{item.price}</p>
                                                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                -{item.discount}% OFF
                                                            </span>
                                                        </div>
                                                        <p className="text-base line-through text-gray-400">₹{item.oldPrice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Mobile Nav */}
                            <button onClick={prevFeatured} className="absolute top-1/2 left-2 sm:hidden -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg z-10"><ChevronLeft size={20} className="text-purple-600" /></button>
                            <button onClick={nextFeatured} className="absolute top-1/2 right-2 sm:hidden -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg z-10"><ChevronRight size={20} className="text-purple-600" /></button>

                            {/* Dots */}
                            <div className="flex justify-center gap-2 mt-6 pb-2">
                                {featuredProducts.map((_, idx) => (
                                    <button key={idx} onClick={() => setFeaturedIndex(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'bg-linear-to-r from-purple-600 to-pink-600 w-8' : 'bg-gray-300 w-2'}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- TOP PICKS FOR YOU --- */}
                <div className="mb-12 sm:mb-16 px-4 cursor-pointer">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">Top Picks for You</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-1 font-medium">Handpicked styles just for you</p>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {loadingProducts ? (
                            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
                        ) : (
                            limitedTopPicks.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-200 flex flex-col h-full"
                                >
                                    {/* Image Section */}
                                    <div onClick={() => navigate(`/info/products/${item._id}`)} className="relative aspect-4/5 overflow-hidden bg-gray-50">
                                        <img
                                            ref={(el) => (item.imgRef = el)}
                                            src={item.images?.[0]?.url}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Dynamic Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {/* Alternate between Prime and Trending based on index or property */}
                                            {index % 2 === 0 ? (
                                                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                                                    Prime
                                                </span>
                                            ) : (
                                                <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                                                    Trending
                                                </span>
                                            )}
                                            <span className="bg-white/90 backdrop-blur-md text-red-600 text-[10px] font-bold px-2 py-1 rounded-sm border border-red-100">
                                                {item.discount}% OFF
                                            </span>
                                        </div>

                                        {/* Wishlist Button */}
                                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                                            <Heart size={18} fill={index === 1 ? "currentColor" : "none"} />
                                        </button>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-4 flex flex-col grow">
                                        <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-1">
                                            {item.category}
                                        </p>

                                        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 mb-2 leading-tight group-hover:text-orange-700 transition-colors">
                                            {item.title}
                                        </h3>

                                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900 leading-none">
                                                    ₹{Math.floor(item.finalPrice)}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through mt-1">
                                                    ₹{item.price}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    flyToCart(item.imgRef);
                                                    addToCart({
                                                        id: item._id,
                                                        name: item.title,
                                                        price: item.finalPrice,
                                                        image: item.images?.[0]?.url,
                                                        quantity: 1, // ✅ MUST
                                                        mrp: item.price,
                                                        discount: item.discount,
                                                        stock: item.quantity,
                                                        status: item.status
                                                    });
                                                }}
                                                className="bg-orange-600 text-white p-2.5 rounded-xl hover:bg-orange-700 transition-all duration-300 active:scale-90"
                                            >
                                                <ShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* POPULAR THIS WEEK SLIDER */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600">Popular This Week</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-1">Customer favorites</p>
                        </div>
                    </div>
                    {loadingHome ? (
                        <div className="h-80 w-full bg-gray-200 rounded-3xl animate-pulse"></div>
                    ) : (
                        <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-orange-50 via-pink-50 to-purple-50 p-4 sm:p-6 shadow-2xl">
                            <div
                                className="flex transition-all duration-700 ease-in-out"
                                style={{ transform: `translateX(-${popIndex * 100}%)` }}
                            >
                                {popularProducts.map((item) => (
                                    <div key={item.id} className="min-w-full px-2">
                                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500">
                                            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-linear-to-br from-orange-200 via-pink-200 to-purple-200">
                                                <img
                                                    ref={(el) => (item.imgRef = el)}
                                                    src={item.image.url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                                                <span className="absolute top-4 left-4 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                                                    HOT DEAL
                                                </span>
                                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                    <h3 className="font-bold text-2xl sm:text-3xl mb-2">{item.title}</h3>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-linear-to-br from-white to-orange-50">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex items-baseline gap-2 mb-1">
                                                            <p className="font-bold text-3xl sm:text-4xl text-gray-600">₹{item.price}</p>
                                                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                                                -{item.discount}% OFF
                                                            </span>
                                                        </div>
                                                        <p className="text-base line-through text-gray-400">₹{item.oldPrice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={prevPopular} className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"><ChevronLeft size={24} className="text-purple-600" /></button>
                            <button onClick={nextPopular} className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"><ChevronRight size={24} className="text-purple-600" /></button>

                            <div className="flex justify-center gap-2 mt-6 pb-2">
                                {popularProducts.map((_, idx) => (
                                    <button key={idx} onClick={() => setPopIndex(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === popIndex ? 'bg-linear-to-r from-orange-500 to-pink-600 w-8' : 'bg-gray-300 w-2'}`} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProductCollection;