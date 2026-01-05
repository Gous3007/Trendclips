import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
} from "lucide-react";

const Navbar = () => {

  const [searchText, setSearchText] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const navigate = useNavigate();


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );


  const handleMobileSearch = () => {
    if (!mobileSearch.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(mobileSearch)}`);
    setMobileSearch("");
  };

  // Handle Scroll Effect for Header Shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Body Scroll Lock when Mobile Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // Piche ka scroll band
    } else {
      document.body.style.overflow = "unset"; // Normal scroll chalu
    }
    return () => {
      document.body.style.overflow = "unset"; // Cleanup
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const categories = [
    "Hair Clips",
    "Scrunchies",
    "Headbands",
    "Barrettes",
    "Home & Kitchen",
    "Stationery",
  ];

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-lg" : "shadow-sm"
        }`}
    >
      {/* Top Bar */}
      <div className="bg-gray-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-gray-300">
                Trendclips.in
              </Link>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="hover:text-gray-300 cursor-pointer">
                  Deliver to Your Location
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/account" className="hover:text-gray-300">
                Account
              </Link>
              <Link to="/orders" className="hover:text-gray-300">
                Returns & Orders
              </Link>
              <Link to="/wishlist" className="hover:text-gray-300">
                Wishlist
              </Link>
              <Link to="/help" className="hover:text-gray-300">
                Customer Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 bg-white relative z-50">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative">
                <img
                  src="/Trendclips_Logo-Photoroom.png"
                  alt="Trendclips"
                  className="h-10 md:h-12 transition-transform hover:scale-105"
                />
              </div>
            </Link>

            {/* Categories Menu - Desktop */}
            <div className="hidden lg:flex ml-10 items-center gap-6">
              {categories.map((category) => (
                <div key={category} className="relative group">
                  <button
                    onClick={() => navigate(`/shop/${category}`)}
                    className="flex items-center text-gray-700 hover:text-orange-500 font-medium text-sm cursor-pointer"
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Trendclips.in"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchText.trim()) {
                    navigate(`/shop?search=${encodeURIComponent(searchText)}`);
                  }
                }}
                className="w-full h-10 px-4 pr-12 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />

              <button
                onClick={() => {
                  if (searchText.trim()) {
                    navigate(`/shop?search=${encodeURIComponent(searchText)}`);
                  }
                }}
                className="absolute right-0 top-0 h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-r-md"
              >
                <Search size={20} />
              </button>
            </div>
          </div>


          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Account - Desktop */}
            <div className="hidden md:block relative group">
              <Link
                to="/account"
                className="flex flex-col items-center px-3 py-2 hover:text-orange-500"
              >
                <User size={22} />
                <span className="text-xs mt-1">Account</span>
              </Link>
            </div>

            {/* Wishlist */}
            <div className="hidden md:block">
              <Link
                to="/wishlist"
                className="flex flex-col items-center px-3 py-2 hover:text-orange-500"
              >
                <Heart size={22} />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>
            </div>

            {/* Cart */}
            <div id="cart-icon" className="relative">
              <Link
                to="/cart"
                className="flex flex-col items-center px-3 py-2 hover:text-orange-500"
              >
                <ShoppingCart size={22} />
                <span className="text-xs mt-1">Cart</span>
                {totalQty > 0 && (
                  <span className="absolute -top-1 -right-1 md:top-0 md:right-2 h-5 w-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {totalQty}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 ml-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden py-3 border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Trendclips.in"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMobileSearch()}
              className="w-full h-10 px-4 pr-12 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />

            <button
              onClick={handleMobileSearch}
              className="absolute right-0 top-0 h-10 px-4 bg-orange-500 text-white rounded-r-md flex items-center justify-center"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Desktop */}
      <div className="hidden md:block border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between h-10">
            {/* UPDATED: Added ml-4 and increased gap for better spacing */}
            <div className="flex items-center gap-8 ml-4">
              <button className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-orange-600 cursor-pointer">
                <Menu size={18} /> All
              </button>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive
                      ? "text-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Offers */}
            <div className="flex items-center">
              <span className="text-sm font-bold text-gray-800 cursor-pointer hover:text-orange-600">
                Great Freedom Sale
              </span>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu - Fixed Height & Scrollable */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-0 bg-white z-40 overflow-y-auto shadow-inner"
          // Height calculation: 100vh minus header height (approx 135px)
          style={{ top: "135px", height: "calc(100vh - 135px)" }}
        >
          <div className="px-4 py-4 space-y-4 pb-20">
            {/* User Greeting - Amazon Style */}
            <div className="bg-gray-100 -mx-4 -mt-4 p-4 flex items-center gap-3 border-b">
              <div className="bg-white p-2 rounded-full">
                <User size={20} className="text-gray-600" />
              </div>
              <span className="font-bold text-lg text-gray-800">
                Hello, Sign in
              </span>
            </div>

            <div className="text-sm font-bold text-gray-900 uppercase pt-2">
              Trending
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            <div className="text-sm font-bold text-gray-900 uppercase mb-2">
              Shop By Category
            </div>
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left py-3 px-2 font-medium text-gray-600 border-b border-gray-50 hover:bg-gray-50 hover:text-orange-500"
              >
                {category}
              </button>
            ))}

            <div className="border-t border-gray-200 my-2 pt-2">
              <div className="text-sm font-bold text-gray-900 uppercase mb-2">
                Help & Settings
              </div>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-2 font-medium rounded-lg ${isActive
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 px-2 font-medium text-gray-600 hover:bg-gray-50"
              >
                <User size={20} />
                Your Account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 px-2 font-medium text-gray-600 hover:bg-gray-50"
              >
                <Heart size={20} />
                Your Wishlist
              </Link>
              <Link
                to="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 px-2 font-medium text-gray-600 hover:bg-gray-50"
              >
                <div className="w-5 h-5 flex items-center justify-center font-bold border border-gray-600 rounded-full text-[10px]">
                  ?
                </div>
                Customer Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;