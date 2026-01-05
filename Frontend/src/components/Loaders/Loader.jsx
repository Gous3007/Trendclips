import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loader({ count = 6 }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}
        >
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        style={{
                            borderRadius: "12px",
                            padding: "14px",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                            background: "#fff",
                        }}
                    >
                        {/* Image */}
                        <Skeleton height={140} borderRadius={10} />

                        {/* Title */}
                        <Skeleton height={18} style={{ marginTop: 12 }} />
                        <Skeleton height={18} width="70%" />

                        {/* Price */}
                        <Skeleton height={20} width="40%" style={{ marginTop: 10 }} />

                        {/* Button */}
                        <Skeleton height={36} borderRadius={8} style={{ marginTop: 14 }} />
                    </div>
                ))}
        </div>
    );
}
