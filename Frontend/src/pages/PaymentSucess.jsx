import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import InvoiceDownload from "../common/InvoiceDownload";
import Confetti from "react-confetti";
import { CheckCircle, ShoppingBag, Package, AlertTriangle, FileText, ChevronRight, Loader2 } from "lucide-react";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const orderId = params.get("order_id");
    const { clearCart } = useCart();
    const navigate = useNavigate();

    // --- State Management ---
    const [isFlipped, setIsFlipped] = useState(false); // Controls the card flip
    const [showConfetti, setShowConfetti] = useState(false); // Confetti starts AFTER flip
    const [windowSize, setWindowSize] = useState({
        width: document.documentElement.clientWidth,
        height: window.innerHeight
    });

    const [invoiceDownloaded, setInvoiceDownloaded] = useState(() => {
        return localStorage.getItem(`invoice_downloaded_${orderId}`) === 'true';
    });

    useEffect(() => {
        if (!orderId) return;

        setTimeout(() => {
            clearCart();
            setIsFlipped(true);
            setShowConfetti(true);
        }, 1500);

    }, [orderId, clearCart]);

    const handleInvoiceClick = () => {
        if (!invoiceDownloaded) {
            setInvoiceDownloaded(true);
            localStorage.setItem(`invoice_downloaded_${orderId}`, 'true');
        }
    };

    return (
        <div className="bg-[#eaeded] flex flex-col items-center justify-center py-8 px-4 font-sans overflow-x-hidden relative perspective-1000">

            {/* --- Confetti (Only shows after flip) --- */}
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={400}
                    gravity={0.2}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 50 }}
                />
            )}

            {/* --- 3D FLIP CONTAINER --- */}
            <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl perspective-1000">

                <div
                    className={`relative w-full transition-transform duration-1000 transform-style-3d ${isFlipped ? "rotate-y-180" : ""
                        }`}
                >

                    {/* === FRONT SIDE (Processing / Loading) === */}
                    <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment...</h2>
                        <p className="text-gray-500">Please wait while we confirm your order.</p>
                    </div>

                    {/* === BACK SIDE (Success / Invoice) === */}
                    <div className="relative backface-hidden rotate-y-180 bg-white w-full rounded-xl shadow-xl border border-gray-200 overflow-hidden">

                        {/* Header */}
                        <div className="bg-[#f0fdf4] p-6 border-b border-gray-100 flex flex-col items-center text-center gap-3">
                            <div className="bg-green-600 rounded-full p-3 shadow-md animate-bounce-short">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-green-700">Order Confirmed!</h1>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                                    Thank you for your purchase. Your order is secure.
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 sm:p-8">

                            {/* Order ID */}
                            <div className="text-center mb-8">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Order ID</p>
                                <p className="text-xl font-mono font-bold text-gray-800">{orderId || "Loading..."}</p>
                            </div>

                            {/* --- Invoice Section --- */}
                            <div className="mb-8 bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-5 rounded-xl shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-indigo-100 p-2 rounded-lg">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <h3 className="text-indigo-900 font-bold text-lg">Order Invoice</h3>
                                </div>

                                {!invoiceDownloaded ? (
                                    <div>
                                        <p className="text-sm text-indigo-700 mb-4 leading-relaxed">
                                            Click below to download your official invoice.
                                            <br />
                                            <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs mt-1 inline-block border border-red-100">
                                                ⚠️ Important: You can only download this once.
                                            </span>
                                        </p>
                                        <div onClick={handleInvoiceClick} className="w-full cursor-pointer transform hover:scale-[1.02] transition-transform">
                                            <InvoiceDownload orderId={orderId} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-gray-500 bg-gray-200/80 p-4 rounded-lg border border-gray-300">
                                        <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                                        <span className="text-sm font-medium">Invoice downloaded. Link expired for security.</span>
                                    </div>
                                )}
                            </div>

                            {/* --- Buttons --- */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/my-orders')}
                                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200] py-3.5 rounded-lg shadow-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <Package className="w-5 h-5" />
                                    My Orders
                                </button>

                                <button
                                    onClick={() => navigate('/shop')}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-3.5 rounded-lg shadow-sm font-semibold flex items-center justify-center gap-2 transition-all group active:scale-95"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Continue
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>

                        {/* Footer decorative line */}
                        <div className="h-2 bg-linear-to-r from-green-400 via-blue-500 to-indigo-500 w-full"></div>
                    </div>
                </div>
            </div>

            {/* --- CSS FOR 3D FLIP --- */}
            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;