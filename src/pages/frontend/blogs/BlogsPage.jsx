import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";
import PageBanner from "@/components/shared/PageBanner";
import ProductArchiveAll from "@/components/archive/ProductArchiveAll";

const BlogsPage = () => {
  const axiosPublic = useAxiosPublic();
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/blogs");
        setAllBlogs(data.filter((post) => post.status === "published"));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen relative dark:bg-gray-900">
      {/* -------- Page Banner -------- */}
      <PageBanner
        title="Our Blogs"
        subtitle="Read the latest updates, news, and insights from our team"
        breadcrumb="Home → Blogs"
      />

      {/* -------- Two Independent Scrollable Columns -------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 
                      grid grid-cols-1 lg:grid-cols-4 gap-10 
                      h-screen overflow-hidden items-start">
        
        {/* -------- Left Column: Blog Grid -------- */}
        <div className="lg:col-span-3 h-full overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <SkeletonGrid />
            ) : allBlogs.length > 0 ? (
              allBlogs.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/single-blog/${post._id}`}>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                        {truncateText(post.title, 50)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {truncateText(stripHtml(post.content), 80)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-200 col-span-full text-center">
                No blogs available.
              </p>
            )}
          </div>
        </div>

        {/* -------- Right Column: Sidebar -------- */}
        <aside className="space-y-6 h-full overflow-y-auto pl-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Archives
          </h2>
          {allBlogs.length > 0 ? (
            allBlogs.slice(0, 5).map((post) => (
              <motion.div
                key={post._id}
                className="flex gap-3 items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link
                    to={`/single-blog/${post._id}`}
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500 transition"
                  >
                    {truncateText(post.title, 40)}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No archived blogs.
            </p>
          )}

          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Archives
          </h2>
          <ProductArchiveAll />
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

/* -------------------- Skeleton -------------------- */
function SkeletonGrid() {
  return Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse"
    >
      <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-2/3 mx-auto bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  ));
}

export default BlogsPage;
