import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const AdminRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get("/api/admin/me", { withCredentials: true });
                setAuthorized(true);
            } catch (err) {
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return null; // ya loader

    return authorized ? children : <Navigate to="/adminlogin" replace />;
};

export default AdminRoute;
