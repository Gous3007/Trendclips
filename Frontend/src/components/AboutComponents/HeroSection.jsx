import React from 'react';

const HeroSection = () => {
    return (
        <section className="flex items-center justify-center min-h-[60vh] p-4 bg-white">
            {/* Main Card Container */}
            <div className="relative w-full max-w-6xl overflow-hidden bg-linear-to-br from-[#FFF5F7] via-[#FFF0F5] to-[#F3F0FF] rounded-[3rem] px-6 py-20 md:px-12 md:py-28 shadow-sm">

              
                <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#F0FDF4] rounded-full mix-blend-multiply filter blur-2xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Bottom Right Blueish Blob */}
                <div className="absolute bottom-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-[#EFF6FF] rounded-full mix-blend-multiply filter blur-2xl opacity-70 translate-x-1/3 translate-y-1/3"></div>

                {/* --- Content --- */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">

                    {/* Badge / Pill */}
                    <div className="inline-block bg-white/60 backdrop-blur-sm border border-white/50 px-5 py-2 rounded-full shadow-sm">
                        <span className="text-xs md:text-sm font-bold tracking-wide text-slate-800">
                            Trusted by thousands. Trendclips with love.
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e293b] leading-tight">
                        Crafting beautiful moments, <br className="hidden md:block" />
                        one accessory at a time.
                    </h1>

                    {/* Subheading */}
                    <p className="text-slate-600 text-base md:text-lg lg:text-xl max-w-2xl font-light leading-relaxed">
                        Discover the story behind our handcrafted designs that bring a touch of pastel magic to your everyday style.
                    </p>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;