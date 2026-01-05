import { useEffect, useState } from "react";
import PageWrapper from "../components/Loaders/PageWrapper";
import ShopPage from "../components/ShopComponents/ShopPage";
import Loader from "../components/Loaders/Loader";

const Shop = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 👇 fake loading delay (industry standard)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 600); // 0.6s (perfect)

        return () => clearTimeout(timer);
    }, []);

    return (
        <PageWrapper>
            {loading ? (
                <Loader />
            ) : (
                <div className="mt-4 md:mt-6 lg:mt-8">
                    <ShopPage />
                </div>
            )}
        </PageWrapper>
    );
};

export default Shop;
