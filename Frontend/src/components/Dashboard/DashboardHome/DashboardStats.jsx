import React from "react";

const DashboardStats = () => {
    // डेटा को यहाँ एक Array में रखा है ताकि कार्ड्स को आसानी से मैप कर सकें
    const stats = [
        {
            title: "Total Products",
            value: "1,204",
            percentage: "+1.5%",
            isPositive: true,
            accentColor: "border-purple-500", // इमेज वाला पर्पल कलर
        },
        {
            title: "Orders Today",
            value: "86",
            percentage: "+12%",
            isPositive: true,
            accentColor: "border-green-500", // इमेज वाला हरा कलर
        },
        {
            title: "Out of Stock",
            value: "42",
            percentage: "-3%",
            isPositive: false, // यह लाल दिखेगा
            accentColor: "border-yellow-500", // इमेज वाला पीला/ऑरेंज कलर
        },
        {
            title: "Total Revenue",
            value: "$89,450",
            percentage: "+8.2%",
            isPositive: true,
            accentColor: "border-blue-500", // इमेज वाला नीला कलर
        },
    ];

    return (
        <div className="w-full bg-[#0B0F19] p-6 text-white">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-gray-400">
                        Welcome back, here's a summary of your store's performance.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button className="bg-slate-800 hover:bg-slate-700 text-sm font-medium py-2 px-4 rounded-lg border border-slate-700 transition-colors">
                        View Products
                    </button>
                    <button className="bg-slate-800 hover:bg-slate-700 text-sm font-medium py-2 px-4 rounded-lg border border-slate-700 transition-colors">
                        Manage Orders
                    </button>
                </div>
            </div>

            {/* Cards Grid Section */}
            {/* Mobile: grid-cols-1 (एक के नीचे एक) */}
            {/* Tablet: grid-cols-2 (दो-दो करके) */}
            {/* Desktop: grid-cols-4 (चारों एक लाइन में) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`bg-slate-800 rounded-lg p-6 border-l-4 ${stat.accentColor} shadow-lg`}
                    >
                        <h3 className="text-gray-400 text-sm font-medium mb-1">
                            {stat.title}
                        </h3>

                        <p className="text-3xl font-bold text-white mb-2">
                            {stat.value}
                        </p>

                        <span
                            className={`text-sm font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {stat.percentage}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardStats;