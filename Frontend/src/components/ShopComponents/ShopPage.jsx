import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { flyToCart } from "../../utils/flyToCart.js";
import { useCart } from "../../context/CartContext.jsx";
import {
  Search,
  Filter,
  Star,
  X,
  ShoppingCart,
  Heart,
  TrendingUp,
  Shield,
  Truck,
  Zap,
  ChevronDown,
  Grid,
  List,
  ArrowUpDown,
  Check,
} from "lucide-react";

const ShopPage = () => {
  // --- Data (Same as before) ---
  const allProducts = [
    {
      id: 1,
      name: "Pastel Pink Scrunchie - Velvet Premium Hair Tie",
      price: 284,
      originalPrice: 399,
      discount: 29,
      rating: 4.8,
      reviews: 120,
      image:
        "https://m.media-amazon.com/images/I/61FdiSMfHrL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Scrunchies",
      color: "pink",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: true,
      isSponsored: false,
    },
    {
      id: 2,
      name: "Mint Green Headband - Silk Padded Comfort",
      price: 234,
      originalPrice: 999,
      discount: 77,
      rating: 4.9,
      reviews: 88,
      image:
        "https://m.media-amazon.com/images/I/71TO5N9iupL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Headbands",
      color: "green",
      delivery: "Free delivery",
      prime: true,
      isFavorite: true,
      isBestSeller: true,
      isSponsored: true,
    },
    {
      id: 3,
      name: "Pearl Barrette Set - 5 Piece Luxury Collection",
      price: 289,
      originalPrice: 1030,
      discount: 72,
      rating: 4.7,
      reviews: 210,
      image:
        "https://m.media-amazon.com/images/I/71fsz1Pf8vL._AC_UL480_FMwebp_QL65_.jpg",
      status: "Out of Stock",
      statusColor: "bg-red-100 text-red-600",
      category: "Barrettes",
      color: "white",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: false,
      isSponsored: false,
    },
    {
      id: 4,
      name: "Gold Metal Hair Clips - Modern Geometric Design",
      price: 390,
      originalPrice: 799,
      discount: 51,
      rating: 4.5,
      reviews: 45,
      image:
        "https://m.media-amazon.com/images/I/71c358XrqHL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Hair Clips",
      color: "gold",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: true,
      isSponsored: true,
    },
    {
      id: 5,
      name: "Velvet Padded Headband - Luxury Comfort",
      price: 1099,
      originalPrice: 6745,
      discount: 84,
      rating: 4.9,
      reviews: 152,
      image:
        "https://m.media-amazon.com/images/I/71HQYOZcDZL._AC_UL480_FMwebp_QL65_.jpg",
      status: "Low Stock",
      statusColor: "bg-orange-100 text-orange-700",
      category: "Headbands",
      color: "cream",
      delivery: "Free delivery",
      prime: true,
      isFavorite: true,
      isBestSeller: false,
      isSponsored: false,
    },
    {
      id: 6,
      name: "Satin Blue Scrunchie - Premium Silk Finish",
      price: 299,
      originalPrice: 600,
      discount: 51,
      rating: 4.7,
      reviews: 99,
      image:
        "https://m.media-amazon.com/images/I/81VHXwsLHHL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Scrunchies",
      color: "blue",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: true,
      isSponsored: false,
    },
    {
      id: 7,
      name: "Rose Gold Hair Clips - Modern Minimalist",
      price: 349,
      originalPrice: 1530,
      discount: 77,
      rating: 4.6,
      reviews: 75,
      image: "https://m.media-amazon.com/images/I/61fho1VHSRL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Hair Clips",
      color: "pink",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: false,
      isSponsored: true
    },
    {
      id: 8,
      name: "Black Silk Scrunchie - Luxury Edition",
      price: 299,
      originalPrice: 450,
      discount: 34,
      rating: 4.8,
      reviews: 134,
      image: "https://m.media-amazon.com/images/I/71M3htG4FkL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Scrunchies",
      color: "black",
      delivery: "Free delivery",
      prime: true,
      isFavorite: true,
      isBestSeller: true,
      isSponsored: false
    },
    {
      id: 9,
      name: "Crystal Barrette - Swarovski Inspired",
      price: 307,
      originalPrice: 999,
      discount: 69,
      rating: 4.9,
      reviews: 167,
      image: "https://m.media-amazon.com/images/I/71g+D0IsO6L._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Barrettes",
      color: "silver",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: true,
      isSponsored: true
    },
    {
      id: 10,
      name: "PANCA Dish Drying Kitchen Mat | Large Water Absorbent Utensil Drying Rack Mat | Anti-Slip Kitchen Accessories for Home, 16 x 18 Inches, Grey",
      price: 299,
      originalPrice: 999,
      discount: 70,
      rating: 4.7,
      reviews: 92,
      image: "https://m.media-amazon.com/images/I/718mBgi6nJL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Home & Kitchen",
      color: "multicolor",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: false,
      isSponsored: false
    },
    {
      id: 11,
      name: "SHUTTLE ART Desk Organizer, Plastic Desktop Organizer with Pencil Holder and Sticky Note Tray, Office Stationery Supplies for Home and School, Black",
      price: 199,
      originalPrice: 499,
      discount: 60,
      rating: 4.7,
      reviews: 92,
      image: "https://m.media-amazon.com/images/I/61pdtTQNXXL._AC_UL480_FMwebp_QL65_.jpg",
      status: "In Stock",
      statusColor: "bg-green-100 text-green-700",
      category: "Stationery",
      color: "multicolor",
      delivery: "Free delivery",
      prime: true,
      isFavorite: false,
      isBestSeller: true,
      isSponsored: false
    },
  ];
  const { category } = useParams(); // 👈 "Scrunchies"
  const { addToCart } = useCart();   // ✅ IMPORTANT

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);


  const categories = ["Scrunchies", "Headbands", "Hair Clips", "Barrettes", "Home & Kitchen", "Stationery"];
  const colors = [
    { name: "pink", class: "bg-pink-300", label: "Pink" },
    { name: "blue", class: "bg-blue-300", label: "Blue" },
    { name: "green", class: "bg-green-300", label: "Green" },
    { name: "gold", class: "bg-yellow-400", label: "Gold" },
    {
      name: "white",
      class: "bg-white border border-slate-300",
      label: "White",
    },
    { name: "black", class: "bg-slate-800", label: "Black" },
    { name: "silver", class: "bg-slate-300", label: "Silver" },
    {
      name: "multicolor",
      class: "bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300",
      label: "Multi",
    },
  ];

  // --- State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false); // New state for mobile sort
  const [priceRange, setPriceRange] = useState(500);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([2, 5, 8]);

  // --- Handlers (Same logic) ---
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange(500);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesPrice = product.price <= priceRange;
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);

      return (
        matchesSearch && matchesCategory && matchesPrice && matchesColor
      );
    });

    if (sortBy === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      products.sort((a, b) => b.discount - a.discount);
    }

    return products;
  }, [searchQuery, selectedCategories, priceRange, selectedColors, sortBy]);

  // Sort Options Array
  const sortOptions = [
    { value: "latest", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Avg. Customer Review" },
    { value: "discount", label: "% Off" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* 1. Page Header (Static on Mobile, Descriptive on Desktop) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">
            {category} Store
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-600">
            <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded">
              <Truck size={14} /> Free delivery ₹999
            </span>
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded">
              <Shield size={14} /> Authentic
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{filteredProducts.length} items found</span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Sticky Control Bar (Visible MD:Hidden) 
          Adjust 'top-[60px]' if your Navbar height is different */}
      <div className="md:hidden sticky top-[60px] z-30 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between">
        <button
          onClick={() => setIsMobileSortOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 border-r border-slate-100 active:bg-slate-50"
        >
          <ArrowUpDown size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700 text-sm">Sort</span>
        </button>
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3 active:bg-slate-50"
        >
          <Filter size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700 text-sm">Filter</span>
          {(selectedCategories.length > 0 || selectedColors.length > 0) && (
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>
        <div className="px-3 border-l border-slate-100 flex items-center">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-slate-500"
          >
            {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>
      </div>

      {/* 3. Main Desktop Toolbar (Hidden on Mobile) */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          {/* Left: Search */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search within category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Right: Sort & View */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-none bg-slate-50 font-medium text-slate-900 focus:ring-0 cursor-pointer rounded px-2 py-1"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-slate-100 rounded p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white shadow text-amber-600" : "text-slate-500"}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${viewMode === "list" ? "bg-white shadow text-amber-600" : "text-slate-500"}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto flex gap-6 px-4 pb-12 pt-2 md:pt-0">

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-red-600 hover:text-red-700 uppercase"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-slate-800">Category</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat} className="flex items-center">
                      <label className="flex items-center gap-3 cursor-pointer w-full group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-amber-500 border-amber-500' : 'border-slate-300 bg-white group-hover:border-amber-400'}`}>
                          {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{cat}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-slate-800">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>₹0</span>
                  <span className="font-bold text-slate-900">Under ₹{priceRange}</span>
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <h3 className="font-semibold text-sm mb-3 text-slate-800">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      title={color.label}
                      className={`w-6 h-6 rounded-full border border-slate-200 shadow-sm transition-transform ${color.class} ${selectedColors.includes(color.name) ? "ring-2 ring-offset-1 ring-amber-500 scale-110" : "hover:scale-105"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="text-slate-500 text-sm mb-4">Try changing filters or search criteria.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-amber-500 text-white text-sm font-medium rounded hover:bg-amber-600"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid ${viewMode === "grid"
                ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3" // Mobile: 2 cols, Desktop: 3
                : "grid-cols-1"
                } gap-3 md:gap-6`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'}`}
                >
                  {/* Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-32 md:w-48 shrink-0' : 'aspect-4/5'} bg-gray-100`}>
                    <img
                      ref={(el) => (product.imgRef = el)}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {product.isBestSeller && (
                        <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded border border-orange-200">
                          Best Seller
                        </span>
                      )}
                      {product.prime && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Check size={10} /> Prime
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm md:text-base font-medium text-slate-900 leading-tight mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-amber-400">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill={product.rating >= 4.5 ? "currentColor" : "none"} />
                      </div>
                      <span className="text-xs text-slate-500">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base md:text-lg font-bold text-slate-900">₹{product.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                      </div>
                      <div className="text-[10px] md:text-xs text-green-600 font-medium mt-0.5">
                        {product.delivery}
                      </div>
                    </div>

                    {/* Add Button (Desktop Only or List Mode) */}
                    <button onClick={() => {
                      flyToCart(product.imgRef); // 🪄 WORKING
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      });
                    }}
                      className="mt-3 w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-xs md:text-sm font-medium rounded-full transition-colors opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 lg:opacity-100">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="px-4 py-3 border-b flex justify-between items-center bg-white">
            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              <X size={24} className="text-slate-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Reuse Sidebar Filter Logic Here for Mobile */}
            <div>
              <h3 className="font-bold text-slate-800 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm border ${selectedCategories.includes(cat) ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-slate-300 text-slate-600'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg accent-amber-600"
              />
              <div className="text-center font-bold mt-2">Max: ₹{priceRange}</div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`w-10 h-10 rounded-full border shadow-sm ${color.class} ${selectedColors.includes(color.name) ? 'ring-2 ring-amber-500 ring-offset-2' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t bg-white">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg shadow"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sort Bottom Sheet */}
      {isMobileSortOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMobileSortOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-4 md:hidden animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold">Sort By</h3>
              <button onClick={() => setIsMobileSortOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setIsMobileSortOpen(false);
                  }}
                  className={`w-full text-left py-3 px-2 rounded-lg ${sortBy === opt.value ? 'bg-amber-50 text-amber-700 font-bold' : 'text-slate-600'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default ShopPage;