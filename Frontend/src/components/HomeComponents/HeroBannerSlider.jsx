import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
    {
        url: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706965/hl4evtvr2hf9oeo0jgck.png",
        alt: "Fashion model 1"
    },
    {
        url: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706894/kh9fwbmefbd1mci7v4vf.png",
        alt: "Fashion model 2"
    },
    {
        url: "https://res.cloudinary.com/drppaqhmd/image/upload/v1765706970/qvejiaid1awca40ubjhm.png",
        alt: "Fashion model 3"
    }
];

const HeroBannerSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // 5000ms = 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 ">
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-3xl shadow-xl group">

                {/* Background Slider Layer */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={slide.url}
                            alt={slide.alt}
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Dark Overlay for better text visibility */}
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}

                {/* Static Content Layer (Text & Button) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md tracking-tight">
                        New Arrivals & Seasonal Sales
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm md:text-lg text-white/90 mb-8 max-w-2xl drop-shadow-sm font-medium">
                        Discover the latest trends in hair accessories and fashion. Up to 30% off on selected items!
                    </p>

                    {/* Button */}
                    <Link to="/shop">
                        <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                            Shop Now
                        </button>
                    </Link>
                </div>

                {/* Optional: Slider Indicators (Dots at bottom) */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroBannerSlider;