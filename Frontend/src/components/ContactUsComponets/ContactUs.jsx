import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast"; // 👈 Notification ke liye
import api from "../../api/axios";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    // 🔁 Input Change Handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    // 🚀 Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic Validation
        if (!formData.fullName || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            await api.post("/api/contact", formData);

            // 🎉 Success Notification
            toast.success("Message sent successfully! We'll contact you soon.");

            // Form Reset
            setFormData({
                fullName: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (err) {
            // ❌ Error Notification
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* 🔔 Toaster Component (Notifications yaha dikhenge) */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* HEADER SECTION with Gradient */}
            <div className="bg-linear-to-r from-gray-800 to-indigo-600 py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-blue-200 font-bold tracking-wide uppercase text-sm">
                    Get in Touch
                </h2>
                <h1 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
                    We're here to help
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-blue-100 mx-auto">
                    Have questions about our services? Need support? Fill out the form below or visit us.
                </p>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-16">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5">

                    {/* 📍 LEFT SIDE: Contact Info & Map (Takes 2 cols on LG) */}
                    <div className="lg:col-span-2 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-purple-500 opacity-20 blur-xl"></div>

                        <div className="relative z-10 space-y-8">
                            <h3 className="text-2xl font-bold">Contact Information</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Fill up the form and our Team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                        <Phone size={18} className="text-white" />
                                    </div>
                                    <span className="text-slate-200 group-hover:text-white transition-colors">+91 123 456 7890</span>
                                </div>

                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                                        <Mail size={18} className="text-white" />
                                    </div>
                                    <span className="text-slate-200 group-hover:text-white transition-colors">support@growfinix.in</span>
                                </div>

                                <div className="flex items-start gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors shrink-0">
                                        <MapPin size={18} className="text-white" />
                                    </div>
                                    <span className="text-slate-200 group-hover:text-white transition-colors">
                                        Ausa Road, Latur, <br />Maharashtra, India - 413512
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Embedded Map */}
                        <div className="mt-10 relative z-10 rounded-xl overflow-hidden border border-white/20 h-48 md:h-60 shadow-lg">
                            <iframe
                                title="Latur Map"
                                src="https://maps.google.com/maps?q=Latur,Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* 📝 RIGHT SIDE: Form (Takes 3 cols on LG) */}
                    <div className="lg:col-span-3 p-8 sm:p-12 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-8 py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;