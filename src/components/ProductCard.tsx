interface Product {
    id: number;
    image: string;
    brandName: string;
    manufacturer: string;
    price: number;
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
                cursor-pointer
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-gray-200
                shadow-sm

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            {/* Product Image */}
            <div className="w-full h-52 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.brandName}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Product Information */}
            <div className="p-4">

                {/* Brand Name */}
                <h3 className="text-lg font-semibold text-gray-900">
                    {product.brandName}
                </h3>

                {/* Manufacturer */}
                <p className="mt-1 text-sm text-gray-500">
                    {product.manufacturer}
                </p>

                {/* Price */}
                <p className="mt-3 text-lg font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                </p>

            </div>
        </div>
    );
};

export default ProductCard;