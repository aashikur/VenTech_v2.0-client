import useAxiosPublic from "@/hooks/axiosPublic";
import useRole from "@/hooks/useRole";
import React, { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [message, setMessage] = useState("");

  const { profile, role, loading } = useRole(); // useRole hook
  const axiosSecure = useAxiosPublic();

  // Fetch all products
  useEffect(() => {
    if (loading || !profile) return; // wait until profile is loaded
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/api/v1/products/public");
        setProducts(res.data || []);
        setLoadingProducts(false);
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch products");
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [axiosSecure, loading, profile]);

// Delete product
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await axiosSecure.delete(`/api/v1/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
    setMessage("Product deleted successfully!");
  } catch (err) {
    console.error(err);
    setMessage("Failed to delete product");
  }
};

// Edit product (simple title edit)
const handleEdit = (product) => {
  const newTitle = prompt("Edit product title:", product.title);
  if (newTitle === null) return; // canceled
  axiosSecure
    .patch(`/api/v1/products/${product._id}/edit`, { title: newTitle }) // ✅ use /edit
    .then((res) => {
      setProducts(products.map((p) => (p._id === product._id ? res.data.product : p)));
      setMessage("Product updated successfully!");
    })
    .catch((err) => {
      console.error(err);
      setMessage("Failed to update product");
    });
};


  if (loading || loadingProducts) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Products {products.length}</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Retail Price</th>
            <th className="border px-2 py-1">Merchant Price</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Stock Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const canEditOrDelete = role === "admin" || product.merchantId === profile._id;
            return (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{product.title}</td>
                <td className="border px-2 py-1">{product.category}</td>
                <td className="border px-2 py-1">{product.retailPrice}</td>
                <td className="border px-2 py-1">{product.merchantPrice}</td>
                <td className="border px-2 py-1">{product.quantity}</td>
                <td className="border px-2 py-1">{product.stockStatus}</td>
                <td className="border px-2 py-1 space-x-2">
                  {canEditOrDelete && (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
