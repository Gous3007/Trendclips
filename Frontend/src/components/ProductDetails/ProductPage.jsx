import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { flyToCart } from "../../utils/flyToCart.js";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import {
    Star, Zap, PackageCheck, ShieldCheck, RotateCcw,
    ChevronRight, Minus, Plus, Heart, Share2,
    ChevronDown, ChevronUp, Lock
} from "lucide-react";

const ProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [activeMedia, setActiveMedia] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAboutOpen, setIsAboutOpen] = useState(true); // Open by default for better scrolling effect

    // Zoom State
    const [showZoom, setShowZoom] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const getInitialTime = () => {
        return 12 * 60 * 60 + 30 * 60;
    };

    const [timeLeft, setTimeLeft] = useState(getInitialTime());
    const [lowStockTimeLeft, setLowStockTimeLeft] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}h ${mins}m ${secs}s`; // Shortened for mobile
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/api/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Product fetch error", err);
            }
        };

        fetchProduct();
    }, [id]);

    const maxStock = product?.quantity || 0;
    const isOutOfStock = maxStock <= 0;
    const isLowStock = maxStock > 0 && maxStock <= 10;
    const LOW_STOCK_LIMIT = 10;
    const LOW_STOCK_DURATION = 60 * 60; // 1 hour

    useEffect(() => {
        if (!product?._id) return;
        if (maxStock > LOW_STOCK_LIMIT || maxStock <= 0) return;

        const storageKey = `lowStockTimer_${product._id}`;

        const getStartTime = () => {
            const saved = localStorage.getItem(storageKey);
            if (saved) return Number(saved);

            const now = Math.floor(Date.now() / 1000);
            localStorage.setItem(storageKey, now.toString());
            return now;
        };

        let startTime = getStartTime();

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            let elapsed = now - startTime;

            if (elapsed >= LOW_STOCK_DURATION) {
                startTime = now;
                localStorage.setItem(storageKey, startTime.toString());
                elapsed = 0;
            }

            setLowStockTimeLeft(LOW_STOCK_DURATION - elapsed);
        }, 1000);

        return () => clearInterval(interval);
    }, [product?._id, maxStock]);

    const formatSeconds = (seconds) => {
        if (seconds == null) return "00:00:00";
        const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading Product...</p>
                </div>
            </div>
        );
    }

    const productMedia = product.images?.map(img => ({
        type: "image",
        url: img.url
    })) || [];

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    const getDeliveryDate = (days = 5) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.title || "Check this product",
                    text: "Check out this product on our store",
                    url: shareUrl,
                });
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            await navigator.clipboard.writeText(shareUrl);
            alert("Product link copied");
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800 pb-20 lg:pb-10">

            {/* Breadcrumb Navigation */}
            <div className="bg-white py-2 px-4 border-b border-gray-200 text-xs text-gray-500 sticky top-0 z-40 lg:static">
                <div className="max-w-[1500px] mx-auto flex items-center flex-wrap gap-1">
                    <span className="hover:underline cursor-pointer">Home</span>
                    <ChevronRight size={12} />
                    <span className="hover:underline cursor-pointer">{product.category || "Products"}</span>
                    <ChevronRight size={12} />
                    <span className="font-semibold text-gray-700 truncate max-w-[200px]">{product.title}</span>
                </div>
            </div>

            <main className="max-w-[1500px] mx-auto px-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">

                    {/* ---------------- LEFT COLUMN: IMAGES (Sticky) ---------------- */}
                    {/* Added h-fit and sticky classes here */}
                    <div className="lg:col-span-5 flex flex-col-reverse lg:flex-row gap-4 h-fit lg:sticky lg:top-24 z-10">
                        {/* Thumbnails */}
                        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] no-scrollbar py-2 lg:py-0 px-1">
                            {productMedia.map((media, idx) => (
                                <button
                                    key={idx}
                                    onMouseEnter={() => setActiveMedia(idx)}
                                    onClick={() => setActiveMedia(idx)}
                                    className={`relative w-16 h-16 lg:w-14 lg:h-14 shrink-0 border rounded-md overflow-hidden bg-white shadow-sm transition-all
                                    ${activeMedia === idx ? "border-orange-500 ring-2 ring-orange-200 ring-offset-1" : "border-gray-300 hover:border-orange-400"}
                                    `}
                                >
                                    <img ref={(el) => (product.imgRef = el)} src={media.url} className="w-full h-full object-contain p-1" alt="" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image Stage */}
                        <div className="flex-1 relative group">
                            <div
                                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center h-[350px] lg:h-[550px] relative overflow-hidden cursor-crosshair"
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => setShowZoom(true)}
                                onMouseLeave={() => setShowZoom(false)}
                            >
                                {productMedia[activeMedia] && (
                                    <img
                                        src={productMedia[activeMedia].url}
                                        alt={product.title}
                                        className="max-w-full max-h-full object-contain transition-opacity duration-300"
                                    />
                                )}
                                {/* Share & Wishlist Icons */}
                                <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
                                    <button
                                        className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors border border-gray-100"
                                    >
                                        <Heart size={20} />
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-blue-500 transition-colors border border-gray-100"
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                            {/* ZOOM RESULT */}
                            {showZoom && (
                                <div
                                    className="hidden lg:block absolute left-[105%] top-0 w-[500px] h-[550px] bg-white border border-gray-300 shadow-2xl z-50 rounded-md overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${productMedia[activeMedia]?.url})`,
                                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                        backgroundSize: "250%"
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>

                    {/* ---------------- MIDDLE COLUMN: DETAILS (Scrolls) ---------------- */}
                    <div className="lg:col-span-4 flex flex-col gap-4 min-h-[800px]">
                        <div>
                            <button onClick={() => navigate(`/shop/${product.category}`)} className="text-sm text-[#007185] hover:underline hover:text-[#c7511f] font-medium cursor-pointer">
                                Visit the {product.category || "Trendclips Store"} Store
                            </button>
                            <h1 className="text-xl lg:text-3xl font-medium text-gray-900 leading-snug mt-1">
                                {product.title}
                            </h1>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-sm text-[#007185] hover:underline cursor-pointer">1,240 ratings</span>
                        </div>

                        {/* Price Block */}
                        <div className="space-y-1">
                            {product.packOf > 1 && (
                                <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                                    Pack of {product.packOf}
                                </span>
                            )}
                          
                            
                            {product.discount > 0 && (
                                <div className="text-sm text-red-700 font-medium">
                                    -{product.discount}% <span className="text-gray-500 line-through font-normal ml-1">₹{product.price}</span>
                                </div>
                            )}

                            <div className="flex items-start">
                                <span className="text-sm mt-1 relative top-1">₹</span>
                                <span className="text-3xl font-medium text-gray-900">{Math.floor(product.finalPrice || product.price)}</span>
                                <span className="text-sm mt-1 relative top-1">00</span>
                            </div>
                            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                        </div>

                        {/* Feature Icons */}
                        <div className="flex gap-4 py-4 overflow-x-auto no-scrollbar">
                            {[
                                { icon: <Zap size={20} />, text: "Fast Delivery" },
                                { icon: <Lock size={20} />, text: "Secure Payment" },
                                { icon: <Star size={20} />, text: "Top Quality" },
                                { icon: <PackageCheck size={20} />, text: "Quality Check" }
                            ].map((item, i) => (
                                <div key={i} className="min-w-20 flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#007185]">
                                        {item.icon}
                                    </div>
                                    <span className="text-[11px] text-[#007185] font-medium leading-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-gray-200" />

                        {/* About Section */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-left"
                            >
                                <h3 className="font-bold text-gray-900">About this item</h3>
                                {isAboutOpen ? (
                                    <ChevronUp className="text-gray-500" size={20} />
                                ) : (
                                    <ChevronDown className="text-gray-500" size={20} />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${isAboutOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-4 bg-white border-t border-gray-100 text-sm text-gray-700 space-y-2">
                                    <p className="whitespace-pre-line leading-relaxed text-gray-700">
                                        {product.description || "No description available."}
                                    </p>
                                    {/* Adding dummy text to demonstrate scrolling effect if description is short */}
                                    <br />
                                    <p className="text-gray-400 text-xs italic mt-4">
                                        Note: The product images and description are for illustrative purposes. Actual product may vary slightly.
                                        Care instructions: Handle with care, keep away from direct sunlight for long periods.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ---------------- RIGHT COLUMN: BUY BOX (Sticky) ---------------- */}
                    {/* Added h-fit and sticky classes here */}
                    <div className="lg:col-span-3 h-fit lg:sticky lg:top-24">

                        <div className="border border-gray-300 rounded-lg p-4 lg:p-5 bg-white shadow-sm">

                            <div className="text-2xl font-medium text-gray-900 mb-2">
                                ₹{Math.floor(product.finalPrice || product.price)}
                            </div>

                            <div className="text-sm text-[#007185] mb-4">
                                <a href="#" className="hover:underline">Fastest delivery</a>
                                <span className="text-gray-600 ml-1">{getDeliveryDate(5)}</span>
                                <br />

                                {/* 🔥 TIMER LOGIC: 12 Hr timer hides if stock is low (<10) */}
                                {!isLowStock && !isOutOfStock && (
                                    <span className="text-gray-900 font-medium">
                                        Order within{" "}
                                        <span className="text-green-700">{formatTime(timeLeft)}</span>
                                    </span>
                                )}
                            </div>

                            <div
                                className={`text-lg font-medium mb-4 ${isOutOfStock ? "text-red-600" : "text-green-700"
                                    }`}
                            >
                                {isOutOfStock ? "Currently Unavailable" : "In Stock"}
                            </div>

                            {isOutOfStock && (
                                <p className="text-xs text-red-500 mt-3 mb-3">
                                    This product is currently unavailable.
                                </p>
                            )}

                            <div className="text-xs text-gray-600 mb-4 space-y-1">
                                <div className="grid grid-cols-2">
                                    <span>Ships from</span>
                                    <span className="text-gray-900 font-medium truncate">TrendClips</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span>Sold by</span>
                                    <span className="text-[#007185] font-medium truncate">TrendClips Retail</span>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600">Qty:</span>
                                <div className="flex items-center border rounded shadow-sm bg-gray-50">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-200 rounded-l">
                                        <Minus size={14} />
                                    </button>
                                    <span className="px-3 py-1 font-medium bg-white text-gray-900 min-w-[30px] text-center">{quantity}</span>

                                    <button
                                        onClick={() => {
                                            if (quantity < maxStock) {
                                                setQuantity(quantity + 1);
                                            }
                                        }}
                                        className={`px-3 py-1 rounded-r ${quantity >= maxStock
                                            ? "cursor-not-allowed text-gray-400"
                                            : "hover:bg-gray-200"
                                            }`}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            {isLowStock && lowStockTimeLeft !== null && (
                                <div className="mt-4 rounded-lg border border-red-300 bg-white p-4 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-red-600">
                                                Limited stock available
                                            </p>
                                            <span className="text-xs text-gray-500">
                                                Time remaining
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-600">
                                                Only {maxStock} units left. Order now.
                                            </p>
                                            <div className="rounded-md bg-red-50 px-3 py-1 text-sm font-mono font-semibold text-red-600 border border-red-200">
                                                {formatSeconds(lowStockTimeLeft)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Desktop Buttons */}
                            <div className="space-y-3 mt-4">
                                <button
                                    disabled={isOutOfStock}
                                    onClick={() => {
                                        if (isOutOfStock) return;
                                        flyToCart(product.imgRef);
                                        addToCart({
                                            id: product._id,
                                            name: product.title,
                                            price: product.finalPrice,
                                            image: product.images?.[0]?.url,
                                            quantity: quantity,
                                            mrp: product.price,
                                            discount: product.discount,
                                            stock: product.quantity,
                                            status: product.status
                                        });
                                    }}
                                    className={`w-full py-2.5 rounded-full text-sm shadow-sm transition-colors font-medium
                                        ${isOutOfStock
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
                                            : "bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-black"
                                        }`}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    disabled={isOutOfStock}
                                    onClick={() => {
                                        if (isOutOfStock) return;
                                        navigate("/address", {
                                            state: {
                                                buyNow: true,
                                                cartItems: [{
                                                    id: product._id,
                                                    name: product.title,
                                                    price: product.finalPrice || product.price,
                                                    image: product.images?.[0]?.url,
                                                    quantity: quantity,
                                                    mrp: product.price,
                                                    discount: product.discount,
                                                    stock: product.quantity,
                                                    status: product.status,
                                                }],
                                            }
                                        });
                                    }}
                                    className={`w-full py-2.5 rounded-full text-sm shadow-sm transition-colors font-medium
                                        ${isOutOfStock
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300"
                                            : "bg-[#FA8900] hover:bg-[#E37B00] border border-[#E37B00] text-white"
                                        }`}
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
                                <Lock size={12} />
                                <span>Secure transaction</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Mobile Sticky Buy Button */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-3 max-w-md mx-auto">
                    <div className="flex-1">
                        <button
                            disabled={isOutOfStock}
                            onClick={() => {
                                flyToCart(product.imgRef);
                                addToCart({
                                    id: product._id,
                                    name: product.title,
                                    price: product.finalPrice,
                                    image: product.images?.[0]?.url,
                                    quantity: quantity,
                                    mrp: product.price,
                                    discount: product.discount,
                                    stock: product.quantity,
                                    status: product.status
                                });
                            }}
                            className={`w-full font-medium py-3 rounded-full text-sm shadow-sm ${isOutOfStock ? "bg-gray-300" : "bg-[#FFD814] text-black"}`}>
                            Add to Cart
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            disabled={isOutOfStock}
                            onClick={() => {
                                navigate("/address", {
                                    state: {
                                        buyNow: true,
                                        cartItems: [{
                                            id: product._id,
                                            name: product.title,
                                            price: product.finalPrice || product.price,
                                            image: product.images?.[0]?.url,
                                            quantity: quantity,
                                            mrp: product.price,
                                            discount: product.discount,
                                            stock: product.quantity,
                                            status: product.status,
                                        }],
                                    }
                                });
                            }}
                            className={`w-full py-3 rounded-full text-sm shadow-sm font-medium ${isOutOfStock ? "bg-gray-300" : "bg-[#FA8900] text-white"}`}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;