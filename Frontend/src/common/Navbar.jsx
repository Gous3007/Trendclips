import React, { useState, useEffect } from 'react';
import {
    User,
    Heart,
    ShoppingBag,
    Menu,
    X,
    ChevronDown,
    LogIn,
    Shield,
    Sparkles
} from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(3);
    const [wishlistCount, setWishlistCount] = useState(5);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Products', href: '#', hasDropdown: true },
        { name: 'About Us', href: '#' },
        { name: 'Contact Us', href: '#' },
        { name: 'Orders', href: '#' },
    ];

    return (
        <header
            className={`w-full bg-white sticky top-0 z-50 font-sans transition-all duration-300 ${isScrolled ? 'shadow-xl border-b border-gray-100' : 'shadow-sm'
                }`}
        >
            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 shrink-0 cursor-pointer group">
                        <div className="relative">
                            <img
                                src="/Trendclips_Logo-Photoroom.png"
                                alt="Brand Logo"
                                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -right-2 -top-2">
                                <Sparkles className="h-4 w-4 text-pink-500 animate-pulse" />
                            </div>
                        </div>

                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="relative px-5 py-2.5 text-sm font-semibold text-gray-800 hover:text-purple-600 transition-all duration-200 group"
                            >
                                <span className="flex items-center gap-2">
                                    {link.name}
                                    {link.hasDropdown && (
                                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                    )}
                                </span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-purple-600 to-pink-500 group-hover:w-4/5 transition-all duration-300 rounded-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* User Profile with Hover Dropdown */}
                        <div className="relative group z-50">
                            <div className="pb-2 -mb-2">
                                <ActionIcon
                                    icon={<User size={20} />}
                                    label="Profile"
                                />
                            </div>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 origin-top-right overflow-hidden">
                                <div className="p-2 space-y-1">
                                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        Account
                                    </div>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                                        <LogIn size={16} />
                                        Login your account
                                    </a>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors">
                                        <Shield size={16} />
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative">
                            <ActionIcon
                                icon={<ShoppingBag size={20} />}
                                label="Cart"
                                isHighlighted
                            />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-linear-to-r from-purple-600 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden ml-1 p-2.5 rounded-full text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-all duration-200"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl animate-slideDown">
                    <div className="px-4 py-6 space-y-1">
                        {/* Mobile Links */}
                        <div className="flex flex-col space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between p-3 text-gray-800 font-semibold hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200 group"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2">
                                        {link.name}
                                    </span>
                                    {link.hasDropdown && (
                                        <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                                    )}
                                </a>
                            ))}
                            {/* Account Links in Mobile Menu */}
                            <div className="border-t border-gray-100 my-2 pt-2">
                                <a
                                    href="#"
                                    className="flex items-center gap-2 p-3 text-gray-800 font-semibold hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <LogIn size={18} /> Login Account
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 p-3 text-gray-800 font-semibold hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Shield size={18} /> Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

const ActionIcon = ({ icon, label, isHighlighted }) => (
    <button
        className={`relative p-2.5 rounded-full transition-all duration-300 group ${isHighlighted
            ? 'bg-linear-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-105'
            : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600 hover:scale-105'
            }`}
        aria-label={label}
    >
        {icon}
        {label !== "Profile" && (
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg hidden sm:block">
                {label}
            </span>
        )}
    </button>
);

export default Navbar;