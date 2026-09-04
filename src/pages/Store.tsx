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
        category: "Organic Fertilizers",
        description:
            "A balanced fertilizer designed for healthy roots, greener leaves, and stronger plant growth. It provides essential nutrients to support overall plant health and improve everyday garden performance.",
    },

    {
        id: 2,
        image: "/images/fertilizer2.png",
        brandName: "GrowMax",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 499,
        category: "Liquid Fertilizers",
        description:
            "A plant nutrition formula that helps improve growth and supports healthy foliage. Its balanced nutrients help plants develop stronger roots, maintain vibrant leaves, and grow consistently.",
    },

    {
        id: 3,
        image: "/images/fertilizer6.png",
        brandName: "Organic Bloom",
        manufacturer: "Green Earth Organics",
        price: 349,
        category: "Organic Fertilizers",
        description:
            "An organic fertilizer formulated to support flowering plants and healthier blooms. It helps provide essential nutrients for steady growth, stronger plants, and vibrant-looking flowers.",
    },

    {
        id: 4,
        image: "/images/fertilizer4.png",
        brandName: "PlantCare Plus",
        manufacturer: "NatureGrow Labs",
        price: 449,
        category: "Granular Fertilizers",
        description:
            "A complete plant-care fertilizer suitable for everyday garden nutrition. It supports healthy roots, greener foliage, and balanced plant development for a wide variety of garden plants.",
    },


    {
        id: 5,
        image: "/images/fertilizer9.png",
        brandName: "Nature Rich",
        manufacturer: "Organic Earth",
        price: 429,
        category: "Organic Fertilizers",
        description:
            "A natural plant fertilizer enriched with organic nutrients to support healthy roots and steady growth. It helps improve soil quality while providing gentle and balanced nutrition for plants.",
    },

    {
        id: 6,
        image: "/images/fertilizer10.png",
        brandName: "Pure Grow",
        manufacturer: "Green Valley Organics",
        price: 379,
        category: "Organic Fertilizers",
        description:
            "An organic plant nutrition formula designed to improve soil health and encourage stronger plant development. It provides natural nutrients that support greener foliage and healthier growth.",
    },

    {
        id: 7,
        image: "/images/fertilizer11.png",
        brandName: "Aqua Feed",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 459,
        category: "Liquid Fertilizers",
        description:
            "A fast-acting liquid fertilizer designed for easy application and quick nutrient absorption. It supports healthy foliage, stronger roots, and consistent plant growth throughout the growing season.",
    },

    {
        id: 8,
        image: "/images/fertilizer12.png",
        brandName: "Liquid Green",
        manufacturer: "GreenGrow Industries",
        price: 529,
        category: "Liquid Fertilizers",
        description:
            "A concentrated liquid plant food formulated to provide balanced nutrition for everyday plant care. It helps maintain vibrant leaves, healthy roots, and strong overall plant development.",
    },

    {
        id: 9,
        image: "/images/fertilizer13.png",
        brandName: "Green Drops",
        manufacturer: "PlantLife Organics",
        price: 399,
        category: "Liquid Fertilizers",
        description:
            "A nutrient-rich liquid fertilizer that helps plants receive essential nutrients efficiently. It is suitable for regular plant care and supports healthy foliage, root development, and steady growth.",
    },

    {
        id: 10,
        image: "/images/fertilizer14.png",
        brandName: "Granule Grow",
        manufacturer: "NatureGrow Labs",
        price: 479,
        category: "Granular Fertilizers",
        description:
            "A slow-release granular fertilizer designed to provide plants with steady nutrition over time. It supports stronger roots, greener leaves, and balanced growth with easy soil application.",
    },

    {
        id: 11,
        image: "/images/fertilizer15.png",
        brandName: "Soil Boost",
        manufacturer: "Green Earth Organics",
        price: 549,
        category: "Granular Fertilizers",
        description:
            "A high-quality granular fertilizer formulated to improve plant nutrition and support healthy soil. Its balanced nutrients help encourage strong roots and consistent growth across the garden.",
    },

    {
        id: 12,
        image: "/images/fertilizer16.png",
        brandName: "Garden Granules",
        manufacturer: "GreenGrow Industries",
        price: 499,
        category: "Granular Fertilizers",
        description:
            "A versatile granular fertilizer suitable for a variety of garden plants. It delivers essential nutrients gradually to support healthy roots, vibrant foliage, and stronger plant development.",
    },

    {
        id: 13,
        image: "/images/fertilizer17.png",
        brandName: "Plant Boost",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 449,
        category: "Plant Boosters",
        description:
            "A specialized plant booster designed to support vigorous growth and overall plant strength. It provides additional nutrition to help plants develop healthier roots and greener foliage.",
    },

    {
        id: 14,
        image: "/images/fertilizer18.png",
        brandName: "Growth Plus",
        manufacturer: "Organic Earth",
        price: 579,
        category: "Plant Boosters",
        description:
            "A powerful plant booster formulated to support stronger and more active plant growth. It helps improve overall plant vitality and provides additional nutrients during important growth stages.",
    },

    {
        id: 15,
        image: "/images/fertilizer19.png",
        brandName: "Green Vital",
        manufacturer: "Green Valley Organics",
        price: 519,
        category: "Plant Boosters",
        description:
            "A complete plant booster that supports healthy foliage, stronger roots, and balanced development. It is ideal for giving plants an additional nutritional boost when they need extra support.",
    },

    {
        id: 16,
        image: "/images/fertilizer20.png",
        brandName: "Bloom Boost",
        manufacturer: "PlantLife Organics",
        price: 629,
        category: "Plant Boosters",
        description:
            "A specialized booster designed to support flowering and overall plant vitality. It provides additional nutrients to encourage healthy development and help plants produce vibrant, healthy blooms.",
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
            "A powerful plant fertilizer that provides essential nutrients for stronger roots, greener leaves, and healthy overall growth. It is designed to support vigorous plant development and improve everyday plant nutrition.",
    },

    {
        id: 6,
        image: "/images/fertilizer3.png",
        brandName: "Root Power",
        manufacturer: "Organic Earth",
        price: 449,
        description:
            "A root-focused fertilizer designed to encourage stronger root development and improve nutrient absorption. It helps plants establish a healthy foundation while supporting steady and balanced growth.",
    },

    {
        id: 7,
        image: "/images/fertilizer7.png",
        brandName: "Plant Vital",
        manufacturer: "NatureCare Pvt. Ltd.",
        price: 529,
        description:
            "A complete plant nutrition formula that supports healthy foliage, balanced growth, and stronger plants. It provides essential nutrients to help maintain vibrant leaves and overall plant vitality.",
    },

    {
        id: 8,
        image: "/images/fertilizer8.png",
        brandName: "Bloom Pro",
        manufacturer: "Green Earth Organics",
        price: 699,
        description:
            "A specialized fertilizer formulated to support flowering plants and promote healthy, vibrant blooms. It provides balanced nutrition to encourage strong plant development and beautiful flowering.",
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
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAllProducts, setShowAllProducts] = useState(false);

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


    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) => product.category === selectedCategory
            );

    const displayedProducts =
        selectedCategory === "All" && !showAllProducts
            ? filteredProducts.slice(0, 8)
            : filteredProducts;

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
                                rounded-3xl
                                border
                                border-[#55d979]
                                bg-[#173c2b]/80
                                px-7
                                py-3.5
                                text-base
                                text-[#55d979]
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


                {/* =============CATEGORIES SECTION================================================== */}

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



                    </div>


                    {/* Category tabs */}

                    <div className="flex flex-wrap gap-3 mt-7">

                        {[
                            "Organic Fertilizers",
                            "Liquid Fertilizers",
                            "Granular Fertilizers",
                            "Plant Boosters",
                            "All",
                        ].map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);

                                    // If user selects All, show all 16
                                    if (category === "All") {
                                        setShowAllProducts(true);
                                    }
                                }}
                                className={`
                rounded-3xl
                border
                
                px-5
                py-2.5
                text-sm
                font-medium
                transition
                duration-300
                

                ${selectedCategory === category
                                        ? `
                            border-[#55d979]
                            bg-[#345542]
                            text-[#55d979]
                          `
                                        : `
                            border-[#465e50]
                            bg-[#193628]
                            text-[#d2dbd3]
                            hover:bg-[#294a38]
                          `
                                    }
            `}
                            >
                                {category}
                            </button>
                        ))}

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
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setSelectedCategory("All");
                            setShowAllProducts((prev) => !prev);
                        }}
                        className="
                                mx-auto
                                mt-8
                                flex
                                items-center
                                gap-3
                                rounded-3xl
                                border
                                border-[#55d979]
                                bg-[#173628]
                                text-[#55d979]
                                px-6
                                py-3
                                font-semibold
                                transition
                                duration-300
                                hover:bg-[#224b37]
                            "
                    >
                        {showAllProducts ? "See Less" : "See More"}

                        <span className="text-xl">
                            {showAllProducts ? "↑" : "↓"}
                        </span>
                    </button>

                </section>



                {/* =================================================
                    PREMIUM SECTION TRANSITION
                ================================================== */}

                <div
                    className="
                        relative
                        flex
                        items-center
                        justify-center

                        h-32
                        md:h-36

                        overflow-hidden
                    "
                >

                    {/* Left decorative line */}
                    <div
                        className="
                            absolute
                            left-0
                            right-1/2
                            mr-12
                            top-1/2
                            h-px

                            bg-gradient-to-r
                            from-transparent
                            via-[#496b58]
                            to-[#496b58]

                            opacity-60
                        "
                    />

                    {/* Right decorative line */}
                    <div
                        className="
                            absolute
                            left-1/2
                            right-0
                            ml-12
                            top-1/2
                            h-px

                            bg-gradient-to-l
                            from-transparent
                            via-[#496b58]
                            to-[#496b58]

                            opacity-60
                        "
                    />

                    {/* Soft center glow */}
                    <div
                        className="
                            absolute
                            left-1/2
                            top-1/2

                            h-28
                            w-72

                            -translate-x-1/2
                            -translate-y-1/2

                            rounded-full

                            bg-[#2d6848]/10
                            blur-3xl

                            pointer-events-none
                        "
                    />

                    {/* Center element */}
                    <div
                        className="
                            relative
                            z-10

                            flex
                            flex-col
                            items-center
                            justify-center

                            px-6
                            bg-[#0b2d20]
                        "
                    >

                        {/* Small decorative mark */}
                        <div
                            className="
                                mb-2
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <span
                                className="
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-[#55d979]
                                "
                            />

                            <span
                                className="
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-[0.35em]
                                    text-[#72907d]
                                "
                            >
                                Rooted in Nature
                            </span>

                            <span
                                className="
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-[#55d979]
                                "
                            />
                        </div>

                        {/* Main decorative symbol */}
                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    h-px
                                    w-8
                                    bg-[#55d979]/50
                                "
                            />

                            <span
                                className="
                                    text-sm
                                    text-[#55d979]
                                "
                            >
                                ✦
                            </span>

                            <span
                                className="
                                    h-px
                                    w-8
                                    bg-[#55d979]/50
                                "
                            />
                        </div>

                    </div>

                </div>



                {/* ==================== BEST SELLERS==================== */}

                <section className="pt-1">

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
                            min-h-[350px]
                            rounded-2xl
                            overflow-hidden
                            border
                            border-[#4b6555]
                           bg-[length:100%_115%]
                            bg-center
                            bg-no-repeat
                        "
                        style={{
                            backgroundImage:
                                "url('/images/fertilizer-banner.png')",
                        }}
                    >

                        {/* Overlay */}

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-r
                                from-[#071c14]/95
                                via-[#102c20]/5
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
                                    onClick={() => setSelectedProduct(bestSellers[1])}
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
                                relative
                                w-full
                                h-64
                                sm:h-72
                                md:h-80
                                lg:h-84

                                cursor-pointer
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#405849]
                                bg-[#173628]

                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#68806f]
                            "
                        >
                            {/* Background Image */}
                            <img
                                src="/images/guide1.png"
                                alt="Choosing fertilizer"
                                className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
        "
                            />

                            {/* Dark overlay */}
                            <div
                                className="
            absolute
            inset-0
            bg-black/10
            transition-all
            duration-500
            group-hover:bg-black/30
        "
                            />

                            {/* Glass Text Panel */}
                            <div
                                className="
        absolute
        inset-x-0
        bottom-0
        z-10
        h-full
        p-4

        bg-[#001c12]/90
        backdrop-blur-md

        transition-transform
        duration-500
        ease-in-out

        translate-y-[calc(100%-90px)]
        group-hover:translate-y-0
    "
                            >
                                {/* Category */}
                                <p
                                    className="
            text-[10px]
            font-medium
            uppercase
            tracking-wide
            text-[#19a85b]
        "
                                >
                                    Fertilizer Guide
                                </p>

                                {/* Heading */}
                                <h3
                                    className="
            mt-1
            text-[24px]
            font-bold
            leading-[1.05]
            text-white
        "
                                >
                                    How to Choose
                                    <br />
                                    Right Fertilizer
                                </h3>

                                {/* Steps */}
                                <div className="mt-12 space-y-6">
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            1
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Check the NPK ratio on the fertilizer label.
                                        </p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            2
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Choose the NPK ratio based on your plant's needs.
                                        </p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            3
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Use the recommended amount—avoid over-fertilizing.
                                        </p>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            4
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Apply the fertilizer evenly around the plant.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Guide 2 */}

                        <div
                            className="
        group
        relative
        w-full
        h-64
        sm:h-72
        md:h-80
        lg:h-84

        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-[#405849]
        bg-[#173628]

        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#68806f]
    "
                        >
                            {/* Background Image */}
                            <img
                                src="/images/guide2.png"
                                alt="Plant growth"
                                className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
        "
                            />

                            {/* Dark overlay */}
                            <div
                                className="
            absolute
            inset-0
            bg-black/10
            transition-all
            duration-500
            group-hover:bg-black/30
        "
                            />

                            {/* Glass Text Panel */}
                            <div
                                className="
        absolute
        inset-x-0
        bottom-0
        z-10
        h-full
        p-4

        bg-[#001c12]/90
        backdrop-blur-md

        transition-transform
        duration-500
        ease-in-out

        translate-y-[calc(100%-90px)]
        group-hover:translate-y-0
    "
                            >
                                {/* Category */}
                                <p
                                    className="
            text-[10px]
            font-medium
            uppercase
            tracking-wide
            text-[#19a85b]
        "
                                >
                                    Plant Care
                                </p>

                                {/* Heading */}
                                <h3
                                    className="
            mt-1
            text-[24px]
            font-bold
            leading-[1.05]
            text-white
        "
                                >
                                    How Often Should
                                    <br />
                                    You Fertilize?
                                </h3>

                                {/* Steps */}
                                <div className="mt-12 space-y-6">

                                    {/* Step 1 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            1
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Check your plant's growth stage and condition.
                                        </p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            2
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Follow the recommended fertilizing schedule.
                                        </p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            3
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Reduce feeding during slow or dormant growth.
                                        </p>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            4
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Avoid over-fertilizing, as it can harm the plant.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* Guide 3 */}

                        <div
                            className="
        group
        relative
        w-full
        h-64
        sm:h-72
        md:h-80
        lg:h-84

        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        border-[#405849]
        bg-[#173628]

        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#68806f]
    "
                        >
                            {/* Background Image */}
                            <img
                                src="/images/guide3.png"
                                alt="Healthy plants"
                                className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
            group-hover:blur-sm
        "
                            />

                            {/* Dark overlay */}
                            <div
                                className="
            absolute
            inset-0
            bg-black/10
            transition-all
            duration-500
            group-hover:bg-black/30
        "
                            />

                            {/* Glass Text Panel */}
                            <div
                                className="
        absolute
        inset-x-0
        bottom-0
        z-10
        h-full
        p-4

        bg-[#001c12]/90
        backdrop-blur-md

        transition-transform
        duration-500
        ease-in-out

        translate-y-[calc(100%-90px)]
        group-hover:translate-y-0
    "
                            >
                                {/* Category */}
                                <p
                                    className="
            text-[10px]
            font-medium
            uppercase
            tracking-wide
            text-[#19a85b]
        "
                                >
                                    Plant Nutrition
                                </p>

                                {/* Heading */}
                                <h3
                                    className="
            mt-1
            text-[24px]
            font-bold
            leading-[1.05]
            text-white
        "
                                >
                                    Signs Your Plant
                                    <br />
                                    Needs Nutrients
                                </h3>

                                {/* Steps */}
                                <div className="mt-12 space-y-6">

                                    {/* Step 1 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            1
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Look for yellowing or pale leaves.
                                        </p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            2
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Check for slow or stunted plant growth.
                                        </p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            3
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Watch for weak stems or unusual leaf color.
                                        </p>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#064d31]
                    text-[11px]
                    font-medium
                    text-[#00c968]
                "
                                        >
                                            4
                                        </span>

                                        <p
                                            className="
                    pt-1
                    text-[11px]
                    leading-relaxed
                    text-white
                "
                                        >
                                            Identify nutrient problems before they worsen.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </section>


            </main>
            {/* ================= PRODUCT DETAILS POPUP ================= */}

            {selectedProduct && (
                <div
                    className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-md
            p-3 sm:p-5
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
                flex w-full
                max-w-4xl
                max-h-[95vh]
                overflow-hidden
                rounded-2xl
                border border-white/10
                bg-[#0d2b1e]
                shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                
                flex-col
                md:flex-row
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
                    absolute right-4 top-4 z-20
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    bg-black/30
                    text-lg text-white/80
                    backdrop-blur-sm
                    transition-all duration-200
                    hover:bg-white/10
                    hover:text-white
                "
                        >
                            ×
                        </button>


                        {/* ================= IMAGE ================= */}
                        <div
                            className="
                    relative
                    flex items-center justify-center
                    bg-white
                    shrink-0

                    h-[280px]
                    w-full

                    sm:h-[340px]

                    md:h-auto
                    md:w-[42%]
                    md:min-h-[520px]
                "
                        >
                            {/* Soft background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#f1f3ef]" />

                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.brandName}
                                className="
                        relative z-10
                        h-full w-full
                        object-contain
                        p-6 sm:p-8 md:p-10
                        transition-transform duration-300
                        hover:scale-[1.03]
                    "
                            />
                        </div>


                        {/* ================= PRODUCT DETAILS ================= */}
                        <div
                            className="
                    flex flex-1
                    flex-col
                    overflow-y-auto
                    px-5 py-6
                    sm:px-7 sm:py-7
                    md:px-8 md:py-8
                "
                        >

                            {/* Premium + Quality */}
                            <div className="flex items-center justify-between pr-10">

                                <div>
                                    <p
                                        className="
                                text-[13px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-[#55d979]
                            "
                                    >
                                        Premium Organic
                                    </p>

                                    <h2
                                        className="
                                mt-0.5
                                text-3xl
                                sm:text-3xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                                    >
                                        {selectedProduct.brandName}
                                    </h2>
                                </div>


                                {/* Quality Badge */}
                                <div
                                    className="
                            hidden sm:flex
                            items-center gap-1.5
                            rounded-full
                            bg-[#173d2a]
                            px-3 py-1.5
                            text-[#55d979]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-[13px]
                        "
                                >
                                    <span>✓</span>
                                    Guaranteed Quality
                                </div>

                            </div>


                            {/* Rating */}
                            <div className="mt-1.5 flex items-center gap-2">

                                <div className="text-sm tracking-wide text-lime-400">
                                    ★★★★★
                                </div>

                                <span className="text-xs text-[#9caf9f]">
                                    4.5 (1.2k reviews)
                                </span>

                            </div>


                            {/* Divider */}
                            <div className="my-5 h-px bg-white/10" />


                            {/* Description */}
                            <p
                                className="
                        max-w-lg
                        text-sm
                        sm:text-[15px]
                        leading-6
                        text-[#b9c8bd]
                    "
                            >
                                {selectedProduct.description}
                            </p>


                            {/* ================= WEIGHT ================= */}
                            <div className="mt-6">

                                <p
                                    className="
                            mb-2
                            text-[11px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-[#d7e1da]
                        "
                                >
                                    Select Weight
                                </p>

                                <div className="flex gap-2">

                                    {/* 1 KG */}
                                    <button
                                        className="
                                rounded-lg
                                border border-[#39c96b]
                                bg-[#123e28]
                                px-4 py-2
                                text-xs
                                font-semibold
                                text-[#5de181]
                                shadow-[0_0_15px_rgba(57,201,107,0.08)]
                            "
                                    >
                                        ✓ &nbsp;1 kg
                                    </button>


                                    {/* 5 KG */}
                                    <button
                                        className="
                                rounded-lg
                                bg-[#112f22]
                                px-4 py-2
                                text-xs
                                font-medium
                                text-[#73877b]
                                transition
                                hover:bg-[#183b29]
                                hover:text-white
                            "
                                    >
                                        5 kg
                                    </button>


                                    {/* 10 KG */}
                                    <button
                                        className="
                                rounded-lg
                                bg-[#112f22]
                                px-4 py-2
                                text-xs
                                font-medium
                                text-[#73877b]
                                transition
                                hover:bg-[#183b29]
                                hover:text-white
                            "
                                    >
                                        10 kg
                                    </button>

                                </div>

                            </div>


                            {/* ================= PRICE ================= */}
                            <div className="mt-6">

                                <div className="flex items-end gap-3">

                                    <span
                                        className="
                                text-3xl
                                sm:text-4xl
                                font-bold
                                tracking-tight
                                text-white
                            "
                                    >
                                        ₹{(selectedProduct.price * quantity).toFixed(2)}
                                    </span>

                                    <span className="mb-1 text-xs text-[#708479]">
                                        MRP
                                    </span>

                                    <span
                                        className="
                                mb-1
                                text-xs
                                text-[#708479]
                                line-through
                            "
                                    >
                                        ₹521
                                    </span>

                                </div>


                                {/* Free Delivery */}
                                <div
                                    className="
                            mt-2
                            inline-flex
                            items-center gap-1.5
                            rounded-full
                            bg-[#123c28]
                            px-2.5 py-1
                            text-[11px]
                            font-semibold
                            text-[#55df7d]
                        "
                                >
                                    <span>✓</span>
                                    FREE DELIVERY
                                </div>

                            </div>


                            {/* ================= BOTTOM ACTIONS ================= */}
                            <div
                                className="
                        mt-auto
                        pt-7
                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                        sm:items-center
                    "
                            >

                                {/* Quantity */}
                                <div
                                    className="
                            flex
                            h-11
                            w-fit
                            items-center
                            rounded-lg
                            bg-[#092218]
                            border border-white/5
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
                                flex h-full w-10
                                items-center justify-center
                                text-lg text-white
                                transition
                                hover:bg-white/5
                                disabled:opacity-40
                            "
                                    >
                                        −
                                    </button>


                                    {/* Quantity */}
                                    <span
                                        className="
                                flex h-full w-8
                                items-center justify-center
                                text-sm
                                font-semibold
                                text-white
                            "
                                    >
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
                                flex h-full w-10
                                items-center justify-center
                                text-lg text-white
                                transition
                                hover:bg-white/5
                                disabled:opacity-40
                            "
                                    >
                                        +
                                    </button>

                                </div>


                                {/* Buttons */}
                                <div className="flex flex-1 gap-2">

                                    {/* Add To Cart */}
                                    <button
                                        className="
                                flex-1
                                h-11
                                rounded-lg
                                border
                                border-[#39c96b]
                                bg-transparent
                                px-4
                                text-sm
                                font-bold
                                text-[#59df7c]
                                transition-all duration-200
                                hover:bg-[#123e28]
                                hover:shadow-[0_0_20px_rgba(57,201,107,0.12)]
                            "
                                    >
                                        🛒
                                        <span className="ml-2">
                                            Add to Cart
                                        </span>
                                    </button>


                                    {/* Buy Now */}
                                    <button
                                        className="
                                flex-1
                                h-11
                                rounded-lg
                                bg-gradient-to-r
                                from-[#3cda78]
                                to-[#8bdd22]
                                px-4
                                text-sm
                                font-bold
                                text-[#082215]
                                shadow-[0_5px_20px_rgba(76,220,90,0.18)]
                                transition-all duration-200
                                hover:scale-[1.02]
                                hover:shadow-[0_8px_25px_rgba(76,220,90,0.28)]
                            "
                                    >
                                        Buy Now
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