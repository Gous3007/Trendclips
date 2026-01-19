import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react';
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post("/api/admin/login", formData);

            toast.success("Login Successful! Welcome back.", {
                style: {
                    background: "#ECFDF5",
                    color: "#065F46",
                    border: "1px solid #34D399"
                }
            });

            navigate("/trendclips/secure-panel-x308/dashboard");
        } catch (err) {
            toast.error("Invalid Username or Password", {
                style: {
                    background: "#FEF2F2",
                    color: "#991B1B",
                    border: "1px solid #F87171"
                }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center p-4 font-sans">
            {/* Toast Notification Container */}
            <Toaster position="top-right" reverseOrder={false} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-[450px]"
            >
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-[#FFB7B2] rounded-full flex items-center justify-center mb-4 shadow-sm"
                    >
                        {/* Abstract Logo Shape mimicking the image */}
                        <div className="flex flex-col gap-1">
                            <div className="w-8 h-2 bg-white rounded-full opacity-80"></div>
                            <div className="w-8 h-2 bg-white rounded-full opacity-60"></div>
                            <div className="w-8 h-2 bg-white rounded-full opacity-40"></div>
                        </div>
                    </motion.div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 mt-1 text-sm">Manage your dashboard securely</p>
                </div>

                {/* Card Component */}
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(255,183,178,0.3)] p-8 md:p-10 border border-gray-100">

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-gray-500 text-sm">
                            Welcome back! Please enter your admin details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block ml-1">Username / Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#FFB7B2] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="admin@company.com"
                                    className="w-full pl-12 pr-4 py-4 bg-[#FFF5F5] border-transparent focus:bg-white border-2 focus:border-[#FFB7B2] rounded-xl outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-sm font-medium text-[#FF8A85] hover:text-[#FF6B66] transition-colors">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#FFB7B2] transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-[#FFF5F5] border-transparent focus:bg-white border-2 focus:border-[#FFB7B2] rounded-xl outline-none transition-all duration-300 text-gray-700 placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FFB7B2] hover:bg-[#FF9E99] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#FFB7B2]/40 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Continue"
                            )}
                        </motion.button>
                    </form>

                    {/* Footer removed generic Create account if strictly admin, but keeping structure if needed */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Protected by Admin Guard System
                        </p>
                    </div>
                </div>


                <div className="mt-3 text-center text-xs text-gray-300">
                    © 2026 Company Name. All rights reserved.
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;