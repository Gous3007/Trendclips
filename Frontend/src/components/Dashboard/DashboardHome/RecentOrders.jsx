import React, { useEffect, useState } from "react";
import api from "../../../api/axios";

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/api/dashboard/recent-orders");
                setOrders(res.data.data || []);
            } catch (error) {
                console.error("Recent Orders Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/10 text-green-500 border border-green-500/20";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
            case "Cancelled":
                return "bg-red-500/10 text-red-500 border border-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-400";
        }
    };

    return (
        <div className="w-full bg-[#0B0F19] p-6 text-white">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase text-gray-400">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-700 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-400">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-6 text-center text-gray-400">
                                        No recent orders
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, index) => (
                                    <tr key={index} className="hover:bg-slate-700/50">
                                        <td className="p-4 font-semibold">{order.id}</td>
                                        <td className="p-4 text-gray-300">{order.customer}</td>
                                        <td className="p-4 text-gray-400">{order.date}</td>
                                        <td className="p-4 font-medium">{order.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentOrders;
