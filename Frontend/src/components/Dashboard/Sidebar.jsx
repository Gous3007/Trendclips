import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Users,
    Menu,
    X,
    Plus,
    PlusCircle,
    Pencil,
    ShoppingBasket,
    ArrowLeftIcon
} from "lucide-react";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    const navItems = [
        { name: "Dashboard", path: "/trendclips/secure-panel-x308/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Products", path: "/trendclips/secure-panel-x308/dashboard/products", icon: <Package size={20} /> },
        { name: "Orders", path: "/trendclips/secure-panel-x308/dashboard/order", icon: <ShoppingBasket size={20} /> },
        { name: "Add Product", path: "/trendclips/secure-panel-x308/dashboard/add", icon: <PlusCircle size={20} /> },
        { name: "Edit Product", path: "/trendclips/secure-panel-x308/dashboard/edit", icon: <Pencil size={20} /> },
        // { name: "Customers", path: "/trendclips/secure-panel-x308/dashboard/customers", icon: <Users size={20} /> },
        { name: "Showcase", path: "/trendclips/secure-panel-x308/dashboard/showcase", icon: <ClipboardList size={20} /> },
        { name: "Contact Us", path: "/trendclips/secure-panel-x308/dashboard/contact", icon: <ClipboardList size={20} /> },
    ];

    const handleLogout = async () => {
        await api.post("/api/admin/logout");
        navigate("/adminlogin");
    };

    return (
        <>
            {/* 🔥 Mobile Burger Button (ONLY mobile) */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-slate-900 text-white rounded-md shadow-md"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* 🌫 Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* 📌 Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-[#0B0F19] text-gray-400
          flex flex-col justify-between
          transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
            >

                {/* 🔝 Brand + Menu */}
                <div>
                    {/* Brand */}
                    <div className="px-6 py-6 border-b border-slate-700">
                        <h1 className="text-2xl font-bold text-white tracking-wide">
                            Trend<span className="text-sky-400">clip</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Admin Dashboard
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-4 flex flex-col gap-1 px-3">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? "bg-slate-800 text-sky-400 border-l-4 border-sky-400"
                                        : "hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* ➕ Bottom Action */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/60 backdrop-blur">

                    {/* Add Product */}
                    <button
                        className="
            w-full mb-4
            bg-linear-to-r from-sky-500 to-blue-600
            hover:from-sky-400 hover:to-blue-500
            text-white font-semibold
            py-3 rounded-xl
            flex items-center justify-center gap-2
            shadow-lg shadow-sky-500/20
            transition-all duration-200
            hover:scale-[1.02]
            active:scale-[0.98]
        "
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="
            w-full
            bg-gray-700 hover:bg-red-500/90
            text-gray-300 hover:text-white
            font-semibold
            py-3 rounded-xl
            flex items-center justify-center gap-2
            border border-gray-600 hover:border-red-400
            transition-all duration-200
        "
                    >
                        <ArrowLeftIcon size={18} />
                        Logout
                    </button>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;
