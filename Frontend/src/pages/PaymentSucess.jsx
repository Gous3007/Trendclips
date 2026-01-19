import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import InvoiceDownload from "../common/InvoiceDownload";
import Confetti from "react-confetti";
import { CheckCircle, ShoppingBag, Package, AlertTriangle, FileText, ChevronRight } from "lucide-react";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const orderId = params.get("order_id");
    const { clearCart } = useCart();
    const navigate = useNavigate();

    // Animation & Layout States
    const [showConfetti, setShowConfetti] = useState(true);
    // FIX 1: Initial state me document.documentElement.clientWidth use kiya taaki scrollbar include na ho
    const [windowSize, setWindowSize] = useState({
        width: document.documentElement.clientWidth,
        height: window.innerHeight
    });

    // Invoice Logic State
    const [invoiceDownloaded, setInvoiceDownloaded] = useState(() => {
        return localStorage.getItem(`invoice_downloaded_${orderId}`) === 'true';
    });

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId) return;
            try {
                const res = await api.get(`/api/order/status/${orderId}`);
                if (res.data.success) {
                    clearCart();
                }
            } catch (error) {
                console.error("Payment verification failed", error);
            }
        };

        verifyPayment();

        // FIX 2: Resize handler updated to prevent horizontal scroll
        const handleResize = () => {
            setWindowSize({
                width: document.documentElement.clientWidth, // Scrollbar ignore karega
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);

        const timer = setTimeout(() => setShowConfetti(false), 5000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, [orderId]);

    const handleInvoiceClick = () => {
        if (!invoiceDownloaded) {
            setInvoiceDownloaded(true);
            localStorage.setItem(`invoice_downloaded_${orderId}`, 'true');
        }
    };

    return (
        // FIX 3: Added 'overflow-x-hidden' class here
        <div className="min-h-screen bg-[#eaeded] flex flex-col items-center py-8 px-4 font-sans relative overflow-x-hidden">

            {/* --- Confetti Animation --- */}
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.2}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 50 }} // Confetti ko fixed position diya
                />
            )}

            {/* --- Amazon-like Success Card --- */}
            <div className="bg-white max-w-2xl w-full rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in-up z-10">

                {/* Header Section */}
                <div className="bg-[#f0fdf4] p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="bg-green-600 rounded-full p-2 shadow-sm">
                        <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-green-700">Order placed, thank you!</h1>
                        <p className="text-gray-600 mt-1">
                            Confirmation will be sent to your email shortly.
                        </p>
                    </div>
                </div>

                {/* Order Details Body */}
                <div className="p-6 sm:p-8">

                    {/* Order ID Box */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 mb-8 w-full">
                        <div className="text-sm text-gray-500 mb-2 sm:mb-0">Order Reference #</div>
                        <div className="text-lg font-mono font-bold text-gray-800 tracking-wide select-all">
                            {orderId || "Loading..."}
                        </div>
                    </div>

                    {/* --- Invoice Section (One-Time Logic) --- */}
                    <div className="mb-8 border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded-r-md">
                        <h3 className="text-indigo-900 font-semibold flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5" /> Order Invoice
                        </h3>

                        {!invoiceDownloaded ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-indigo-700 mb-2">
                                    Please download your invoice now. <span className="font-bold text-red-500">Note: You can only download this once.</span>
                                </p>
                                <div onClick={handleInvoiceClick} className="w-full sm:w-fit cursor-pointer">
                                    <InvoiceDownload orderId={orderId} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 text-gray-500 bg-gray-200 p-3 rounded border border-gray-300">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                                <span className="text-sm font-medium">Invoice already downloaded. Access expired.</span>
                            </div>
                        )}
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => navigate('/my-orders')}
                            className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200] hover:border-[#F2C200] py-3 px-6 rounded-lg shadow-sm font-medium text-base transition-all flex items-center justify-center gap-2"
                        >
                            <Package className="w-5 h-5" />
                            Review Your Order
                        </button>

                        <button
                            onClick={() => navigate('/shop')}
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-3 px-6 rounded-lg shadow-sm font-medium text-base transition-all flex items-center justify-center gap-2 group"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Continue Shopping
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>
                    </div>

                </div>

                {/* Footer Link */}
                <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
                    See our <span className="text-blue-600 hover:underline cursor-pointer">returns policy</span> and <span className="text-blue-600 hover:underline cursor-pointer">customer service</span> options.
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;