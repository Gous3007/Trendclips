import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper";
import Loader from "../components/Loaders/Loader";

import HeroBannerSlider from "../components/HomeComponents/HeroBannerSlider";
import ProductCollection from "../components/HomeComponents/ProductCollection";
import CustomerFeedback from "../components/HomeComponents/CustomerFeedback";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <PageWrapper>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="mt-4 md:mt-6 lg:mt-8">
                        <HeroBannerSlider />
                    </div>
                    <ProductCollection />
                    <CustomerFeedback />
                </>
            )}
        </PageWrapper>
    );
};

export default Home;
