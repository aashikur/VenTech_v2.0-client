import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";
import ProductArchiveAll from "@/components/archive/ProductArchiveAll";

const ProductDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosPublic.get(`/api/v1/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, axiosPublic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${product.title}`);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
        {/* ---------- Main Product Section ---------- */}
        <div className="lg:col-span-3 space-y-10">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {/* Product Image */}
            <motion.img
              src={product.images?.[0] || "/no-image.png"}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.title}
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {product.description.slice(0, 120)}...
                </p>
              </div>

              {/* Price & Stock */}
              <div className="mt-4 space-y-2">
                <p className="text-3xl font-bold text-orange-600">
                  ৳{product.merchantPrice}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ৳{product.retailPrice}
                </p>
                <p className="text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stockStatus === "in-stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stockStatus === "in-stock"
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quantity Available: {product.quantity}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Long Description */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Product Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>

        {/* ---------- Sidebar ---------- */}
        <aside className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Categories
          </h2>
          <ProductArchiveAll size="small" />
        </aside>
      </div>
    </div>
  );
};

export default ProductDetails;
