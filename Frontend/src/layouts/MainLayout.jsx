import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import PageLoaderWrapper from "../components/Loaders/PageLoaderWrapper";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            {/* ✅ ONLY USER SIDE LOADER */}
            <PageLoaderWrapper>
                <main style={{ minHeight: "80vh" }}>
                    <Outlet />
                </main>
            </PageLoaderWrapper>

            <Footer />
        </>
    );
};

export default MainLayout;
