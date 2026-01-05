import React, { useState, useEffect, useRef } from "react";
import { Star, MapPin, Quote } from "lucide-react";

const feedbacks = [
    {
        id: 1,
        name: "Priya Sharma",
        location: "Mumbai, Maharashtra",
        rating: 5,
        productName: "Crystal Hair Claw",
        description: "Absolutely love this hair claw! The quality is premium and it holds my thick hair perfectly without slipping.",
        date: "2 days ago"
    },
    {
        id: 2,
        name: "Ananya Patel",
        location: "Delhi, India",
        rating: 5,
        productName: "Silk Scrunchie Set",
        description: "Best scrunchies I've ever bought! The silk material is so gentle on my hair and doesn't cause any breakage.",
        date: "5 days ago"
    },
    {
        id: 3,
        name: "Sneha Reddy",
        location: "Bangalore, Karnataka",
        rating: 4,
        productName: "Velvet Headband",
        description: "Beautiful headband with amazing quality velvet. It's comfortable to wear all day and doesn't give me headaches.",
        date: "1 week ago"
    },
    {
        id: 4,
        name: "Kavya Iyer",
        location: "Chennai, Tamil Nadu",
        rating: 5,
        productName: "Pearl Barrette",
        description: "This pearl barrette is stunning! I wore it to my friend's wedding and everyone asked me where I got it from.",
        date: "2 weeks ago"
    },
    {
        id: 5,
        name: "Isha Gupta",
        location: "Pune, Maharashtra",
        rating: 5,
        productName: "Gold Clip Set",
        description: "Minimalist and chic! These gold clips are perfect for everyday use. They're sturdy and look expensive.",
        date: "3 weeks ago"
    },
    {
        id: 6,
        name: "Riya Mehta",
        location: "Ahmedabad, Gujarat",
        rating: 4,
        productName: "Floral Hair Clip",
        description: "Such a pretty floral design! The colors are exactly as shown in the pictures. Great quality for the price.",
        date: "1 month ago"
    },
    {
        id: 7,
        name: "Meera Singh",
        location: "Jaipur, Rajasthan",
        rating: 5,
        productName: "Butterfly Clip",
        description: "Love the butterfly design! Very trendy and holds hair securely. Perfect for both casual and party looks.",
        date: "1 month ago"
    },
    {
        id: 8,
        name: "Diya Verma",
        location: "Kolkata, West Bengal",
        rating: 5,
        productName: "Satin Bow Clip",
        description: "Elegant and beautiful! The satin material feels luxurious and the bow stays perfectly shaped.",
        date: "2 months ago"
    }
];

const CustomerFeedback = () => {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef(null);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={16}
                className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    // Triple the feedbacks for seamless infinite loop
    const extendedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks];

    return (
        <div className="min-h-screen py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Customer Reviews
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                        See what our happy customers are saying
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                        <div className="flex">
                            {renderStars(5)}
                        </div>
                        <span className="text-gray-700 font-semibold">4.8/5</span>
                        <span className="text-gray-500 text-sm">({feedbacks.length} reviews)</span>
                    </div>
                </div>

                {/* Infinite Scroll Slider with CSS Animation */}
                <div className="overflow-hidden relative py-4">
                    <div
                        ref={scrollRef}
                        className={`flex gap-4 sm:gap-6 ${isPaused ? '' : 'animate-scroll'}`}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        style={{
                            width: 'fit-content'
                        }}
                    >
                        {extendedFeedbacks.map((feedback, index) => (
                            <div
                                key={`${feedback.id}-${index}`}
                                className="shrink-0 w-64 sm:w-72 md:w-80 bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-purple-100"
                            >
                                {/* Quote Icon */}
                                <div className="flex justify-center mb-3">
                                    <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                                        <Quote size={18} className="text-purple-600" />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex justify-center gap-1 mb-3">
                                    {renderStars(feedback.rating)}
                                </div>

                                {/* Product Name */}
                                <div className="text-center mb-3">
                                    <span className="inline-block bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {feedback.productName}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 text-xs sm:text-sm text-center leading-relaxed mb-4 h-16 sm:h-20 overflow-hidden">
                                    "{feedback.description}"
                                </p>

                                {/* Customer Info */}
                                <div className="text-center pt-3 sm:pt-4 border-t border-gray-100">
                                    <h4 className="font-bold text-gray-900 text-sm">{feedback.name}</h4>
                                    <div className="flex items-center justify-center gap-1 text-gray-600 mt-1">
                                        <MapPin size={12} />
                                        <span className="text-xs">{feedback.location}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs mt-1 block">{feedback.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Overlays for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-r from-purple-50 via-purple-50 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-linear-to-l from-pink-50 via-pink-50 to-transparent pointer-events-none z-10"></div>
                </div>

                {/* Info Text */}
                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-gray-500 text-xs sm:text-sm">✨ Auto-scrolling feedback • Hover to pause</p>
                </div>

            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default CustomerFeedback;