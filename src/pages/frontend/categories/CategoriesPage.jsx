import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";
import CategoriesHighlight from "../home/section/CategoriesHighlight";
import PageBanner from "@/components/shared/PageBanner";

const CategoriesPage = () => {
  const axiosPublic = useAxiosPublic();
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/blogs");
        setAllBlogs(data.filter((post) => post.status === "published"));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen relative dark:bg-gray-900">
      {/* -------- Page Banner -------- */}
      <PageBanner
        title="Categories"
        subtitle="Explore a wide range of product categories tailored for your needs."
        breadcrumb="Home → Categories"
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* -------- Left Column -------- */}
        <div className="lg:col-span-2">
          <div className="mt-12">
            <CategoriesHighlight lg="3" all={true}/>
          </div>
        </div>

        {/* -------- Right Column: Blog Sidebar -------- */}
        <aside className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Latest Blogs
          </h2>
          <div className="space-y-4">
            {allBlogs.slice(0, 5).map((post) => (
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



export default CategoriesPage;
