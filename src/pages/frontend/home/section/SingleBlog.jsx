import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axiosPublic.get(`/api/v1/blogs/${id}`);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch all blogs for sidebar
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/blogs");
        setAllBlogs(data.filter((post) => post.status === "published"));
      } catch (err) {
        console.error("Error fetching all blogs:", err);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <span className="text-gray-700 dark:text-gray-200">Loading...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <span className="text-red-500">Blog not found</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* -------- Left Column: Blog Content -------- */}
        <div className="lg:col-span-2">
          {/* Thumbnail */}
          <motion.img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Title */}
          <motion.h1
            className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {blog.title}
          </motion.h1>

          {/* Author info */}
          <motion.div
            className="mt-4 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={blog.authorPhoto}
              alt={blog.author}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {blog.author}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="mt-8 prose prose-lg dark:prose-invert max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>{blog.content}</p>
          </motion.div>
        </div>

        {/* -------- Right Column: Sidebar -------- */}
        <aside className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            More Blogs
          </h2>
          <div className="space-y-4">
            {allBlogs
              .filter((post) => post._id !== blog._id) // Exclude current blog
              .map((post) => (
                <motion.div
                  key={post._id}
                  className="flex gap-3 items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Thumbnail */}
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {/* Info */}
                  <div className="flex-1">
                    <Link
                      to={`/single-blog/${post._id}`}
                      className="block text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500 transition"
                    >
                      {truncateText(post.title, 40)}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {truncateText(stripHtml(post.content), 60)}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

/* ----------------------------- Helpers ----------------------------- */
function truncateText(text = "", maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default SingleBlog;
