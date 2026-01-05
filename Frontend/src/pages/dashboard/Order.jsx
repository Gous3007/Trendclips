import React, { useState } from "react";
import {
    Search,
    Calendar,
    Filter,
    Download,
    Plus,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

const Orders = () => {
    // Dummy Order Data matching the image
    const orders = [
        {
            id: "#HA-12054",
            customer: "Olivia Chen",
            date: "Oct 26, 2023",
            total: "$85.50",
            status: "Shipped",
        },
        {
            id: "#HA-12053",
            customer: "Liam Johnson",
            date: "Oct 25, 2023",
            total: "$42.00",
            status: "Delivered",
        },
        {
            id: "#HA-12052",
            customer: "Emma Garcia",
            date: "Oct 25, 2023",
            total: "$112.30",
            status: "Pending",
        },
        {
            id: "#HA-12051",
            customer: "Noah Brown",
            date: "Oct 24, 2023",
            total: "$78.90",
            status: "Canceled",
        },
        {
            id: "#HA-12050",
            customer: "Ava Martinez",
            date: "Oct 23, 2023",
            total: "$150.00",
            status: "Delivered",
        },
    ];

    // Helper function for status colors
    const getStatusColor = (status) => {
        switch (status) {
            case "Shipped":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "Delivered":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Canceled":
                return "bg-gray-600/20 text-gray-400 border-gray-600/30";
            default:
                return "bg-gray-500/10 text-gray-400";
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Order Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage and track all customer orders.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition-colors">
                        <Download size={18} />
                        Export
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg">
                        <Plus size={18} />
                        Create Order
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6 flex flex-col md:flex-row gap-4">

                {/* Search */}
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Order ID..."
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                    />
                </div>

                {/* Date Range Dropdown */}
                <div className="relative md:w-48">
                    <Calendar size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 text-sm">
                        <option>Date Range</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>This Month</option>
                    </select>
                </div>

                {/* Status Dropdown */}
                <div className="relative md:w-48">
                    <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
                    <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 appearance-none cursor-pointer focus:outline-none focus:border-blue-500 text-sm">
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Canceled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900/50 border-b border-gray-700 text-xs uppercase text-gray-400">
                                <th className="p-4 font-medium min-w-[120px]">Order ID</th>
                                <th className="p-4 font-medium min-w-[150px]">Customer</th>
                                <th className="p-4 font-medium min-w-[120px]">Date</th>
                                <th className="p-4 font-medium min-w-[100px]">Total</th>
                                <th className="p-4 font-medium min-w-[120px]">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 text-sm">
                            {orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="p-4 text-blue-400 font-medium cursor-pointer hover:underline">
                                        {order.id}
                                    </td>
                                    <td className="p-4 text-white">
                                        {order.customer}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {order.date}
                                    </td>
                                    <td className="p-4 font-medium text-white">
                                        {order.total}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-gray-400 hover:text-white p-1 hover:bg-gray-700 rounded transition-colors">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-gray-800 border-t border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-gray-400">
                        Showing <span className="text-white font-medium">1</span> to <span className="text-white font-medium">5</span> of <span className="text-white font-medium">20</span> results
                    </span>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50">
                            <ChevronLeft size={16} />
                            Previous
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;