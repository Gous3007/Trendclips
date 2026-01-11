import DashboardStats from "../../components/Dashboard/DashboardHome/DashboardStats";
import DashboardAnalytics from "../../components/Dashboard/DashboardHome/DashboardAnalytics";
import RecentOrders from "../../components/Dashboard/DashboardHome/RecentOrders";
const DashboardHome = () => {
    return (
        <div className="bg-[#0B0F19]">
            <DashboardStats />
            <DashboardAnalytics/>
            <RecentOrders/>
        </div>
    );
};

export default DashboardHome;
