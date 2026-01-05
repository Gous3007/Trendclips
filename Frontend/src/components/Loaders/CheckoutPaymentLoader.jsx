import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutPaymentLoader = () => {
    return (
        <div
            style={{
                padding: "20px",
                minHeight: "70vh",
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "24px",
            }}
        >
            {/* LEFT: Checkout Form */}
            <div>
                <Skeleton height={22} width="40%" />
                <Skeleton height={42} style={{ marginTop: 12 }} />
                <Skeleton height={42} />
                <Skeleton height={42} />
                <Skeleton height={42} />

                <Skeleton height={22} width="30%" style={{ marginTop: 24 }} />
                <Skeleton height={42} />
            </div>

            {/* RIGHT: Order Summary */}
            <div
                style={{
                    padding: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    height: "fit-content",
                }}
            >
                <Skeleton height={22} width="60%" />
                <Skeleton height={16} width="80%" style={{ marginTop: 12 }} />
                <Skeleton height={16} width="70%" />
                <Skeleton height={16} width="65%" />

                <Skeleton height={46} borderRadius={10} style={{ marginTop: 20 }} />
            </div>
        </div>
    );
};

export default CheckoutPaymentLoader;
