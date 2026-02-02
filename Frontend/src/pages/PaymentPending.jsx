import { useNavigate } from "react-router-dom";

const PaymentPending = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white mt-5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">

                {/* Animated Warning/Pending Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-50 mb-6 animate-pulse">
                    <svg
                        className="h-8 w-8 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Processing
                </h2>

                {/* Descriptive Text */}
                <p className="text-gray-500 text-sm mb-6">
                    We have received your request, but the bank is taking a moment to confirm the transaction.
                </p>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-8 text-left">
                    <div className="flex gap-3">
                        <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-xs text-blue-800">
                            <p className="font-semibold mb-1">What should I do?</p>
                            <p>Please check your banking app for any approval requests. You will receive an email confirmation once the payment is cleared.</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        Refresh Status
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                    >
                        Return to Dashboard
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentPending;