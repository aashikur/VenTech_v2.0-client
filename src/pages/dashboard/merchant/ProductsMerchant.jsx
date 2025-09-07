import { useState, useEffect } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import Swal from "sweetalert2";
import { FaPlus, FaMinus, FaBan, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const gradientBtn =
  "flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 \
   bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow \
   hover:opacity-90 active:scale-95";

const outlineBtn =
  "flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 \
   border border-pink-500/80 text-pink-500 dark:text-pink-400 shadow-sm \
   hover:bg-pink-500/10 hover:border-pink-400 active:scale-95";

const ProductsMerchant = () => {
  const { profile } = useRole();
  const axiosSecure = useAxiosSecure();
  const merchantId = profile?._id;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("my"); // my / all
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    if (!profile || profile.status === "pending") return;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/v1/products");
        const allProducts = res.data;
        setProducts(
          filter === "my"
            ? allProducts.filter((p) => p.merchantId === merchantId)
            : allProducts
        );
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch products", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filter, profile]);

  // Handle stock updates
  const handleStockChange = async (productId, action) => {
    try {
      const product = products.find((p) => p._id === productId);
      let newQty = product.quantity;

      if (action === "increment") newQty += 1;
      if (action === "decrement") newQty = Math.max(0, newQty - 1);
      if (action === "out") newQty = 0;

      await axiosSecure.patch(`/api/v1/products/${productId}/update-stock`, {
        quantity: newQty,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, quantity: newQty } : p
        )
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update stock", "error");
    }
  };

  const handleRequestProduct = (productId) => {
    Swal.fire("Requested!", "Product request sent to the merchant.", "success");
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#0f0f14] min-h-screen">
      {/* Page Title */}
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Product Inventory
      </motion.h2>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-10">
        <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
          {filter === "my"
            ? "Search from my inventory"
            : "Search from other merchants"}
        </p>
        <motion.input
          type="text"
          placeholder="🔍 Type product title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                     focus:ring-2 focus:ring-pink-500 shadow-sm"
          whileFocus={{ scale: 1.02 }}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={` ${filter === "my" ? `${gradientBtn}` : `${outlineBtn}`}`}
          onClick={() => setFilter("my")}
        >
          My Products
        </button>
        <button
            className={` ${filter === "all" ? `${gradientBtn}` : `${outlineBtn}`}`}
          onClick={() => setFilter("all")}
        >
          All Products
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : profile ? (
          <table className="table-auto w-full rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-gray-700 dark:text-gray-200 text-sm">
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Retail Price</th>
                <th className="px-4 py-2 text-left">Merchant Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">
                    <img
                      src={
                        p.images?.[0] ||
                        "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg"
                      }
                      alt={p.title}
                      className="w-12 h-12 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    ${p.retailPrice}
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    ${p.merchantPrice}
                  </td>
                  <td className="px-4 py-3">{p.quantity}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      p.quantity > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {p.merchantId === merchantId ? (
                      <>
                        <button
                          onClick={() => handleStockChange(p._id, "increment")}
                          className="btn btn-xs bg-green-500 hover:bg-green-600 text-white rounded"
                          title="Increase stock"
                        >
                          <FaPlus />
                        </button>
                        <button
                          onClick={() => handleStockChange(p._id, "decrement")}
                          className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                          title="Decrease stock"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => handleStockChange(p._id, "out")}
                          className="btn btn-xs bg-red-500 hover:bg-red-600 text-white rounded"
                          title="Mark out of stock"
                        >
                          <FaBan />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRequestProduct(p._id)}
                        className="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                        title="Request product"
                      >
                        <FaPaperPlane />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsMerchant;
