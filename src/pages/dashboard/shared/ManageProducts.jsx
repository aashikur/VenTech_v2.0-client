import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import EditProductModal from "@/components/manageProduct/EditProductModal";

const ManageProducts = () => {
  const { profile, role, loading } = useRole();
  const axiosSecure = useAxiosSecure();
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ Fetch products
  useEffect(() => {
    if (loading || !profile) return;

    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/api/v1/products/public");
        let allProducts = res.data || [];

        // 🔎 Filter for merchants (only their products)
        if (role === "merchant") {
          allProducts = allProducts.filter((p) => {
            const merchantId =
              typeof p.merchantId === "object" ? p.merchantId._id : p.merchantId;
            return merchantId === profile._id;
          });
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("❌ Failed to fetch products", err);
        Swal.fire("Error", "Failed to fetch products", "error");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [axiosSecure, loading, profile, role]);

  // ✅ Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#18122B",
      color: "#fff",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/v1/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      Swal.fire("✅ Deleted!", "Product deleted successfully", "success");
    } catch (err) {
      console.error("❌ Delete error", err);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  // ✅ Filter products by search
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading || loadingProducts) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <section className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {role === "admin" ? "All Products" : "My Products"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {role === "admin"
            ? "Manage all products in the system."
            : "Here are the products you’ve added."}
        </p>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#18122B] text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </motion.div>

      {/* Product Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#18122B] overflow-hidden"
      >
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Retail Price</th>
              <th className="px-4 py-3">Merchant Price</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg"
                    }
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.title}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">৳{product.retailPrice}</td>
                <td className="px-4 py-3">৳{product.merchantPrice}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">{product.stockStatus}</td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>

                  {/* Edit Modal */}
                  <EditProductModal
                    isOpen={!!editingProduct}
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onUpdated={(updated) => {
                      setProducts((prev) =>
                        prev.map((p) =>
                          p._id === updated._id ? updated : p
                        )
                      );
                    }}
                  />

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
};

export default ManageProducts;
