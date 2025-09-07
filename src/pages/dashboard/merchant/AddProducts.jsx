import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";

const AddProductForm = () => {
  const { role, profile } = useRole();
  const axiosSecure = useAxiosSecure();

  // Default placeholder image
  const defaultImage = "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg";

  const pcCategories = [
    { id: 1, name: "Processor (CPU)" },
    { id: 2, name: "Graphics Card (GPU)" },
    { id: 3, name: "Motherboard" },
    { id: 4, name: "RAM (Memory)" },
    { id: 5, name: "Storage" },
    { id: 6, name: "Power Supply (PSU)" },
    { id: 7, name: "Case (Chassis)" },
    { id: 8, name: "CPU Cooler" },
    { id: 9, name: "Monitor" },
    { id: 10, name: "Keyboard" },
    { id: 11, name: "Mouse" },
    { id: 12, name: "Sound / Headset" },
    { id: 13, name: "Network / WiFi" },
    { id: 14, name: "Operating System" },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: pcCategories[0].name,
    retailPrice: "",
    merchantPrice: "",
    quantity: "",
    stockStatus: "in-stock",
    imageUrl: "",
  });

  const user = profile?._id;
  if (!user) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        merchantId: user,
        images: [form.imageUrl || defaultImage],
        categoryImage: null,
      };

      await axiosSecure.post("/api/v1/products", payload, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire("✅ Success", "Product added successfully!", "success");

      setForm({
        title: "",
        description: "",
        category: pcCategories[0].name,
        retailPrice: "",
        merchantPrice: "",
        quantity: "",
        stockStatus: "in-stock",
        imageUrl: "",
      });
    } catch (err) {
      console.error("❌ Add Product Error:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to add product", "error");
    }
  };

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
          Add New Product
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Fill in the details below to add a new product to your store.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#18122B] p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>

          {/* Category + Image */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-500">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              >
                {pcCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Image URL (optional)
              </label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Prices + Quantity */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Retail Price
              </label>
              <input
                type="number"
                name="retailPrice"
                value={form.retailPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Merchant Price
              </label>
              <input
                type="number"
                name="merchantPrice"
                value={form.merchantPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Stock Status
            </label>
            <select
              name="stockStatus"
              value={form.stockStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-pink-500 outline-none"
            >
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Add Product
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddProductForm;
