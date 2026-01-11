const ProductSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">

        <div className="bg-gray-200 h-[420px] rounded-xl" />

        <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />

            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <div className="h-10 bg-gray-200 rounded-xl w-40" />
        </div>

    </div>
);

export default ProductSkeleton;
