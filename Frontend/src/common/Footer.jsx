import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react'; // या आप lucide-react से Pinterest जैसा कोई भी आइकॉन ले सकते हैं

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: SHOP */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm tracking-wider mb-4 uppercase">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Hair Clips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Scrunchies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Headbands
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Barrettes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: ABOUT US */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm tracking-wider mb-4 uppercase">
              About Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: CUSTOMER SERVICE */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm tracking-wider mb-4 uppercase">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW US */}
          <div>
            <h3 className="text-gray-900 font-bold text-sm tracking-wider mb-4 uppercase">
              Follow Us
            </h3>
            <div className="flex space-x-4 mt-4">
              {/* Instagram Icon */}
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram size={20} />
              </a>
              {/* Pinterest Placeholder (using Twitter/Linkedin generally available or import specific SVG) */}
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pin" // Pinterest SVG path manually added for accuracy
                  >
                    <line x1="12" x2="12" y1="17" y2="22"/>
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
                </svg>
              </a>
              {/* Third Icon (Bottle/Custom) - Using a generic icon here */}
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                 <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                 >
                   <path d="M9 12h6" />
                   <path d="M12 3v18" />
                   <path d="M5.6 5.6l12.8 12.8" />
                 </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-100 pt-8 mt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Hair Haven. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;