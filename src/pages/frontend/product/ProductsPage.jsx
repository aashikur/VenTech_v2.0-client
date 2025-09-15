import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import Section from "@/components/ui/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/shared/ProductCard";
import SkeletonGrid from "@/components/loading/SkeletonGrid";
import PageBanner from "@/components/shared/PageBanner";
import SectionTitle from "@/components/ui/SectionTitle";
import { FaSearch } from "react-icons/fa";

export default function ProductsPage() {
    const [state, setState] = useState({
        loading: true,
        error: null,
        products: [],
    });
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        let active = true;
        const fetchProducts = async () => {
            try {
                const { data } = await axiosPublic.get("/api/v1/products/public");
                if (active) {
                    setState({ loading: false, error: null, products: data || [] });
                    setFilteredProducts(data || []); // initialize filtered products
                }
            } catch (err) {
                if (active) {
                    setState({
                        loading: false,
                        error: "Failed to load products.",
                        products: [],
                    });
                    setFilteredProducts([]);
                }
            }
        };
        fetchProducts();
        return () => { active = false; };
    }, []);

    // Filter products by search text
    useEffect(() => {
        if (!searchText.trim()) {
            setFilteredProducts(state.products);
        } else {
            const search = searchText.toLowerCase();
            const matches = state.products.filter(
                (p) =>
                    p.title.toLowerCase().includes(search) ||
                    (p.category && p.category.toLowerCase().includes(search))
            );
            setFilteredProducts(matches);
        }
    }, [searchText, state.products]);

    // Group filtered products by category
    const categories = filteredProducts.reduce((acc, product) => {
        const cat = product.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {});

    return (
        <div className="relative">
            {/* Banner */}
            <PageBanner
                title="Browse Products"
                subtitle="Explore a wide range of product categories tailored for your needs."
                breadcrumb="Home → Categories → Products"
            />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                <Link to="/" className="hover:underline">Home</Link>{" "}
                / <span className="text-gray-800 dark:text-white">Products</span>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-xl mx-auto mb-5 sm:mb-8 sm:mt-12">
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                    <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search products, categories, or brands..."
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 text-sm sm:text-base"
                    />
                    <button
                        className="px-6 py-3 rounded-r-full font-semibold text-white 
                                   bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 transition"
                        onClick={() => {}} // optional if you want button search too
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Products by Category */}
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
                {state.loading ? (
                    <SkeletonGrid />
                ) : state.error ? (
                    <div className="alert alert-warning bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg p-4 shadow-md">
                        {state.error}
                    </div>
                ) : Object.keys(categories).length > 0 ? (
                    Object.entries(categories).map(([catName, products]) => (
                        <section key={catName}>
                            <SectionTitle
                                title={catName}
                                subtitle={false}
                                description={false}
                                topText={false}
                            />
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
                            >
                                {products.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <ProductCard product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-800/50 p-8 text-center shadow-md">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
}
