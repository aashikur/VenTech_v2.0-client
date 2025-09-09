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

export default function ProductsPage() {
    const [state, setState] = useState({
        loading: true,
        error: null,
        products: [],
    });

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        let active = true;
        const fetchProducts = async () => {
            try {
                const { data } = await axiosPublic.get("/api/v1/products/public");
                if (active) {
                    setState({ loading: false, error: null, products: data || [] });
                }
            } catch (err) {
                if (active) {
                    setState({
                        loading: false,
                        error: "Failed to load products.",
                        products: [],
                    });
                }
            }
        };
        fetchProducts();
        return () => {
            active = false;
        };
    }, []);

    // ✅ Group products by category
    const categories = state.products.reduce((acc, product) => {
        const cat = product.category || "Uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {});

    return (
        <div className="relative">
            {/* ---------------- Banner ---------------- */}
            {/* // make a text for this..  */}
            <PageBanner title="Products"
                subtitle="Explore a wide range of product categories tailored for your needs."
                breadcrumb="Home → Categories → Products"
            />

            {/* ---------------- Breadcrumb ---------------- */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                <Link to="/" className="hover:underline">
                    Home
                </Link>{" "}
                / <span className="text-gray-800 dark:text-white">Products</span>
            </div>

            {/* ---------------- Products by Category ---------------- */}
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
                {state.loading ? (
                    <SkeletonGrid />
                ) : state.error ? (
                    <div className="alert alert-warning bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg p-4 shadow-md">
                        {state.error}
                    </div>
                ) : Object.keys(categories).length > 0 ? (
                    Object.entries(categories).map(([catName, products]) => (
                        <section
                        >
                            <SectionTitle title={catName} 
                                 subtitle={`Latest products in ${catName} category`}
                                description={false} 
                                topText={false}
                            />
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                }}
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
                        No products available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}

