import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const products = [
    {
        id: 1,
        image: "/images/fertilizer1.png",
        brandName: "Plant Power",
        manufacturer: "GreenGrow Industries",
        price: 399,
        description:
            "A balanced fertilizer designed for healthy roots, greener leaves, and stronger plant growth.",
    },
    {
        id: 2,
        image: "/images/fertilizer2.png",
        brandName: "GrowMax",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 499,
        description:
            "A plant nutrition formula that helps improve growth and supports healthy foliage.",
    },
    {
        id: 3,
        image: "/images/fertilizer6.png",
        brandName: "Organic Bloom",
        manufacturer: "Green Earth Organics",
        price: 349,
        description:
            "An organic fertilizer formulated to support flowering plants and healthier blooms.",
    },
    {
        id: 4,
        image: "/images/fertilizer4.png",
        brandName: "PlantCare Plus",
        manufacturer: "NatureGrow Labs",
        price: 449,
        description:
            "A complete plant-care fertilizer suitable for everyday garden nutrition.",
    },
];

const bestSellers = [
    {
        id: 5,
        image: "/images/fertilizer5.png",
        brandName: "Green Boost",
        manufacturer: "GreenGrow Industries",
        price: 599,
        description:
            "A powerful plant fertilizer that provides essential nutrients for stronger roots, greener leaves, and healthy overall growth.",
    },

    {
        id: 6,
        image: "/images/fertilizer3.png",
        brandName: "Root Power",
        manufacturer: "Organic Earth",
        price: 449,
        description:
            "A root-focused fertilizer designed to encourage stronger root development and improve nutrient absorption.",
    },

    {
        id: 7,
        image: "/images/fertilizer7.png",
        brandName: "Plant Vital",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 529,
        description:
            "A complete plant nutrition formula that supports healthy foliage, balanced growth, and stronger plants.",
    },

    {
        id: 8,
        image: "/images/fertilizer8.png",
        brandName: "Bloom Pro",
        manufacturer: "Green Earth Organics",
        price: 699,
        description:
            "A specialized fertilizer formulated to support flowering plants and promote healthy, vibrant blooms.",
    },
];

const heroSlides = [
    {
        image: "/images/fertilizer-hero3.png",
        eyebrow: "Natural Plant Nutrition",
        title: "Grow Better.",
        title2: "Grow Naturally.",
        description:
            "Discover premium fertilizers and plant nutrition products made to help your plants grow stronger, healthier and greener.",
    },
    {
        image: "/images/fertilizer-hero2.png",
        eyebrow: "Organic Plant Care",
        title: "Feed Your Plants.",
        title2: "Naturally.",
        description:
            "Give your plants the nutrients they need with carefully selected organic fertilizers.",
    },
    {
        image: "/images/fertilizer-hero1.png",
        eyebrow: "Better Growth",
        title: "Healthier Plants.",
        title2: "Better Harvests.",
        description:
            "Premium plant nutrition products designed for stronger and healthier growth.",
    },
];

