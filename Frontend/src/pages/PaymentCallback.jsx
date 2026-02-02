import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const PaymentCallback = () => {
    const navigate = useNavigate();
    const calledRef = useRef(false); // 🔒 double API call protection

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("order_id");

        if (!orderId) {
            navigate("/payment-failed", { replace: true });
            return;
        }

        // 🔒 VERIFY PAYMENT FROM BACKEND
        api.get(`/api/orders/verify/${orderId}`)
            .then(res => {
                const status = res.data.status;

                if (status === "SUCCESS") {
                    navigate(`/payment/success?order_id=${orderId}`, { replace: true });
                } else if (status === "PENDING") {
                    navigate("/payment/pending", { replace: true });
                } else {
                    navigate("/payment/failed", { replace: true });
                }
            })
            .catch(err => {
                console.error("Payment verify error:", err);
                navigate("/payment-failed", { replace: true });
            });

    }, [navigate]);

    return (
        <div className="bg-white mt-5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">

                {/* Secure Icon Animation */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6 animate-pulse">
                    <svg
                        className="h-8 w-8 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Verifying Payment
                </h2>

                {/* Subtext */}
                <p className="text-gray-500 text-sm mb-8">
                    Please wait a moment while we securely process your transaction with the bank.
                </p>

                {/* Spinner */}
                <div className="flex justify-center mb-8">
                    {/* Amazon-style orange spinner */}
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                </div>

                {/* Warning / Footer Note */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                    <div className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-sm font-medium text-yellow-800">
                            Please do not refresh or close this page
                        </span>
                    </div>
                </div>

                {/* Optional: Order ID Display for Reassurance */}
                <p className="mt-6 text-xs text-gray-400">
                    Order ID: {new URLSearchParams(window.location.search).get("order_id") || "..."}
                </p>
            </div>
        </div>
    );
};

export default PaymentCallback;