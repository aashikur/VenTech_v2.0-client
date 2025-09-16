import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import EditProductModal from "@/components/manageProduct/EditProductModal";
import axios from "axios";
import useAxiosPublic from "@/hooks/axiosPublic";

const gradientBtn =
  "flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 \
   bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow \
   hover:opacity-90 active:scale-95";

const outlineBtn =
  "flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 \
   border border-pink-500/80 text-pink-500 dark:text-pink-400 shadow-sm \
   hover:bg-pink-500/10 hover:border-pink-400 active:scale-95";

const ProductsMerchant = () => {
  const { profile, loading: roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const merchantId = profile?._id;

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("my"); // my / other
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    if (!profile || roleLoading) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/v1/products");
        const allProducts = res.data;

        setProducts(
          filter === "my"
            ? allProducts.filter((p) => p.merchantId === merchantId)
            : allProducts.filter((p) => p.merchantId !== merchantId)
        );
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, profile, roleLoading]);

  // Stock change
  const handleStockChange = async (productId, action) => {
    try {
      const product = products.find((p) => p._id === productId);
      let newQty = product.quantity;

      if (action === "increment") newQty += 1;
      if (action === "decrement") newQty = Math.max(0, newQty - 1);
      if (action === "out") newQty = 0;

      await axiosSecure.patch(`/api/v1/products/${productId}/update-stock`, { quantity: newQty });

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, quantity: newQty } : p))
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update stock", "error");
    }
  };

  // Delete product
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
      Swal.fire("Deleted!", "Product deleted successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete product", "error");
    }
  };

  // Request product
  const handleRequestProduct = async (product) => {
    const PlayLoad = {
      requestedByMerchant: merchantId,
      requestedToMerchant: product.merchantId,
      productTitle: product.title,
      productCategory: product.category,
    }
    try {
      const res = await axiosPublic.post("http://localhost:3000/api/v1/request-list", PlayLoad)

      console.log("Request saved:", res.data);
      Swal.fire("Success", "Request sent successfully!", "success");
    } catch (err) {
      console.error("Error sending request:", err);
      Swal.fire("Error", "Failed to send request", "error");
    }

    console.log("RequestedBy Merchant: ", merchantId)
    console.log("PlayLoad: ", PlayLoad);


  };

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (!profile || roleLoading || loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-[#0f0f14] min-h-screen">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Product Inventory
      </motion.h2>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 shadow-sm"
        />
      </div>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-8">
        <button className={filter === "my" ? gradientBtn : outlineBtn} onClick={() => setFilter("my")}>
          My Products
        </button>
        <button className={filter === "other" ? gradientBtn : outlineBtn} onClick={() => setFilter("other")}>
          Other Merchant Products
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">No products found.</div>
        ) : (
          <table className="table-auto w-full text-sm md:text-base rounded-xl shadow overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Retail Price</th>
                <th className="px-4 py-3">Merchant Price</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Stock</th>
                {filter === "other" && <th className="px-4 py-3">Added By Merchant</th>}
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3">
                    <img
                      src={p.images?.[0] || "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg"}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.retailPrice}</td>
                  <td className="px-4 py-3">{p.merchantPrice}</td>
                  <td className="px-4 py-3">{p.quantity}</td>
                  <td className="px-4 py-3">{p.quantity > 0 ? "In Stock" : "Out of Stock"}</td>

                  {filter === "other" && <td className="px-4 py-3">{p.merchantId}</td>}

                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {filter === "my" ? (
                      <>
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                        >
                          Edit
                        </button>

                        <EditProductModal
                          isOpen={!!editingProduct}
                          product={editingProduct}
                          onClose={() => setEditingProduct(null)}
                          onUpdated={(updated) =>
                            setProducts((prev) =>
                              prev.map((prod) => (prod._id === updated._id ? updated : prod))
                            )
                          }
                        />

                        <button
                          onClick={() => handleDelete(p._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleStockChange(p._id, "increment")}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleStockChange(p._id, "decrement")}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleStockChange(p._id, "out")}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg"
                        >
                          Out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleRequestProduct(p)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                      >
                        Request
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsMerchant;
