import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AdminPageLoader = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Route change hone par loader dikhao
        setLoading(true);

        // 800ms ka smooth delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className="relative w-full h-full">
            {/* ✅ TRENDCLIPS LOADER */}
            {loading && (
                <div
                    className="fixed top-0 right-0 h-screen z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300"
                    // Agar sidebar 20% hai, to ye 80% area cover karega.
                    // Best Practice: "w-[80%]" ki jagah "left-[20%] right-0" use karein agar sidebar fixed width hai.
                    // Filhal aapke setup ke hisab se w-[80%] rakha hai.
                    style={{ width: "80%" }}
                >
                    {/* Glowing Ring Animation */}
                    <div className="relative flex items-center justify-center mb-4">
                        <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-500/20"></div>
                        <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-gray-700 border-l-transparent rounded-full animate-spin"></div>
                    </div>

                    {/* Brand Name with Pulse */}
                    <h2 className="text-white text-xl font-bold tracking-widest uppercase animate-pulse">
                        Trend<span className="text-blue-500">clips</span>
                    </h2>

                    <p className="text-gray-400 text-xs mt-2 tracking-wide">Loading Dashboard...</p>
                </div>
            )}

            {children}
        </div>
    );
};

export default AdminPageLoader;