const Store = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsSliding(true);

            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
                setIsSliding(false);
            }, 700);
        }, 8000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="min-h-screen bg-[#0b2419] text-[#f4f1e8]">

            <Navbar />


            {/* ==============Hero Section================================================================ */}


            <section
                className="
        relative
        min-h-[600px]
        flex
        items-center
        overflow-hidden
    "
            >
                {/* Current image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${heroSlides[currentSlide].image}')`,
                    }}
                />

                {/* New image comes from RIGHT → LEFT */}
                <div
                    className={`
        absolute inset-0 bg-cover bg-center
        ${isSliding ? "transition-transform duration-700 ease-in-out translate-x-0" : "translate-x-full"}
    `}
                    style={{
                        backgroundImage: `url('${heroSlides[(currentSlide + 1) % heroSlides.length].image
                            }')`,
                    }}
                />

                {/* Dark overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-[#071c14]/95
                        via-[#0b2419]/50
                        to-[#0b2419]/1
                    "
                />

                {/* Hero content */}
                <div
                    className="
                        relative
                        z-10
                        w-full
                        max-w-6xl
                        mx-auto
                        px-6
                        lg:px-10
                        py-15
                        mt-24
                    "
                >

                    <div className="max-w-xl">

                        <p
                            className="
                                mb-4
                                text-sm
                                uppercase
                                tracking-[0.25em]
                                text-[#c8d5bd]
                            "
                        >
                            Natural Plant Nutrition
                        </p>

                        <h1
                            className="
                                text-5xl
                                md:text-6xl
                                lg:text-7xl
                                font-bold
                                leading-[0.95]
                                tracking-tight
                            "
                        >
                            Grow Better.
                            <br />
                            Grow Naturally.
                        </h1>

                        <p
                            className="
                                mt-7
                                max-w-md
                                text-lg
                                leading-relaxed
                                text-[#d6ddd2]
                            "
                        >
                            Discover premium fertilizers and plant
                            nutrition products made to help your plants
                            grow stronger, healthier and greener.
                        </p>

                        <button
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-3
                                rounded-lg
                                border
                                border-[#879d8c]
                                bg-[#173c2b]/80
                                px-7
                                py-3.5
                                text-base
                                font-semibold
                                backdrop-blur-sm
                                transition-all
                                duration-300
                                hover:bg-[#24533d]
                                hover:scale-[1.03]
                            "
                        >
                            Shop Fertilizers
                            <span className="text-xl">›</span>
                        </button>

                    </div>

                </div>

            </section>


            {/* ==============MAIN CONTENT================================================================= */}

            <main
                className="
                    w-full
                    max-w-6xl
                    mx-auto
                    px-6
                    lg:px-10
                    pb-20
                "
            >


                {/* =================================================
                    CATEGORIES SECTION
                ================================================== */}

                <section className="pt-20">

                    {/* Section heading */}

                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            md:items-end
                            md:justify-between
                            gap-6
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-4xl
                                    md:text-5xl
                                    font-bold
                                    tracking-tight
                                "
                            >
                                Explore Our Categories
                            </h2>

                            <p
                                className="
                                    mt-4
                                    max-w-xl
                                    text-[#b9c7bc]
                                    leading-relaxed
                                "
                            >
                                Find the right nutrition for every plant.
                                From organic fertilizers to specialized
                                plant boosters, we have what your garden needs.
                            </p>

                        </div>


                        <button
                            className="
                                self-start
                                md:self-auto
                                flex
                                items-center
                                gap-3
                                rounded-lg
                                border
                                border-[#516b5c]
                                bg-[#173628]
                                px-6
                                py-3
                                font-semibold
                                transition
                                duration-300
                                hover:bg-[#224b37]
                            "
                        >
                            Shop All
                            <span className="text-xl">›</span>
                        </button>

                    </div>


                    {/* Category tabs */}

                    <div
                        className="
                            flex
                            flex-wrap
                            gap-3
                            mt-7
                        "
                    >

                        <button
                            className="
                                rounded-md
                                border
                                border-[#718674]
                                bg-[#345542]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                            "
                        >
                            Organic Fertilizers
                        </button>

                        <button
                            className="
                                rounded-md
                                border
                                border-[#465e50]
                                bg-[#193628]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#d2dbd3]
                                transition
                                hover:bg-[#294a38]
                            "
                        >
                            Liquid Fertilizers
                        </button>

                        <button
                            className="
                                rounded-md
                                border
                                border-[#465e50]
                                bg-[#193628]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#d2dbd3]
                                transition
                                hover:bg-[#294a38]
                            "
                        >
                            Granular Fertilizers
                        </button>

                        <button
                            className="
                                rounded-md
                                border
                                border-[#465e50]
                                bg-[#193628]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#d2dbd3]
                                transition
                                hover:bg-[#294a38]
                            "
                        >
                            Plant Boosters
                        </button>

                        <button
                            className="
                                rounded-md
                                border
                                border-[#465e50]
                                bg-[#193628]
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-[#d2dbd3]
                                transition
                                hover:bg-[#294a38]
                            "
                        >
                            All
                        </button>

                    </div>


                    {/* Product cards */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-5
                            mt-8
                        "
                    >

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={(product) => {
                                    setSelectedProduct(product);
                                }}
                            />
                        ))}

                    </div>

                </section>


                {/* =================================================
                    BEST SELLERS
                ================================================== */}

                <section className="pt-24">

                    <div>

                        <h2
                            className="
                                text-4xl
                                md:text-5xl
                                font-bold
                                tracking-tight
                            "
                        >
                            Best Sellers
                        </h2>

                        <p
                            className="
                                mt-4
                                max-w-xl
                                text-[#b9c7bc]
                                leading-relaxed
                            "
                        >
                            Give your plants the nutrition they need.
                            Explore our most popular fertilizers and
                            plant care essentials.
                        </p>

                    </div>


                    {/* Best seller products */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-5
                            mt-8
                        "
                    >

                        {bestSellers.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={(product) => {
                                    setSelectedProduct(product);
                                }}
                            />
                        ))}

                    </div>

                </section>


                {/* =================================================
                    PROMOTIONAL BANNER
                ================================================== */}

                <section className="pt-24">

                    <div
                        className="
                            relative
                            min-h-[300px]
                            rounded-2xl
                            overflow-hidden
                            border
                            border-[#4b6555]
                            bg-cover
                            bg-center
                        "
                        style={{
                            backgroundImage:
                                "url('/images/fertilizer-banner.jpg')",
                        }}
                    >

                        {/* Overlay */}

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-[#071c14]/95
                                via-[#102c20]/75
                                to-transparent
                            "
                        />

                        {/* Banner content */}

                        <div
                            className="
                                relative
                                z-10
                                flex
                                items-center
                                min-h-[300px]
                                px-8
                                md:px-12
                            "
                        >

                            <div className="max-w-xl">

                                <h2
                                    className="
                                        text-3xl
                                        md:text-4xl
                                        font-bold
                                        leading-tight
                                    "
                                >
                                    Give Your Plants
                                    <br />
                                    The Perfect Boost
                                </h2>

                                <p
                                    className="
                                        mt-4
                                        text-[#d1d9d2]
                                        max-w-md
                                    "
                                >
                                    Premium plant nutrition for healthier
                                    roots, greener leaves and beautiful blooms.
                                </p>

                                <button
                                    className="
                                        mt-6
                                        inline-flex
                                        items-center
                                        gap-3
                                        rounded-lg
                                        bg-[#f1eee4]
                                        px-6
                                        py-3
                                        font-semibold
                                        text-[#183426]
                                        transition
                                        duration-300
                                        hover:scale-[1.03]
                                        hover:bg-white
                                    "
                                >
                                    Shop Now
                                    <span className="text-xl">›</span>
                                </button>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    TIPS & GUIDES
                ================================================== */}

                <section className="pt-24">

                    <div>

                        <h2
                            className="
                                text-4xl
                                md:text-5xl
                                font-bold
                                tracking-tight
                            "
                        >
                            Tips & Guides
                        </h2>

                        <p
                            className="
                                mt-4
                                text-[#b9c7bc]
                                max-w-xl
                            "
                        >
                            Learn how to choose and use the right
                            fertilizer to keep your plants thriving.
                        </p>

                    </div>


                    {/* Guide cards */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-5
                            mt-8
                        "
                    >

                        {/* Guide 1 */}

                        <div
                            className="
                                group
                                cursor-pointer
                                rounded-2xl
                                overflow-hidden
                                border
                                border-[#405849]
                                bg-[#173628]
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#68806f]
                            "
                        >

                            <div className="h-48 overflow-hidden">

                                <img
                                    src="/images/guide1.jpg"
                                    alt="Choosing fertilizer"
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

                            <div className="p-5">

                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#91aa98]
                                    "
                                >
                                    Fertilizer Guide
                                </p>

                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                    "
                                >
                                    How to Choose the Right Fertilizer
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-[#aebdb2]
                                    "
                                >
                                    Understand NPK and choose the
                                    right nutrition for your plants.
                                </p>

                            </div>

                        </div>


                        {/* Guide 2 */}

                        <div
                            className="
                                group
                                cursor-pointer
                                rounded-2xl
                                overflow-hidden
                                border
                                border-[#405849]
                                bg-[#173628]
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#68806f]
                            "
                        >

                            <div className="h-48 overflow-hidden">

                                <img
                                    src="/images/guide2.jpg"
                                    alt="Plant growth"
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

                            <div className="p-5">

                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#91aa98]
                                    "
                                >
                                    Plant Care
                                </p>

                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                    "
                                >
                                    How Often Should You Fertilize?
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-[#aebdb2]
                                    "
                                >
                                    Learn when and how often your
                                    plants need additional nutrients.
                                </p>

                            </div>

                        </div>


                        {/* Guide 3 */}

                        <div
                            className="
                                group
                                cursor-pointer
                                rounded-2xl
                                overflow-hidden
                                border
                                border-[#405849]
                                bg-[#173628]
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#68806f]
                            "
                        >

                            <div className="h-48 overflow-hidden">

                                <img
                                    src="/images/guide3.jpg"
                                    alt="Healthy plants"
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

                            <div className="p-5">

                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-wider
                                        text-[#91aa98]
                                    "
                                >
                                    Plant Nutrition
                                </p>

                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                    "
                                >
                                    Signs Your Plant Needs Nutrients
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        text-[#aebdb2]
                                    "
                                >
                                    Spot common signs of nutrient
                                    deficiency before they become serious.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


            </main>
            {/* ================= PRODUCT DETAILS POPUP ================= */}

            {selectedProduct && (
                <div
                    className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            backdrop-blur-sm
            px-4
        "
                    onClick={() => {
                        setSelectedProduct(null);
                        setQuantity(1);
                    }}
                >

                    {/* Popup */}
                    <div
                        className="
                relative
                w-full
                max-w-2xl
                overflow-hidden
                rounded-2xl
                border
                border-[#405849]
                bg-[#173628]
                shadow-2xl
            "
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setSelectedProduct(null);
                                setQuantity(1);
                            }}
                            className="
                    absolute
                    right-4
                    top-4
                    z-10
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-black/40
                    text-xl
                    text-white
                    transition
                    hover:bg-black/70
                "
                        >
                            ×
                        </button>


                        {/* Product Image */}
                        <div className="h-70 w-full overflow-hidden mt-1">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.brandName}
                                className="h-full w-full object-contain"
                            />
                        </div>


                        {/* Product Details */}
                        <div className="px-7 py-2">

                            {/* Category */}



                            {/* Product Name + Rating */}
                            <div className="mt-2 flex items-center gap-4">

                                {/* Product Name */}
                                <h2 className="text-3xl font-bold text-white">
                                    {selectedProduct.brandName}
                                </h2>

                                {/* Rating */}
                                <div className="flex items-center gap-2">

                                    <div className="text-lg text-yellow-400 pt-2">
                                        ★★★★★
                                    </div>

                                    <span className="text-sm text-[#c2cec5] pt-2">
                                        4.5
                                    </span>

                                </div>

                            </div>


                            {/* Manufacturer */}
                            <p className="mt-2 text-sm text-[#aebdb2]">
                                Manufactured by {selectedProduct.manufacturer}
                            </p>


                            {/* Description */}
                            <p className="mt-2 leading-relaxed text-[#d1d9d2]">
                                {selectedProduct.description}
                            </p>


                            {/* Price Section */}
                            <div className="mt-3">

                                {/* Weight */}
                                <p className="text-sm font-medium text-[#aebdb2]">
                                    1 kg
                                </p>


                                {/* MRP + Main Price */}
                                <div className="mt-1 flex items-center gap-3">



                                    <span className="text-2xl font-bold text-white">
                                        ₹
                                        {(selectedProduct.price * quantity).toFixed(2)}
                                    </span>

                                    <span className="text-sm text-[#91aa98] pt-2">
                                        MRP
                                    </span>

                                    <span className="text-sm text-[#91aa98] line-through ml-[-6px] pt-2">
                                        ₹521
                                    </span>

                                </div>


                                {/* Free Delivery */}
                                <p className="mt-2 text-sm font-medium text-green-300">
                                    ✓ Free Delivery
                                </p>

                            </div>


                            {/* Quantity + Buttons */}
                            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* Quantity Meter */}
                                <div>


                                    <div
                                        className="
                                flex
                                items-center
                                rounded-lg
                                border
                                border-[#506b5b]
                                bg-[#10291e]
                            "
                                    >

                                        {/* Minus */}
                                        <button
                                            onClick={() =>
                                                setQuantity((prev) =>
                                                    Math.max(1, prev - 1)
                                                )
                                            }
                                            disabled={quantity === 1}
                                            className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    text-xl
                                    text-white
                                    transition
                                    hover:bg-[#294b39]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                                        >
                                            −
                                        </button>


                                        {/* Quantity */}
                                        <span className="flex h-10 w-10 items-center justify-center font-semibold text-white">
                                            {quantity}
                                        </span>


                                        {/* Plus */}
                                        <button
                                            onClick={() =>
                                                setQuantity((prev) =>
                                                    Math.min(5, prev + 1)
                                                )
                                            }
                                            disabled={quantity === 5}
                                            className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    text-xl
                                    text-white
                                    transition
                                    hover:bg-[#294b39]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-40
                                "
                                        >
                                            +
                                        </button>

                                    </div>


                                </div>


                                {/* Buttons */}
                                <div className="flex gap-3">

                                    {/* Add to Cart */}
                                    <button
                                        className="
                                rounded-lg
                                border
                                border-[#718674]
                                bg-[#224b37]
                                px-5
                                py-3
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#2d5c43]
                                hover:scale-[1.03]
                            "
                                    >
                                        Add to Cart
                                    </button>


                                    {/* Buy */}
                                    <button
                                        className="
                                rounded-lg
                                bg-[#f1eee4]
                                px-7
                                py-3
                                font-semibold
                                text-[#183426]
                                transition
                                hover:scale-[1.03]
                                hover:bg-white
                            "
                                    >
                                        Buy
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </div>

    );
};

export default Store;