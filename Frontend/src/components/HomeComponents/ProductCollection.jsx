import React, { useState } from "react";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";

const categories = [
    { id: 1, name: "Hair Clips", image: "https://m.media-amazon.com/images/I/61L9MRQdoGL._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 2, name: "Scrunchies", image: "https://m.media-amazon.com/images/I/81yyuU2jddL._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 3, name: "Headbands", image: "https://m.media-amazon.com/images/I/51rbbgUbx0L._AC_UL480_FMwebp_QL65_.jpg" },
    { id: 4, name: "Barrettes", image: "https://m.media-amazon.com/images/I/71+Oqacy34L._AC_UL480_FMwebp_QL65_.jpg" },
];

const featuredProducts = [
    {
        id: 1,
        name: "Crystal Hair Claw",
        category: "Premium Collection",
        price: 125.0,
        oldPrice: 180.0,
        discount: 30,
        rating: 4.8,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765705586/bfokxlz19nfaatsedwly.jpg",
    },
    {
        id: 2,
        name: "Silk Scrunchie Set",
        category: "Luxury Edition",
        price: 98.0,
        oldPrice: 140.0,
        discount: 30,
        rating: 4.9,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765705800/a0ivah6izqow9wugfwne.jpg",
    },
    {
        id: 3,
        name: "Velvet Headband",
        category: "Designer Collection",
        price: 145.0,
        oldPrice: 200.0,
        discount: 27,
        rating: 4.7,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765705798/dvcuqnvjfpluklvpxhsu.jpg",
    },
    {
        id: 4,
        name: "Diamond Barrette",
        category: "Bridal Collection",
        price: 199.0,
        oldPrice: 280.0,
        discount: 29,
        rating: 5.0,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765705798/ub2pexykew1rzv9cmkpc.jpg",
    },
];

const products = [
    {
        id: 1,
        name: "Velvet Scrunchie",
        category: "Pastel Pink",
        price: 35.0,
        oldPrice: 50.0,
        discount: 30,
        image: "https://m.media-amazon.com/images/I/71h8B3pK5-L._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
        id: 2,
        name: "Gold Clip Set",
        category: "Minimalist Collection",
        price: 58.0,
        oldPrice: 80.0,
        discount: 27,
        image: "https://m.media-amazon.com/images/I/71roGSJHU3L._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
        id: 3,
        name: "Braided Headband",
        category: "Mint Green",
        price: 82.0,
        oldPrice: 110.0,
        discount: 25,
        image: "https://m.media-amazon.com/images/I/71bIKRCiNiL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
        id: 4,
        name: "Pearl Barrette",
        category: "Elegant Occasion",
        price: 89.0,
        oldPrice: 120.0,
        discount: 34,
        image: "https://m.media-amazon.com/images/I/712L4ghSZSL._AC_UL480_FMwebp_QL65_.jpg",
    },
];

const popular = [
    {
        id: 5,
        name: "Floral Clip",
        price: 45,
        oldPrice: 65,
        discount: 20,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706075/hcsozgz4yohu0chbi76v.jpg"
    },
    {
        id: 6,
        name: "Premium Scrunchie Set",
        price: 55,
        oldPrice: 80,
        discount: 32,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706519/fqn1luspzozjekuccfrl.png"
    },
    {
        id: 7,
        name: "Black Pearl Clip",
        price: 60,
        oldPrice: 90,
        discount: 33,
        image: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706534/lth5cbdumaukwek4e7pp.png"
    },
];

const ProductCollection = () => {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [topPicksIndex, setTopPicksIndex] = useState(0);
    const [popIndex, setPopIndex] = useState(0);

    const nextFeatured = () => {
        setFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevFeatured = () => {
        setFeaturedIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    const nextTopPicks = () => {
        setTopPicksIndex((prev) => (prev + 1) % products.length);
    };

    const prevTopPicks = () => {
        setTopPicksIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const nextPopular = () => {
        setPopIndex((prev) => (prev + 1) % popular.length);
    };

    const prevPopular = () => {
        setPopIndex((prev) => (prev - 1 + popular.length) % popular.length);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">

                {/* HEADER */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600 mb-3">
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
                                className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group text-center transform hover:-translate-y-2"
                            >
                                <div className="w-full h-32 sm:h-36 overflow-hidden rounded-2xl mb-4 bg-linear-to-br from-purple-100 via-pink-100 to-blue-100">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <p className="font-bold text-gray-800 text-base sm:text-lg">{cat.name}</p>
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
                            <button
                                onClick={prevFeatured}
                                className="bg-pink-400 p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                            >
                                <ChevronLeft size={22} className="text-white" />
                            </button>
                            <button
                                onClick={nextFeatured}
                                className="bg-pink-400 p-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                            >
                                <ChevronRight size={22} className="text-white" />
                            </button>
                        </div>
                    </div>
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
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                src={item.image}
                                                alt={item.name}
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
                                                <button className="w-14 h-14 flex items-center justify-center bg-pink-400 text-white rounded-full hover:shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                                                    <ShoppingCart size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevFeatured}
                            className="absolute top-1/2 left-2 sm:hidden -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
                        >
                            <ChevronLeft size={20} className="text-purple-600" />
                        </button>

                        <button
                            onClick={nextFeatured}
                            className="absolute top-1/2 right-2 sm:hidden -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
                        >
                            <ChevronRight size={20} className="text-purple-600" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6 pb-2">
                            {featuredProducts.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setFeaturedIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'bg-linear-to-r from-purple-600 to-pink-600 w-8' : 'bg-gray-300 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* TOP PICKS FOR YOU - GRID WITH NAVIGATION */}
                <div className="mb-12 sm:mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-600">Top Picks for You</h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-1">Trending accessories</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={prevTopPicks}
                                className="bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-purple-100"
                            >
                                <ChevronLeft size={20} className="text-purple-600" />
                            </button>
                            <button
                                onClick={nextTopPicks}
                                className="bg-white p-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border-2 border-purple-100"
                            >
                                <ChevronRight size={20} className="text-purple-600" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-all duration-500"
                            style={{ transform: `translateX(-${topPicksIndex * 100}%)` }}
                        >
                            {products.map((product) => (
                                <div key={product.id} className="min-w-full">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {products.map((item) => (
                                            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1">
                                                <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden mb-3 bg-linear-to-br from-purple-100 to-pink-100">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <span className="absolute top-2 left-2 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                                                        -{item.discount}% OFF
                                                    </span>
                                                    <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all">
                                                        <Heart size={16} className="text-red-500" />
                                                    </button>
                                                </div>

                                                <h3 className="font-bold text-sm sm:text-base mb-1">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mb-3">{item.category}</p>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-bold text-lg text-gray-600">₹{item.price}</p>
                                                        <p className="text-xs line-through text-gray-400">₹{item.oldPrice}</p>
                                                    </div>

                                                    <button className="w-10 h-10 flex items-center justify-center bg-pink-400 text-white rounded-full hover:shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300">
                                                        <ShoppingCart size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    <div className="relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-orange-50 via-pink-50 to-purple-50 p-4 sm:p-6 shadow-2xl">
                        <div
                            className="flex transition-all duration-700 ease-in-out"
                            style={{ transform: `translateX(-${popIndex * 100}%)` }}
                        >
                            {popular.map((item) => (
                                <div key={item.id} className="min-w-full px-2">
                                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500">
                                        <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden bg-linear-to-br from-orange-200 via-pink-200 to-purple-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
                                            <span className="absolute top-4 left-4 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                                                 HOT DEAL
                                            </span>
                                            <div className="absolute top-4 right-4">
                                                <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all">
                                                    <Heart size={20} className="text-red-500" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="font-bold text-2xl sm:text-3xl mb-2">{item.name}</h3>
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
                                                <button className="w-14 h-14 flex items-center justify-center bg-pink-400 text-white rounded-full hover:shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                                                    <ShoppingCart size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={prevPopular}
                            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
                        >
                            <ChevronLeft size={24} className="text-purple-600" />
                        </button>

                        <button
                            onClick={nextPopular}
                            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
                        >
                            <ChevronRight size={24} className="text-purple-600" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-6 pb-2">
                            {popular.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setPopIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === popIndex ? 'bg-linear-to-r from-orange-500 to-pink-600 w-8' : 'bg-gray-300 w-2'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCollection;