import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommonPageLoader = () => {
    return (
        <div style={{ padding: "20px", minHeight: "60vh" }}>
            {/* Page Title */}
            <Skeleton height={30} width="40%" />

            {/* Paragraph lines */}
            <Skeleton height={18} style={{ marginTop: 20 }} />
            <Skeleton height={18} />
            <Skeleton height={18} width="90%" />
            <Skeleton height={18} width="85%" />

            {/* Form / content block */}
            <Skeleton
                height={160}
                style={{ marginTop: 30, borderRadius: "12px" }}
            />

            {/* Button */}
            <Skeleton
                height={44}
                width="30%"
                style={{ marginTop: 20, borderRadius: "10px" }}
            />
        </div>
    );
};

export default CommonPageLoader;
