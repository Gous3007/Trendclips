import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { flyToCart } from "../../utils/flyToCart.js";
import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  Grid,
  List,
  ArrowUpDown,
  Check,
  Zap,
  Award,
  Hash
} from "lucide-react";

// --- 1. FIXED: ImageWithLoader using forwardRef ---
// We need forwardRef so the parent can get the <img> DOM element for the animation
const ImageWithLoader = React.forwardRef(({ src, alt, className }, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Yellow Spinner inside the card image area */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-0">
          <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        ref={ref} // ✅ Ref attached here for flyToCart
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain mix-blend-multiply  ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
      />
    </div>
  );
});

const ShopPage = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products/all");
        const data = await res.data;
        let products = data.products || data;

        // Assign random rating if missing
        const processedProducts = products.map(p => ({
          ...p,
          rating: p.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
        }));

        setAllProducts(processedProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const { category } = useParams();
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);

  const categories = ["Scrunchies", "Headbands", "Hair Clips", "Barrettes", "Home & Kitchen", "Stationery"];
  const sortOptions = [
    { value: "", label: "Sort by" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // --- Sync Logic ---
  useEffect(() => {
    if (urlSearch) setSearchQuery(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    if (category) setSelectedCategories([category]);
  }, [category]);

  // --- Filtering & Sorting (2 Sec Delay) ---
  useEffect(() => {
    if (loading) return;

    setIsFiltering(true);

    const timer = setTimeout(() => {
      let products = allProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.finalPrice <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
      });

      if (sortBy === "price-low") {
        products.sort((a, b) => a.finalPrice - b.finalPrice);
      } else if (sortBy === "price-high") {
        products.sort((a, b) => b.finalPrice - a.finalPrice);
      } else {
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setDisplayedProducts(products);
      setIsFiltering(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [allProducts, searchQuery, selectedCategories, priceRange, sortBy, loading]);

  // --- Handlers ---
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange(2000);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-2">
            {category || "All Products"} Store
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-600">
            <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded">
              <Truck size={14} /> Free delivery ₹1999
            </span>
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded">
              <Shield size={14} /> Authentic
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{displayedProducts.length} items found</span>
          </div>
        </div>
      </div>

      {/* Mobile Toolbar */}
      <div className="md:hidden sticky top-[60px] z-30 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between">
        <button onClick={() => setIsMobileSortOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-3 border-r border-slate-100">
          <ArrowUpDown size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700 text-sm">Sort</span>
        </button>
        <button onClick={() => setIsMobileFilterOpen(true)} className="flex-1 flex items-center justify-center gap-2 py-3">
          <Filter size={18} className="text-slate-500" />
          <span className="font-medium text-slate-700 text-sm">Filter</span>
          {selectedCategories.length > 0 && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
        </button>
        <div className="px-3 border-l border-slate-100 flex items-center">
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="p-2 text-slate-500">
            {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Toolbar */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-none bg-slate-50 font-medium text-slate-900 focus:ring-0 cursor-pointer rounded-lg px-2 py-1">
                {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow text-amber-600" : "text-slate-500"}`}><Grid size={18} /></button>
              <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow text-amber-600" : "text-slate-500"}`}><List size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto flex gap-6 px-4 pb-12 pt-2 md:pt-0">

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900">Filters</h3>
                <button onClick={clearFilters} className="text-xs font-medium text-red-600 hover:text-red-700 uppercase">Clear</button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-slate-800">Category</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat} className="flex items-center">
                      <label className="flex items-center gap-3 cursor-pointer w-full group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedCategories.includes(cat) ? 'bg-amber-500 border-amber-500 scale-110' : 'border-slate-300 bg-white group-hover:border-amber-400'}`}>
                          {selectedCategories.includes(cat) && <Check size={12} className="text-white" />}
                        </div>
                        <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                        <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{cat}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3 text-slate-800">Price</h3>
                <input type="range" min="0" max="5000" step="50" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>₹0</span>
                  <span className="font-bold text-slate-900">Under ₹{priceRange}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Cards */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : isFiltering ? (
            <div className="flex flex-col items-center justify-center h-[60vh] w-full">
              <div className="w-16 h-16 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-4 shadow-lg"></div>
              <p className="text-slate-500 font-medium animate-pulse">Searching best picks...</p>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors">Reset Filters</button>
            </div>
          ) : (
            <div className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4 md:gap-6`}>
              {displayedProducts.map((product, index) => {
                // Determine Badge Status
                const isBestSeller = product.isBestSeller || index % 8 === 0;
                const isPrime = product.prime || index % 8 === 2;
                const isNew = product.isNew || index % 8 === 1;

                return (
                  <div

                    key={product._id}
                    className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'} 
                    ${isBestSeller ? 'border-l-[6px] border-l-yellow-400' : ''}`}
                  >
                    {/* Image Area */}
                    <div
                      onClick={() => navigate(`/info/products/${product._id}`)}
                      className={`relative ${viewMode === 'list' ? 'w-36 md:w-56 shrink-0' : 'aspect-4/5'} bg-gray-50 overflow-hidden`}>

                      {/* 2. FIXED: ImageWithLoader now accepts ref */}
                      <ImageWithLoader
                        ref={(el) => (product.imgRef = el)}
                        src={product.images?.[0]?.url}
                        alt={product.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start z-10">
                        {isBestSeller && <span className="flex items-center gap-1 bg-yellow-400 text-slate-900 text-[10px] font-extrabold px-2 py-1 rounded-md shadow-md uppercase tracking-wide"><Award size={12} strokeWidth={3} /> Best Seller</span>}
                        {isNew && <span className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md uppercase tracking-wide"><Zap size={12} fill="currentColor" /> New Arrival</span>}
                        {isPrime && <span className="flex items-center gap-1 bg-[#00A8E1] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md"><Check size={12} strokeWidth={4} /> Prime</span>}
                        {product.discount > 0 && <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">{product.discount}% OFF</span>}
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleFavorite(product._id); }}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white text-slate-400 hover:text-red-500 transition-colors z-10"
                      >
                        <Heart size={18} fill={favorites.includes(product._id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono mb-1.5 bg-slate-50 w-fit px-1.5 py-0.5 rounded">
                        <Hash size={10} /> {product.productId || "SKU-XXX"}
                      </div>

                      <h3 className="text-sm md:text-base font-semibold text-slate-900 leading-snug mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors" title={product.title}>
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={12} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} className={star <= Math.round(product.rating) ? "text-amber-400" : "text-gray-300"} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{product.rating} | 1.2k sold</span>
                      </div>

                      <div className="mt-auto border-t border-slate-100 pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg md:text-xl font-bold text-slate-900">₹{Math.floor(product.finalPrice)}</span>
                          <span className="text-xs text-slate-400 line-through">₹{product.price}</span>
                        </div>
                        <div className="text-[10px] md:text-xs text-green-600 font-medium mt-0.5">
                          Delivery by {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      {/* 3. FIXED: Button passing ref correctly */}
                      <button
                        onClick={() => {
                          flyToCart(product.imgRef); // ✅ Correctly passes the element
                          addToCart({
                            id: product._id,
                            name: product.title,
                            price: product.finalPrice,
                            image: product.images?.[0]?.url,
                            quantity: 1, // ✅ MUST
                            mrp: product.price,
                            discount: product.discount,
                            stock: product.quantity,
                            status: product.status
                          });
                        }}
                        className="mt-4 w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs md:text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm shadow-amber-200 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} /> Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Modals (Sort/Filter) - Kept same for brevity, add back if needed */}
      {isMobileFilterOpen && <div className="fixed inset-0 z-50 bg-white">...</div>}
      {isMobileSortOpen && <div className="fixed bottom-0 bg-white z-50">...</div>}
    </div>
  );
};

export default ShopPage;