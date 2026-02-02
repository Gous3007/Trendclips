import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import AdminPageLoader from "../components/Dashboard/DashboardContentAnimation";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar - 20% (NO animation, NO movement) */}
            <div className="w-[20%] bg-[#0B0F19] text-white">
                <Sidebar />
            </div>

            {/* Content - 80% (ONLY HERE loader works) */}
            <div className="w-[80%] relative">
                <AdminPageLoader>
                    <Outlet />
                </AdminPageLoader>
            </div>

        </div>
    );
};

export default DashboardLayout;
