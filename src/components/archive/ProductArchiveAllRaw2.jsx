
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";

const ProductArchiveAllRaw2 = ({
  maxProducts = 6,    // number of cards visible at a time
  slideTime = 2000,   // ms per slide
}) => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/products/public");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [axiosPublic]);

  // Auto-slide effect
  useEffect(() => {
    if (products.length <= maxProducts) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, slideTime);

    return () => clearInterval(interval);
  }, [products, maxProducts, slideTime]);

  // Get the slice of products to show
  const displayProducts = [];
  for (let i = 0; i < Math.min(maxProducts, products.length); i++) {
    displayProducts.push(products[(currentIndex + i) % products.length]);
  }

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 overflow-hidden">
      <div
        ref={sliderRef}
        className="space-y-6 transition-transform duration-500 ease-in-out"
      >
        {displayProducts.map((prod) => (
          <div
            key={prod._id}
            className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
          >
            <img
              src={
                prod.images?.[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqNClZI6I_euxH1lEPcqhgIxHIUeIFpSHJg&s"
              }
              alt={prod.title}
              className="w-32 h-32 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {prod.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                ${prod.retailPrice?.toFixed(2)}
              </p>
              <Link
                to={`/product/${prod._id}`}
                className="mt-2 inline-block text-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductArchiveAllRaw2;
