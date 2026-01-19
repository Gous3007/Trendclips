import React from "react";
import Products from "../components/ProductDetails/ProductPage";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
const allProducts = () => {
    return (
        <div>
            <div className="mt-4 md:mt-6 lg:mt-8">  {/* Responsive margin */}
                <Products />
                <RelatedProducts/>
            </div>
        </div>
    );
};

export default allProducts;