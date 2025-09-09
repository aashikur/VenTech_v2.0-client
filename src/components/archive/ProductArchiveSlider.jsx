import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductArchiveSlider = ({ maxProducts = 6 }) => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

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
  }, []);

  const displayProducts = showAll ? products : products.slice(0, maxProducts);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
      {/* Main Slider */}
      <div className="flex-1">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {displayProducts.map((prod) => (
            <SwiperSlide key={prod._id}>
              <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
                <img
                  src={
                    prod.images?.[0] ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqNClZI6I_euxH1lEPcqhgIxHIUeIFpSHJg&s"
                  }
                  alt={prod.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Archive / Small List */}
      <div className="w-60 flex-shrink-0 space-y-2">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Archive
        </h2>
        {displayProducts.map((prod) => (
          <Link
            key={prod._id}
            to={`/product/${prod._id}`}
            className="block px-3 py-2 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
          >
            {prod.title.slice(0, 25)}
          </Link>
        ))}

        {!showAll && products.length > maxProducts && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition text-sm"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductArchiveSlider;
