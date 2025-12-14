import React from "react";
import Navbar from "../common/Navbar";  
import HeroBannerSlider from "../components/HomeComponents/HeroBannerSlider";
import ProductCollection from "../components/HomeComponents/ProductCollection";
import CustomerFeedback from "../components/HomeComponents/CustomerFeedback";
import Footer from "../common/Footer";
const Home = () => {
    return (
        <div className="bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
            <Navbar /> 
            <div className="mt-4 md:mt-6 lg:mt-8">  {/* Responsive margin */}
                <HeroBannerSlider />
            </div>
            <ProductCollection />
            <CustomerFeedback />
            <Footer/>
        </div>
    );
};

export default Home;