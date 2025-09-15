import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";

const ProductArchiveAll = ({ maxProducts = 6 }) => {
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

  const displayProducts = !showAll ? products.slice(-6) : products.slice(0, maxProducts);

  return (
    <div className="relative space-y-6 max-w-5xl mx-auto">
      {displayProducts.map((prod) => (
        <div
          key={prod._id}
          className="flex border items-center px-4  border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
        > 
          <img
            src={
              prod.images?.[0] ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROqNClZI6I_euxH1lEPcqhgIxHIUeIFpSHJg&s"
            }
            alt={prod.title}
            className="h-12 w-12 object-cover rounded-lg p-1"
          />
          <div className="p-4 flex flex-col justify-between flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {prod.title.slice(0, 20)}
            </h3>
            <p className="text-gray-600 dark:text-gray-500 text-xs">
              ${prod.retailPrice?.toFixed(2)}
            </p>
            <Link
              to={`/product/${prod._id}`}
              className="mt-2 inline-block text-center px-3 py-1 bg-orange-600 text-white text-sm rounded-full hover:bg-red-500 transition"
            >
              view details
            </Link>
          </div>
        </div>
      ))}

      {!showAll && products.length > maxProducts && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-red-500 transition"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductArchiveAll;
