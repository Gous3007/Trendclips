import React, { useState } from 'react';
import { Star, Truck, MapPin, ShieldCheck, RotateCcw, ChevronRight, Minus, Plus, Heart, Share2, ChevronDown, ChevronUp, Play } from 'lucide-react';

const ProductPage = () => {
    const [activeMedia, setActiveMedia] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Dusty Rose');
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [expandedSection, setExpandedSection] = useState('about');
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Media including images and video
    const productMedia = [
        { type: 'image', url: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=800" },
        { type: 'video', url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", thumb: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=800" },
        { type: 'image', url: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=800&sat=-100" },
        { type: 'image', url: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800" },
        { type: 'image', url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" },
        { type: 'image', url: "https://images.unsplash.com/photo-1535413089162-ef1f91c4ab8b?auto=format&fit=crop&q=80&w=800" },
    ];

    const colors = [
        { name: 'Dusty Rose', class: 'bg-pink-300', border: 'border-pink-400' },
        { name: 'Steel Blue', class: 'bg-blue-400', border: 'border-blue-500' },
        { name: 'Sage Green', class: 'bg-green-300', border: 'border-green-400' },
        { name: 'Cream', class: 'bg-amber-100', border: 'border-amber-200' },
    ];

    const sizes = ['Small', 'Medium', 'Large'];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Breadcrumbs */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 overflow-x-auto">
                        <span className="hover:text-orange-600 cursor-pointer whitespace-nowrap">Home</span>
                        <ChevronRight size={14} className="mx-1 shrink-0" />
                        <span className="hover:text-orange-600 cursor-pointer whitespace-nowrap">Beauty & Personal Care</span>
                        <ChevronRight size={14} className="mx-1 shrink-0" />
                        <span className="hover:text-orange-600 cursor-pointer whitespace-nowrap">Hair Accessories</span>
                        <ChevronRight size={14} className="mx-1 shrink-0" />
                        <span className="text-orange-600 font-medium whitespace-nowrap">Hair Clips</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
                <div className="lg:grid lg:grid-cols-12 lg:gap-6">

                    {/* LEFT: Media Gallery */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-16">
                            {/* Main Media Display */}
                            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-3">
                                {productMedia[activeMedia].type === 'image' ? (
                                    <img
                                        src={productMedia[activeMedia].url}
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="relative w-full h-full">
                                        <video
                                            src={productMedia[activeMedia].url}
                                            className="w-full h-full object-cover"
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                        />
                                    </div>
                                )}

                                {/* Wishlist & Share */}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                                        <Heart size={18} />
                                    </button>
                                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-6 gap-2 overflow-x-auto pb-2">
                                {productMedia.map((media, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveMedia(idx)}
                                        className={`relative aspect-square rounded border-2 overflow-hidden shrink-0 ${activeMedia === idx ? 'border-orange-500' : 'border-gray-200'
                                            }`}
                                    >
                                        <img
                                            src={media.type === 'video' ? media.thumb : media.url}
                                            alt={`View ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {media.type === 'video' && (
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                                <Play size={16} className="text-white fill-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="lg:col-span-7 mt-6 lg:mt-0">
                        {/* Brand & Title */}
                        <div className="mb-2">
                            <a href="#" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">Visit the Elegant Accessories Store</a>
                        </div>

                        <h1 className="text-xl sm:text-2xl font-normal text-gray-900 mb-3">
                            The Velvet Pearl Hair Clip - Premium Quality Handmade Hair Accessory with Faux Pearls for Women and Girls
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 mr-1">4.5</span>
                                <div className="flex">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star key={rating} size={16} className={`${rating < 4 ? 'text-orange-400 fill-orange-400' : 'text-gray-300 fill-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <a href="#reviews" className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
                                6,128 ratings
                            </a>
                            <span className="text-gray-400">|</span>
                            <span className="text-sm text-gray-600">500+ bought in past month</span>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4"></div>

                        {/* Price */}
                        <div className="mb-4">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-xs text-gray-600">M.R.P.:</span>
                                <span className="text-sm text-gray-500 line-through">₹1,299</span>
                            </div>
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-2xl sm:text-3xl text-red-700">-31%</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs">₹</span>
                                    <span className="text-3xl sm:text-4xl font-normal">899</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>
                            <p className="text-xs text-teal-700 mt-1">Save extra with no cost EMI</p>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4"></div>

                        {/* Offers */}
                        <div className="mb-4 bg-gray-50 p-3 rounded">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Offers</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-start gap-2">
                                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">Bank Offer</span>
                                    <span className="text-gray-700">5% Instant Discount up to ₹250 on HDFC Bank Cards</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">Partner Offers</span>
                                    <span className="text-gray-700">Get GST invoice and save up to 28% on business purchases</span>
                                </div>
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Colour: <span className="font-normal text-gray-700">{selectedColor}</span>
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`h-10 w-10 rounded-full border-2 ${color.class} ${selectedColor === color.name ? `${color.border} ring-2 ring-offset-1 ring-gray-400` : 'border-gray-300'
                                            }`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                Size: <span className="font-normal text-gray-700">{selectedSize}</span>
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 border rounded text-sm ${selectedSize === size
                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4"></div>

                        {/* Key Features */}
                        <div className="mb-4 space-y-2">
                            <div className="flex items-start gap-3">
                                <ShieldCheck size={20} className="text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Secure transaction</p>
                                    <p className="text-xs text-gray-600">Your transaction is secure with end-to-end encryption</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Truck size={20} className="text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-teal-700">FREE delivery</p>
                                    <p className="text-xs text-gray-600">Tomorrow, 10 AM - 9 PM. Order within <span className="text-green-700 font-medium">4 hrs 23 mins</span></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-gray-400 shrink-0 mt-0.5" />
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-blue-600 hover:text-orange-600 hover:underline cursor-pointer">Select delivery location</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <RotateCcw size={20} className="text-teal-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">7 days return policy</p>
                                    <p className="text-xs text-gray-600">Easy returns and refunds available</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-4"></div>

                        {/* Stock & Quantity */}
                        <div className="mb-4">
                            <p className="text-lg text-green-700 font-medium mb-3">In Stock</p>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-200 rounded-l-lg"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="px-4 py-2 min-w-[50px] text-center font-medium bg-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-200 rounded-r-lg"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-600">Quantity</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 mb-6">
                            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-full shadow-md transition-colors">
                                Add to Cart
                            </button>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="border-t border-gray-200 pt-4"></div>

                        {/* Collapsible Sections */}
                        <div className="mt-6 space-y-3">
                            {/* About this item */}
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection('about')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                                >
                                    <h3 className="font-semibold text-gray-900">About this item</h3>
                                    {expandedSection === 'about' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSection === 'about' && (
                                    <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Premium quality velvet material with soft touch finish for comfortable all-day wear</li>
                                            <li>Adorned with elegant faux pearls that add a touch of sophistication to any hairstyle</li>
                                            <li>Strong alloy clip ensures secure hold without damaging your hair</li>
                                            <li>Perfect for parties, weddings, daily wear, and special occasions</li>
                                            <li>Handmade with attention to detail and quality craftsmanship</li>
                                            <li>Suitable for all hair types - thin, thick, straight, curly or wavy hair</li>
                                            <li>Dimensions: 4.5" x 2.5" | Weight: 24g - lightweight and comfortable</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Product Description */}
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection('description')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                                >
                                    <h3 className="font-semibold text-gray-900">Product Description</h3>
                                    {expandedSection === 'description' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSection === 'description' && (
                                    <div className="px-4 pb-4 text-sm text-gray-700 space-y-3">
                                        <p>
                                            Elevate your hairstyle with our exquisite Velvet Pearl Hair Clip, a perfect blend of elegance and functionality. Crafted from premium, soft-touch velvet fabric and adorned with carefully selected faux pearls, this accessory brings timeless sophistication to any look.
                                        </p>
                                        <p>
                                            Whether you're heading to a wedding, attending a party, or simply want to add a chic accent to your everyday style, this versatile hair clip is your perfect companion. The strong alloy clip mechanism ensures your hair stays perfectly in place throughout the day without causing any damage or discomfort.
                                        </p>
                                        <p>
                                            Each piece is handmade with meticulous attention to detail, ensuring that you receive a product of the highest quality. The lightweight design (just 24g) means you can wear it comfortably for hours without any strain.
                                        </p>
                                        <p className="font-medium">Care Instructions:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Keep away from water and moisture</li>
                                            <li>Store in a cool, dry place</li>
                                            <li>Clean gently with a soft, dry cloth</li>
                                            <li>Avoid contact with perfumes and chemicals</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Specifications */}
                            <div className="border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => toggleSection('specs')}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                                >
                                    <h3 className="font-semibold text-gray-900">Technical Details</h3>
                                    {expandedSection === 'specs' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                                {expandedSection === 'specs' && (
                                    <div className="px-4 pb-4">
                                        <table className="w-full text-sm">
                                            <tbody className="divide-y divide-gray-200">
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Brand</td>
                                                    <td className="py-2 text-gray-900">Elegant Accessories</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Material</td>
                                                    <td className="py-2 text-gray-900">Velvet, Faux Pearl, Alloy</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Dimensions</td>
                                                    <td className="py-2 text-gray-900">4.5" x 2.5" x 0.5"</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Weight</td>
                                                    <td className="py-2 text-gray-900">24 grams</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Colour</td>
                                                    <td className="py-2 text-gray-900">{selectedColor}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Item Part Number</td>
                                                    <td className="py-2 text-gray-900">VPC-001-DR</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 text-gray-600 font-medium">Country of Origin</td>
                                                    <td className="py-2 text-gray-900">India</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Customer Reviews Section */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customer reviews</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-5xl font-normal text-gray-900">4.5</span>
                                <div>
                                    <div className="flex text-orange-400 mb-1">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <Star key={i} size={18} className={i < 4 ? 'fill-orange-400' : 'fill-gray-300 text-gray-300'} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">6,128 global ratings</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <div className="space-y-2">
                                {[
                                    { stars: 5, percent: 64 },
                                    { stars: 4, percent: 21 },
                                    { stars: 3, percent: 9 },
                                    { stars: 2, percent: 4 },
                                    { stars: 1, percent: 2 },
                                ].map((item) => (
                                    <div key={item.stars} className="flex items-center gap-3 text-sm">
                                        <span className="w-16 text-blue-600 hover:text-orange-600 cursor-pointer">{item.stars} star</span>
                                        <div className="flex-1 h-5 bg-gray-200 rounded overflow-hidden">
                                            <div
                                                className="h-full bg-orange-400"
                                                style={{ width: `${item.percent}%` }}
                                            />
                                        </div>
                                        <span className="w-12 text-right text-gray-600">{item.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sample Review */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="space-y-6">
                            <div className="bg-white">
                                <div className="flex items-start gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-medium">
                                        P
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Priya Sharma</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex text-orange-400">
                                                {[0, 1, 2, 3, 4].map((i) => (
                                                    <Star key={i} size={14} className="fill-orange-400" />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-900">Excellent quality!</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Reviewed in India on 10 December 2025</p>
                                        <p className="text-xs text-gray-500">Colour: Dusty Rose | Size: Medium | Verified Purchase</p>
                                    </div>
                                </div>
                                <div className="ml-13 mt-3">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Absolutely love this hair clip! The velvet material feels premium and the pearls look so elegant. It holds my thick hair perfectly without slipping. I've received so many compliments when wearing it. Great value for money and fast delivery. Highly recommend!
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 text-xs">
                                        <button className="text-gray-600 hover:text-gray-900">Helpful</button>
                                        <span className="text-gray-400">|</span>
                                        <button className="text-gray-600 hover:text-gray-900">Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductPage;