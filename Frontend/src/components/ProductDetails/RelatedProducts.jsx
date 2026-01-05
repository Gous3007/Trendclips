import React from 'react';
import { Star, Heart } from 'lucide-react';

const RelatedProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Pastel Scrunchie Set',
            price: '299',
            originalPrice: '599',
            discount: '50',
            rating: 4.3,
            reviews: 2847,
            image: 'https://images.unsplash.com/photo-1535413089162-ef1f91c4ab8b?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 2,
            name: 'Marble Claw Clip',
            price: '499',
            originalPrice: '799',
            discount: '38',
            rating: 4.5,
            reviews: 1923,
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=400&hue=30'
        },
        {
            id: 3,
            name: 'Golden Hair Pin',
            price: '399',
            originalPrice: '699',
            discount: '43',
            rating: 4.7,
            reviews: 4521,
            image: 'https://images.unsplash.com/photo-1630019329803-046a482b5a3e?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 4,
            name: 'Silk Headband',
            price: '699',
            originalPrice: '1199',
            discount: '42',
            rating: 4.6,
            reviews: 3182,
            image: 'https://images.unsplash.com/photo-1621607510769-6be3c4e3dd5e?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 5,
            name: 'Pearl Hair Accessories Set',
            price: '899',
            originalPrice: '1499',
            discount: '40',
            rating: 4.4,
            reviews: 2156,
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 6,
            name: 'Butterfly Hair Clip',
            price: '349',
            originalPrice: '599',
            discount: '42',
            rating: 4.2,
            reviews: 1687,
            image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 7,
            name: 'Vintage Hair Barrette',
            price: '449',
            originalPrice: '799',
            discount: '44',
            rating: 4.5,
            reviews: 2934,
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 8,
            name: 'Satin Bow Hair Tie',
            price: '249',
            originalPrice: '499',
            discount: '50',
            rating: 4.3,
            reviews: 1432,
            image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&q=80&w=400'
        }
    ];

    return (
        <div className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">You Might Also Like</h2>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Discount Badge */}
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                    {product.discount}% OFF
                                </div>

                                {/* Wishlist Button */}
                                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                                    <Heart size={16} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="p-3 sm:p-4">
                                <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                                    {product.name}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex items-center bg-green-700 text-white text-xs px-1.5 py-0.5 rounded">
                                        <span className="font-semibold">{product.rating}</span>
                                        <Star size={10} className="ml-0.5 fill-white" />
                                    </div>
                                    <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-2 flex-wrap">
                                    <span className="text-lg sm:text-xl font-semibold text-gray-900">₹{product.price}</span>
                                    <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                                </div>

                                {/* Prime Badge */}
                                <div className="mt-2">
                                    <span className="inline-flex items-center text-xs text-teal-700 font-medium">
                                        <svg className="w-12 h-3 mr-1" viewBox="0 0 60 20" fill="currentColor">
                                            <path d="M35.176 17.146c-5.768 4.255-14.134 6.518-21.34 6.518-10.096 0-19.184-3.735-26.063-9.95-.541-.487-.056-1.151.593-.772 7.422 4.32 16.605 6.923 26.087 6.923 6.397 0 13.428-1.327 19.897-4.076.976-.415 1.794.642.826 1.357z" transform="scale(0.7) translate(10, -5)" />
                                            <path d="M37.501 14.46c-.736-.943-4.871-.446-6.727-.224-.564.067-.651-.423-.143-.777 3.294-2.318 8.703-1.649 9.332-.872.63.777-.164 6.162-3.238 8.734-.473.396-.924.185-.714-.339.697-1.744 2.262-5.65 1.49-6.522z" transform="scale(0.7) translate(10, -5)" />
                                        </svg>
                                        prime
                                    </span>
                                </div>

                                {/* Delivery Info */}
                                <p className="text-xs text-gray-600 mt-1">
                                    Get it by <span className="font-semibold text-gray-900">Tomorrow</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
                        View More Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;