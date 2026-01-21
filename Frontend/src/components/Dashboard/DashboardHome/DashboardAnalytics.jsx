import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from "recharts";

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1e293b] border border-gray-700 p-3 rounded-lg shadow-xl">
                <p className="text-gray-300 text-xs mb-1">{label}</p>
                <p className="text-white font-bold text-sm">
                    {payload[0].value} <span className="text-gray-400 font-normal">Sales</span>
                </p>
            </div>
        );
    }
    return null;
};

const DashboardAnalytics = () => {
    const [salesData, setSalesData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [conversionRate, setConversionRate] = useState(0);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get("/api/dashboard/analytics");
                setSalesData(res.data.data.salesTrend || []);
                setStateData(res.data.data.ordersByState || []);
                setConversionRate(res.data.data.conversionRate || 0);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="w-full bg-[#0B0F19] p-6 text-white">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Analytics Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 📈 Chart 1: Sales Trend (Zig-Zag Style) */}
                <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-gray-300 font-semibold">Sales Trend</h3>
                        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Last 30 Days</span>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.4} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#9ca3af"
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }} />

                                {/* 👇 यहाँ type="linear" करने से ग्राफ Zig-Zag बनेगा */}
                                <Area
                                    type="linear"
                                    dataKey="value"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                    // Points (Dots) दिखाने के लिए ताकि Zig-Zag clear दिखे
                                    dot={{ r: 4, fill: '#111827', stroke: '#8b5cf6', strokeWidth: 2 }}
                                    activeDot={{ r: 6, fill: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 🔁 Right Column */}
                <div className="flex flex-col gap-6">

                    {/* Conversion Rate */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full"></div>
                        <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
                        <div className="mt-4 flex items-end gap-3">
                            <h2 className="text-4xl font-bold text-white">{conversionRate}%</h2>
                            <span className="flex items-center text-emerald-400 text-sm font-medium mb-1 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                                +0.5% ↑
                            </span>
                        </div>
                    </div>

                    {/* 📊 Orders by State */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 flex-1">
                        <h3 className="text-gray-300 font-semibold mb-4">Orders by State</h3>
                        <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stateData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#059669" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.4} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#9ca3af"
                                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={5}
                                    />
                                    <YAxis
                                        stroke="#9ca3af"
                                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1f2937', opacity: 0.4 }} />
                                    <Bar
                                        dataKey="orders"
                                        fill="url(#barGradient)"
                                        radius={[4, 4, 0, 0]}
                                        barSize={24}
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