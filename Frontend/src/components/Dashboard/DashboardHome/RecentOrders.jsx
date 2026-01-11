import React from "react";

const RecentOrders = () => {
    // इमेज वाला डेटा
    const orders = [
        {
            id: "#12048",
            customer: "Olivia Martinez",
            date: "2023-10-26",
            amount: "$125.50",
            status: "Completed",
        },
        {
            id: "#12047",
            customer: "Benjamin Carter",
            date: "2023-10-26",
            amount: "$89.99",
            status: "Pending",
        },
        {
            id: "#12046",
            customer: "Sophia Lee",
            date: "2023-10-25",
            amount: "$210.00",
            status: "Shipped",
        },
        {
            id: "#12045",
            customer: "Liam Johnson",
            date: "2023-10-25",
            amount: "$45.75",
            status: "Completed",
        },
        {
            id: "#12044",
            customer: "Ava Garcia",
            date: "2023-10-24",
            amount: "$300.10",
            status: "Cancelled",
        },
    ];

    // स्टेटस के हिसाब से रंग सेट करने का फंक्शन
    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/10 text-green-500 border border-green-500/20";
            case "Pending":
                return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
            case "Shipped":
                return "bg-blue-500/10 text-blue-500 border border-blue-500/20";
            case "Cancelled":
                return "bg-red-500/10 text-red-500 border border-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-500";
        }
    };

    return (
        <div className="w-full bg-[#0B0F19] p-6 text-white">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

            {/* Table Container - Mobile Responsive Scrolling */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700 text-xs uppercase text-gray-400">
                                <th className="p-4 font-medium whitespace-nowrap">Order ID</th>
                                <th className="p-4 font-medium whitespace-nowrap">Customer Name</th>
                                <th className="p-4 font-medium whitespace-nowrap">Date</th>
                                <th className="p-4 font-medium whitespace-nowrap">Amount</th>
                                <th className="p-4 font-medium whitespace-nowrap">Status</th>
                                <th className="p-4 font-medium whitespace-nowrap text-right">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-slate-700 text-sm">
                            {orders.map((order, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-slate-700/50 transition-colors duration-150"
                                >
                                    <td className="p-4 font-semibold text-white whitespace-nowrap">
                                        {order.id}
                                    </td>
                                    <td className="p-4 text-gray-300 whitespace-nowrap">
                                        {order.customer}
                                    </td>
                                    <td className="p-4 text-gray-400 whitespace-nowrap">
                                        {order.date}
                                    </td>
                                    <td className="p-4 font-medium text-white whitespace-nowrap">
                                        {order.amount}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right whitespace-nowrap">
                                        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentOrders;