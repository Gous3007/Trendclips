import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, MapPin } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Background Decorations (Subtle) */}
            <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-[#FFB7B2] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-[#FFD1C9] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-lg text-center z-10"
            >
                {/* 404 Graphic Area */}
                <div className="relative mb-6">
                    <motion.h1
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-[120px] md:text-[150px] leading-none font-black text-white drop-shadow-xl"
                        style={{ textShadow: '4px 4px 0px #FFB7B2' }}
                    >
                        404
                    </motion.h1>

                    {/* Floating Map Pin Icon */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="bg-white p-4 rounded-full shadow-lg border-4 border-[#FFB7B2]">
                            <MapPin className="w-10 h-10 text-[#FFB7B2]" fill="#FFF9F5" />
                        </div>
                    </motion.div>
                </div>

                {/* English Content */}
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mb-8 text-base md:text-lg max-w-sm mx-auto leading-relaxed">
                    We can't seem to find the page you're looking for. It might have been removed or the link is incorrect.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                    {/* Go Back Button (Uses Browser History) */}
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-700 font-medium rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    {/* Go Home Button */}
                    <Link
                        to="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FFB7B2] text-white font-bold rounded-xl shadow-lg shadow-[#FFB7B2]/30 hover:bg-[#FF9E99] hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-sm text-gray-400">
                    Error Code: 404
                </div>

            </motion.div>
        </div>
    );
};

export default NotFound;