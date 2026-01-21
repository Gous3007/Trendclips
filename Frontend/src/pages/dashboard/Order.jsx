import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
    Search,
    Calendar,
    Filter,
    ChevronLeft,
    ChevronRight,
    XCircle // Reset icon ke liye
} from "lucide-react";

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 States for Filters
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(""); // Date filter state
    const [statusFilter, setStatusFilter] = useState(""); // Status filter state

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 🔥 FETCH ORDERS
    const fetchOrders = async () => {
        try {
            setLoading(true);

            // Query Params banana
            const params = new URLSearchParams({
                search: search,
                page: page,
                limit: 6,
                date: selectedDate, // Date backend ko bhej rahe hain
                status: statusFilter // Status backend ko bhej rahe hain
            });

            const res = await api.get(`/api/dashboard/admin/orders?${params.toString()}`);

            setOrders(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Jab bhi filters change honge, data fetch hoga
    useEffect(() => {
        fetchOrders();
    }, [search, page, selectedDate, statusFilter]);

    // 🔹 STATUS COLOR HELPER
    const getStatusColor = (status) => {
        switch (status) {
            case "CONFIRMED": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "SHIPPED": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "DELIVERED": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "CANCELLED": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    // 🔹 CLEAR FILTERS FUNCTION
    const clearFilters = () => {
        setSearch("");
        setSelectedDate("");
        setStatusFilter("");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-white p-6">

            {/* HEADER */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold">Orders</h1>
                    <p className="text-gray-400 text-sm">
                        Manage and track customer orders
                    </p>
                </div>

                {/* Agar koi filter laga hai to Clear button dikhayein */}
                {(search || selectedDate || statusFilter) && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
                    >
                        <XCircle size={16} /> Clear Filters
                    </button>
                )}
            </div>

            {/* SEARCH & FILTER BAR */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex gap-4 flex-wrap">

                {/* 1. SEARCH INPUT (Invoice ID / Name) */}
                <div className="relative flex-1 min-w-[250px]">
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Invoice ID..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // Search karte waqt page 1 pe wapas jayein
                        }}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                    />
                </div>

                {/* 2. DATE FILTER (Calendar) */}
                <div className="relative w-full sm:w-auto">
                    <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setPage(1);
                            }}
                            className="w-full sm:w-48 bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 text-white scheme-dark"
                            style={{ colorScheme: "dark" }} // Calendar icon ko white karne ke liye
                        />
                    </div>
                </div>

                {/* 3. STATUS FILTER */}
                <div className="relative w-full sm:w-auto">
                    <Filter size={18} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="w-full sm:w-48 bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 text-white appearance-none cursor-pointer"
                    >
                        <option value="">All Status</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 flex flex-col items-center gap-2">
                        <Search size={32} className="opacity-20" />
                        <p>No orders found matching your filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-900 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="p-4 text-left">Order ID</th>
                                    <th className="p-4 text-left">Customer</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-700">
                                {orders.map(order => (
                                    <tr key={order._id} className="hover:bg-gray-700/50 transition-colors">
                                        <td className="p-4 text-blue-400 font-medium">
                                            #{order.orderId}
                                        </td>
                                        <td className="p-4">{order.customer}</td>
                                        <td className="p-4 text-gray-400">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-semibold">
                                            ₹{Math.floor(parseFloat(order.amount?.toString().replace(/[^\d.]/g, "")) || 0)}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => navigate(`/trendclips/secure-panel-x308/dashboard/details/${order._id}`)}
                                                className="text-blue-400 hover:text-blue-300 hover:underline"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* PAGINATION */}
                {orders.length > 0 && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-700">
                        <span className="text-gray-400 text-sm">
                            Page {page} of {totalPages}
                        </span>

                        <div className="flex gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-3 py-1 border border-gray-600 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-3 py-1 border border-gray-600 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;