import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

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

const EditProductModal = ({ isOpen, onClose, product, onUpdated }) => {
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    title: "",
    category: "",
    retailPrice: "",
    merchantPrice: "",
    quantity: "",
    images: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        category: product.category || pcCategories[0].name,
        retailPrice: product.retailPrice || "",
        merchantPrice: product.merchantPrice || "",
        quantity: product.quantity || 0,
        images: product.images || [],
      });
      setImageFile(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let images = [...form.images];

      // ✅ Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (data.success && data.data.url) {
          // Replace old images with the new one
          images = [data.data.url];
        } else {
          throw new Error("Image upload failed");
        }
      }

      const payload = { ...form, images };
      console.log("😀", payload)

      const res = await axiosSecure.patch(
        `/api/v1/products/${product._id}/edit`,
        payload
      );

      onUpdated(res.data.product);
      Swal.fire("✅ Updated!", "Product updated successfully", "success");
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-[#18122B] rounded-2xl p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Product
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200"
          >
            {pcCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Prices & Quantity */}
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="number"
              name="retailPrice"
              value={form.retailPrice}
              onChange={handleChange}
              placeholder="Retail Price"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200"
              required
            />
            <input
              type="number"
              name="merchantPrice"
              value={form.merchantPrice}
              onChange={handleChange}
              placeholder="Merchant Price"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200"
              required
            />
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-700 dark:text-gray-200"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">
              Product Image
            </label>
            {form.images[0] && (
              <img
                src={form.images[0]}
                alt="Current"
                className="w-32 h-32 object-cover mb-2 rounded-lg border border-gray-300 dark:border-gray-700"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-900"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold"
            >
              {loading ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProductModal;
