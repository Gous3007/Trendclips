import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPaymentLoader = () => {
    return (
        <div
            style={{
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "24px",
            }}
        >
            {/* LEFT: Cart Items */}
            <div>
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            gap: "16px",
                            padding: "14px",
                            minHeight: "70vh",   // 👈 ADD THIS
                            marginBottom: "16px",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                        }}
                    >
                        {/* Product Image */}
                        <Skeleton width={90} height={90} borderRadius={10} />

                        {/* Product Details */}
                        <div style={{ flex: 1 }}>
                            <Skeleton height={18} width="70%" />
                            <Skeleton height={14} width="40%" />
                            <Skeleton height={14} width="30%" />
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Payment Summary */}
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

                <Skeleton height={42} borderRadius={10} style={{ marginTop: 20 }} />
            </div>
        </div>
    );
};

export default CartPaymentLoader;
