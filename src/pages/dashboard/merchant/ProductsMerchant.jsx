import { useState, useEffect } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import Swal from "sweetalert2";
import { FaPlus, FaMinus, FaBan, FaPaperPlane } from "react-icons/fa";

const ProductsMerchant = () => {
  const { profile } = useRole();
  const axiosSecure = useAxiosSecure();
  const merchantId = profile?._id;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("my"); // my / all

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get("/api/v1/products"); // get all products
      const allProducts = res.data;
      setProducts(
        filter === "my"
          ? allProducts.filter((p) => p.merchantId === merchantId)
          : allProducts
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch products", "error");
    }
  };

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
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        My Products
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <div className="flex gap-2">
          <button
            className={`btn btn-sm ${
              filter === "my" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilter("my")}
          >
            My Products
          </button>
          <button
            className={`btn btn-sm ${
              filter === "all" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilter("all")}
          >
            All Products
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full rounded-xl shadow">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Retail Price</th>
              <th>Merchant Price</th>
              <th>Quantity</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.images?.[0] || "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg"}
                    alt={p.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>${p.retailPrice}</td>
                <td>${p.merchantPrice}</td>
                <td>{p.quantity}</td>
                <td>{p.quantity > 0 ? "In Stock" : "Out of Stock"}</td>
                <td className="flex gap-2">
                  {p.merchantId === merchantId ? (
                    <>
                      <button
                        onClick={() => handleStockChange(p._id, "increment")}
                        className="btn btn-xs btn-success"
                      >
                        <FaPlus />
                      </button>
                      <button
                        onClick={() => handleStockChange(p._id, "decrement")}
                        className="btn btn-xs btn-warning"
                      >
                        <FaMinus />
                      </button>
                      <button
                        onClick={() => handleStockChange(p._id, "out")}
                        className="btn btn-xs btn-error"
                      >
                        <FaBan />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleRequestProduct(p._id)}
                      className="btn btn-xs btn-info"
                    >
                      <FaPaperPlane />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsMerchant;
