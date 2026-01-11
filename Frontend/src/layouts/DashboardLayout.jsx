import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar - 20% */}
            <div className="w-[20%] bg-[#0B0F19] text-white">
                <Sidebar />
            </div>

            {/* Dashboard Content - 80% */}
            <div className="w-[80%]">
                <Outlet />
            </div>

        </div>
    );
};

export default DashboardLayout;
