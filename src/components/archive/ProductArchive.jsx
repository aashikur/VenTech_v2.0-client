import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductArchive = ({ category = "all", maxCategories = 6 }) => {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    // Fetch products
    const fetchProducts = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/products/public");
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Filter categories if prop is set
  const filteredCategories = categories.filter((cat, index) => {
    if (category === "all") return true;
    if (typeof category === "number") return index === category;
    if (typeof category === "string") return cat.name === category;
    return true;
  });

  const displayCategories = showAll
    ? filteredCategories
    : filteredCategories.slice(0, maxCategories);

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {displayCategories.map((cat) => {
        const catProducts = products.filter(
          (prod) => prod.category === cat.name
        );
        if (catProducts.length === 0) return null;

        return (
          <div key={cat._id} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {cat.name}
            </h2>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {catProducts.map((prod) => (
                <SwiperSlide key={prod._id}>
                  <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
                    <img
                      src={prod.images?.[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqNClZI6I_euxH1lEPcqhgIxHIUeIFpSHJg&s"}
                      alt={prod.title}
                      className="w-28 h-28 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {prod.title.slice(0, 25)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}

      {/* Load More Button */}
      {!showAll && filteredCategories.length > maxCategories && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
          >
            Load More Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductArchive;
