import { useState, useContext } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";

export default function AddBlogs() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    content: "",
    thumbnailFile: null,
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnailFile") {
      setForm((prev) => ({
        ...prev,
        thumbnailFile: files[0],
        thumbnail: "", // reset preview
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // imgbb upload function
  async function uploadImageToImgbb(imageFile) {
    const apiKey = "YOUR_IMGBB_API_KEY"; // Replace with your real key
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let thumbnailUrl = form.thumbnail;
    // If file selected, upload to imgbb
    if (form.thumbnailFile) {
      try {
        thumbnailUrl = await uploadImageToImgbb(form.thumbnailFile);
      } catch {
        Swal.fire("Error!", "Image upload failed.", "error");
        setLoading(false);
        return;
      }
    }

    const blogData = {
      title: form.title,
      thumbnail: thumbnailUrl,
      content: form.content,
      author: user?.displayName || user?.email || "Unknown",
      authorPhoto: user?.photoURL || "",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await axiosSecure.post("/blogs", blogData);
      Swal.fire("Success!", "Blog added as draft.", "success");
      setForm({ title: "", thumbnail: "", content: "", thumbnailFile: null });
    } catch (err) {
      Swal.fire("Error!", "Failed to add blog.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#18122B] rounded-2xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold text-[#c30027] mb-6 text-center">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Enter blog title"
          />
        </div>
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnailFile"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-xs text-gray-500 mt-1">Or paste image URL below</div>
          <input
            type="text"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none mt-1"
            placeholder="Paste image URL"
          />
        </div>
        {/* Preview */}
        {(form.thumbnail || form.thumbnailFile) && (
          <img
            src={form.thumbnailFile ? URL.createObjectURL(form.thumbnailFile) : form.thumbnail}
            alt="Blog Thumbnail"
            className="w-full h-40 object-cover rounded-lg border mb-2"
          />
        )}
        {/* Content */}
        <div>
          <label className="block text-sm font-semibold mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 rounded-lg border bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            placeholder="Write your blog content here..."
          />
        </div>
        {/* Author Info (readonly) */}
        <div className="flex items-center gap-3 mt-2">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Author"
              className="w-10 h-10 rounded-full border"
            />
          )}
          <span className="text-sm text-gray-700 dark:text-gray-200">
            <b>Author:</b> {user?.displayName || user?.email || "Unknown"}
          </span>
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition"
        >
          {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}