import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LogoLoader from "./LogoLoader";

const PageLoaderWrapper = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            {loading && <LogoLoader />}
            {children}
        </>
    );
};

export default PageLoaderWrapper;
