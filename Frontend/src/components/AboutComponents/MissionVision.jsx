import React from 'react';

const MissionVision = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid Container: Mobile में 1 कॉलम, Desktop में 2 कॉलम */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

          {/* --- CARD 1: OUR VISION --- */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start">

            {/* Icon: Eye (Pink Theme) */}
            <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Our Vision
            </h3>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              To bring premium, aesthetic accessories to every home, making elegance accessible to everyone.
            </p>
          </div>

          {/* --- CARD 2: OUR MISSION --- */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start">

            {/* Icon: Rocket (Purple Theme) */}
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Our Mission
            </h3>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              Quality materials + modern design + fast delivery. We strive to create joy with every package we send.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;