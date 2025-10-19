import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import Section from "@/components/ui/Section";
import { Button3 } from "@/components/ui/Button";
import ProductCard from "@/components/shared/ProductCard";

export default function ProductHighlight() {
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
        if (active)
          setState({
            loading: false,
            error: "Failed to load products.",
            products: [],
          });
      }
    };
    fetchProducts();
    return () => { active = false; };
  }, []);

  return (
    <Section
      id="product-highlights"
      title={"Featured Products"}
      description={"Check out some of our highlighted products."}
      subtitle={"Top Picks"}
      viewAllLink="/products"

      >
      <section className="w-full py-6">
        {state.loading ? (
          <SkeletonGrid />
        ) : state.error ? (
          <div className="alert alert-warning bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg p-4 shadow-md">
            {state.error}
          </div>
        ) : state.products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.products.slice(0, 9).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-800/50 p-8 text-center shadow-md">
            No products available at the moment.
          </div>
        )}
      </section>
    </Section>
  );
}



/* -------------------- Skeleton -------------------- */
function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 mx-auto bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 w-3/4 mx-auto bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-8 w-full mt-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}
