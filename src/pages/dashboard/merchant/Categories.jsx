import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";
import { Button, Button1, Button2 } from "@/components/ui/Button";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", image: "" });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const axiosPublic = useAxiosPublic();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosPublic.get("/api/v1/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Upload to imgbb
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data?.data?.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      Swal.fire("Error", "Image upload failed", "error");
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.image) {
      return Swal.fire("Error", "Name & image are required", "error");
    }
    try {
      setLoadingAdd(true);
      await axiosPublic.post("/api/v1/categories", newCategory);
      Swal.fire("Added", "New category added successfully", "success");
      setNewCategory({ name: "", image: "" });
      fetchCategories();
    } catch (err) {
      console.error("Failed to add category:", err);
      Swal.fire("Error", "Failed to add category", "error");
    } finally {
      setLoadingAdd(false);
    }
  };

  // Save edited category
  const handleSaveEdit = async (id) => {
    if (!editing.name || !editing.image) {
      return Swal.fire("Error", "Name & image are required", "error");
    }
    try {
      setLoadingEdit(true);
      await axiosPublic.patch(`/api/v1/categories/${id}`, editing);
      Swal.fire("Updated", "Category updated successfully", "success");
      setEditing(null);
      fetchCategories();
    } catch (err) {
      console.error("Failed to update category:", err);
      Swal.fire("Error", "Failed to update category", "error");
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

      {/* Add Category */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          className="input input-bordered w-full md:w-1/3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              setLoadingAdd(true);
              const url = await uploadImage(file);
              if (url) setNewCategory({ ...newCategory, image: url });
              setLoadingAdd(false);
            }
          }}
          className="file-input file-input-bordered w-full md:w-1/3"
        />

        <button
          onClick={handleAddCategory}
          disabled={loadingAdd}
          className="btn btn-primary flex items-center gap-2"
        >
          {loadingAdd ? "Uploading..." : <><FaPlus /> Add</>}
        </button>
      </div>

      {/* Categories Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-md flex flex-col items-center gap-3 bg-white dark:bg-[#1a1a1a]"
          >
            {editing?._id === cat._id ? (
              <>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setLoadingEdit(true);
                      const url = await uploadImage(file);
                      if (url) setEditing({ ...editing, image: url });
                      setLoadingEdit(false);
                    }
                  }}
                  className="file-input file-input-bordered w-full"
                />
                {editing.image && (
                  <img
                    src={editing.image}
                    alt="preview"
                    className="w-16 h-16 rounded object-cover border"
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleSaveEdit(cat._id)}
                    disabled={loadingEdit}
                    className="btn btn-success btn-sm flex items-center gap-1"
                  >
                    <FaSave /> {loadingEdit ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="btn btn-ghost btn-sm flex items-center gap-1"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
                <span className="font-semibold text-lg">{cat.name}</span>
                <button
                  onClick={() => setEditing(cat)}
                  className="btn btn-outline btn-sm flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
