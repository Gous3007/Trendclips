import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white mt-5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">

                {/* Error Icon */}
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                    <svg
                        className="h-10 w-10 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Failed
                </h2>

                {/* Descriptive Text */}
                <p className="text-gray-500 text-sm mb-6">
                    We couldn't process your payment at this time. <br className="hidden sm:block" />
                    Don't worry, no money was deducted from your account.
                </p>

                {/* Common Reasons Section (Optional but helpful) */}
                <div className="bg-red-50 border border-red-100 rounded-md p-3 mb-8 text-left">
                    <p className="text-xs font-semibold text-red-800 mb-1">Possible reasons:</p>
                    <ul className="list-disc list-inside text-xs text-red-700 space-y-1">
                        <li>Insufficient funds</li>
                        <li>Incorrect card details</li>
                        <li>Bank server timeout</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/address")} // Or wherever your checkout page is
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                    >
                        Go to Home
                    </button>
                </div>

                {/* Support Link */}
                <p className="mt-8 text-xs text-gray-400">
                    Having trouble? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/contact')}>Contact Support</span>
                </p>
            </div>
        </div>
    );
};

export default PaymentFailed;