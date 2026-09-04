interface Product {
    id: number;
    image: string;
    brandName: string;
    manufacturer: string;
    price: number;
    description?: string;
    rating?: number;
}

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <div
            onClick={() => onClick(product)}
            className="
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl

                bg-[#f8f7f2]
                border
                border-white/20

                shadow-[0_4px_20px_rgba(0,0,0,0.08)]

                transition-all
                duration-300
                ease-out

                hover:-translate-y-1
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.18)]
            "
        >
            {/* ================= IMAGE ================= */}
            <div
                className="
                    relative
                    h-44
                    w-full
                    overflow-hidden
                    bg-white
                "
            >
                <img
                    src={product.image}
                    alt={product.brandName}
                    className="
                        h-full
                        w-full
                        object-contain

                        p-2

                        transition-all
                        duration-500
                        ease-out

                        group-hover:scale-105
                        group-hover:blur-[2px]
                        group-hover:brightness-75
                    "
                />

                {/* Small hover badge */}
                <div
                    className="
                        absolute
                        right-3
                        top-3

                        rounded-full
                        bg-white/90
                        px-2.5
                        py-1

                        text-[10px]
                        font-semibold
                        tracking-wide
                        text-[#183426]

                        shadow-sm

                        transition-all
                        duration-300

                        group-hover:opacity-0
                        group-hover:scale-90
                    "
                >
                    VIEW
                </div>
            </div>

            {/* ================= DEFAULT INFO ================= */}
            <div
                className="
                    relative
                    z-10
                    bg-[#f8f7f2]

                    px-4
                    py-3.5
                "
            >
                {/* Product Name */}
                <h3
                    className="
                        line-clamp-1
                        text-[16px]
                        font-semibold
                        leading-5
                        text-[#17231d]
                    "
                >
                    {product.brandName}
                </h3>

                {/* Manufacturer */}
                <p
                    className="
                        mt-1
                        line-clamp-1
                        text-[12px]
                        font-medium
                        text-gray-500
                    "
                >
                    {product.manufacturer}
                </p>

                {/* Bottom row */}
                <div
                    className="
                        mt-2.5
                        flex
                        items-center
                        justify-between
                    "
                >
                    {/* Price */}
                    <p
                        className="
                            text-[17px]
                            font-bold
                            tracking-tight
                            text-[#183426]
                        "
                    >
                        ₹{product.price.toFixed(2)}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                        <div
                            className="
                                flex
                                items-center
                                gap-1
                                rounded-md
                                bg-[#e8eee9]
                                px-2
                                py-1
                            "
                        >
                            <span className="text-[11px]">★</span>

                            <span
                                className="
                                    text-[11px]
                                    font-semibold
                                    text-[#183426]
                                "
                            >
                                {product.rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= HOVER PANEL ================= */}
            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    z-20

                    min-h-[185px]

                    rounded-t-2xl

                    border-t
                    border-white/20

                    bg-[#001c12]/90
                     backdrop-blur-md

                    px-4
                    py-4

                    text-white

                    shadow-[0_-8px_30px_rgba(0,0,0,0.15)]

                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    translate-y-full

                    group-hover:translate-y-0
                "
            >
                {/* Panel Header */}
                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-3
                    "
                >
                    <div>
                        <h3
                            className="
                                line-clamp-1
                                text-[20px]
                                font-semibold
                                text-[#55d979]
                            "
                        >
                            {product.brandName}
                        </h3>

                        <p
                            className="
                                mt-0.5
                                text-[11px]
                                text-white/60
                            "
                        >
                            {product.manufacturer}
                        </p>
                    </div>

                    <p
                        className="
                            shrink-0
                            text-[16px]
                            font-bold
                        "
                    >
                        ₹{product.price.toFixed(2)}
                    </p>
                </div>

                {/* Description */}
                <p
                    className="
                        mt-3
                        line-clamp-2
                        text-[12px]
                        leading-5
                        text-white/75
                    "
                >
                    {product.description ||
                        "Premium quality product designed to support healthy plant growth and everyday gardening needs."}
                </p>

                {/* Rating */}
                {product.rating && (
                    <div
                        className="
                            mt-2
                            flex
                            items-center
                            gap-1
                            text-[11px]
                            text-white/80
                        "
                    >
                        <span>★</span>
                        <span>
                            {product.rating.toFixed(1)} / 5
                        </span>
                    </div>
                )}

                {/* Buttons */}
                <div
                    className="
                        mt-4
                        flex
                        gap-2
                    "
                >
                    {/* View Details */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(product);
                        }}
                        className="
                            flex-1

                            rounded-3xl
                            border
                            border-[#55d979]
                            bg-white/10
                            text-[#55d979]

                            px-3
                            py-2

                            text-[11px]
                            font-semibold
                           

                            backdrop-blur-sm

                            transition-all
                            duration-200

                            hover:bg-white/20
                        "
                    >
                        View Details
                    </button>

                    {/* Add To Cart */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();

                            // Add your cart logic here
                            console.log(
                                "Add to cart:",
                                product
                            );
                        }}
                        className="
                            flex-1

                            rounded-3xl
                            bg-[#f1eee4]

                            px-3
                            py-2

                            text-[11px]
                            font-bold
                            text-[#183426]

                            transition-all
                            duration-200

                            hover:scale-[1.02]
                            hover:bg-white
                        "
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;