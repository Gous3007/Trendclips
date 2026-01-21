import { useEffect, useState } from "react";
import api from "../../../api/axios";

const DashboardStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/api/dashboard/stats");
                setStats(res.data.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-6 text-gray-400">Loading dashboard stats...</div>;
    }

    return (
        <div className="w-full bg-[#0B0F19] p-6 text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">
                        Welcome back, here's a summary of your store's performance.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    percentage="+1.5%"
                    isPositive
                    accent="border-purple-500"
                />

                <StatCard
                    title="Orders Today"
                    value={stats.ordersToday}
                    percentage="+12%"
                    isPositive
                    accent="border-green-500"
                />

                <StatCard
                    title="Out of Stock"
                    value={stats.outOfStock}
                    percentage="-3%"
                    isPositive={false}
                    accent="border-yellow-500"
                />

                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.totalRevenue}`}
                    percentage="+8.2%"
                    isPositive
                    accent="border-blue-500"
                />
            </div>
        </div>
    );
};

/* 🔹 Reusable Card Component */
const StatCard = ({ title, value, percentage, isPositive, accent }) => {
    return (
        <div className={`bg-slate-800 rounded-lg p-6 border-l-4 ${accent} shadow-lg`}>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
                {title}
            </h3>

            <p className="text-3xl font-bold text-white mb-2">
                {value}
            </p>

            <span
                className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"
                    }`}
            >
                {percentage}
            </span>
        </div>
    );
};

export default DashboardStats;
