import React from 'react';

const OurStory = () => {
    const storySteps = [
        {
            id: 1,
            year: "2020",
            title: "The Beginning",
            subtitle: "When we opened",
            description: "Founded with a passion for delicate designs and a love for all things pastel. We started in a small studio with a simple idea: to create accessories that bring joy.",
            image: "https://images.unsplash.com/photo-1536825211030-094de935f680?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image (Scissors/Craft)
        },
        {
            id: 2,
            year: "2022",
            title: "Growing Together",
            subtitle: "Our Journey",
            description: "From a local favorite to shipping nationwide. Our journey has been fueled by the love of our community. We expanded our range and refined our craftsmanship.",
            image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800", // Placeholder (Model/Product)
        },
        {
            id: 3,
            year: "2024",
            title: "Crafting Magic",
            subtitle: "Our Brand Story",
            description: "Today, we continue to craft beautiful moments. Every piece tells a story of elegance and comfort, designed to bring a touch of pastel magic to your everyday style.",
            image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800", // Placeholder (Final Polish)
        },
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Header */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">Since 2020</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-800">Our Story</h3>
                    <div className="w-24 h-1 bg-pink-200 mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* --- The Central Animated Line (Desktop) --- */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-100">
                        {/* The moving gradient 'flow' animation */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-transparent via-pink-400 to-transparent animate-flow-down opacity-50"></div>
                    </div>

                    {/* --- The Left Line (Mobile) --- */}
                    <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100"></div>

                    {/* Timeline Items Loop */}
                    <div className="space-y-12 md:space-y-24">
                        {storySteps.map((step, index) => (
                            <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                                }`}>

                                {/* 1. Image Section */}
                                <div className="w-full md:w-1/2 p-4">
                                    <div className={`relative group rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-8 border-white ${index % 2 !== 0 ? 'md:mr-12' : 'md:ml-12'
                                        }`}>
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Overlay for aesthetic */}
                                        <div className="absolute inset-0 bg-pink-500/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                </div>

                                {/* Center Dot/Arrow (The Connector) */}
                                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 md:translate-y-0 top-0 md:top-auto flex flex-col items-center justify-center z-10 mt-4 md:mt-0">
                                    <div className="w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow-sm"></div>
                                    {/* Small arrow icon below dot */}
                                    <div className="text-slate-300 mt-1">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14M19 12l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* 2. Text Content Section */}
                                <div className="w-full md:w-1/2 p-4 pl-16 md:pl-4">
                                    <div className={`flex flex-col space-y-4 ${index % 2 !== 0 ? 'md:items-end md:text-right md:pr-12' : 'md:pl-12'
                                        }`}>
                                        {/* Year Badge */}
                                        <span className="inline-block px-4 py-1 rounded-full bg-pink-50 text-pink-600 text-sm font-bold font-serif border border-pink-100">
                                            {step.year}
                                        </span>

                                        {/* Content */}
                                        <div>
                                            <h4 className="text-slate-400 font-medium text-sm uppercase tracking-wide mb-1">{step.subtitle}</h4>
                                            <h3 className="text-3xl font-bold text-slate-800 mb-4">{step.title}</h3>
                                            <p className="text-slate-600 leading-relaxed font-light">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* End Arrow */}
                    <div className="absolute bottom-0 left-8 md:left-1/2 transform -translate-x-1/2 text-pink-300 pb-10">
                        <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>

                </div>
            </div>

            {/* Tailwind Custom Animation Style (Add this to your CSS or tailwind config) */}
            <style jsx>{`
        @keyframes flow-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-flow-down {
          animation: flow-down 3s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default OurStory;