import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from "recharts";

const DashboardAnalytics = () => {
    // Sales Trend Data (Purple Chart)
    const salesData = [
        { name: "Week 1", value: 4000 },
        { name: "Week 1.5", value: 3000 },
        { name: "Week 2", value: 5000 },
        { name: "Week 2.5", value: 2780 },
        { name: "Week 3", value: 1890 },
        { name: "Week 3.5", value: 6390 },
        { name: "Week 4", value: 3490 },
    ];

    // Orders by State Data (Green Bar Chart)
    const stateData = [
        { name: "CA", orders: 400 },
        { name: "NY", orders: 500 },
        { name: "TX", orders: 300 },
        { name: "IL", orders: 600 },
        { name: "GA", orders: 700 },
    ];

    return (
        <div className="w-full bg-[#111827] p-6 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* --- Left Side: Sales Trend Chart (Spans 2 columns on Desktop) --- */}
                <div className="lg:col-span-2 bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
                    <div className="mb-6">
                        <h3 className="text-gray-400 text-sm font-medium">Sales Trend</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <h2 className="text-3xl font-bold">$12,450</h2>
                            <span className="text-green-500 text-sm font-medium bg-green-500/10 px-2 py-0.5 rounded">
                                Last 30 Days +5.2%
                            </span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C084FC" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                    itemStyle={{ color: "#C084FC" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#C084FC"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    ticks={["Week 1", "Week 2", "Week 3", "Week 4"]}
                                    padding={{ left: 10, right: 10 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- Right Side: Smaller Cards (Spans 1 column) --- */}
                <div className="flex flex-col gap-6">

                    {/* Card 1: Conversion Rate */}
                    <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 h-full flex flex-col justify-center">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</h3>
                        <h2 className="text-3xl font-bold mb-1">3.2%</h2>
                        <span className="text-green-500 text-sm font-medium">
                            +0.5%
                        </span>
                    </div>

                    {/* Card 2: Orders by State */}
                    <div className="bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700 h-full">
                        <h3 className="text-gray-400 text-sm font-medium mb-4">Orders by State</h3>
                        <div className="h-[150px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stateData}>
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }}
                                    />
                                    <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                                        {stateData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill="#5da889" /> // Custom Green color matching image
                                        ))}
                                    </Bar>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;