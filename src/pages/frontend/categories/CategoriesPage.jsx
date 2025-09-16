import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/axiosPublic";
import PageBanner from "@/components/shared/PageBanner";
import ProductArchiveAll from "@/components/archive/ProductArchiveAll";

/* ------------------ Categories Page ------------------ */
const CategoriesPage = () => {
  const axiosPublic = useAxiosPublic();
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/categories");
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // show first 9 categories unless load more clicked
  const visibleCategories = showAll ? categories : categories.slice(0, 9);

  return (
    <div className="min-h-screen relative dark:bg-gray-900">
      {/* -------- Page Banner -------- */}
      <PageBanner
        title="Categories"
        subtitle="Explore a wide range of product categories tailored for your needs."
        breadcrumb="Home → Categories"
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 
        grid grid-cols-1 lg:grid-cols-3 gap-10 
        h-screen overflow-hidden "
      >
        {/* -------- Left Column -------- */}
        <div className="lg:col-span-2 overflow-y-auto pr-2">
          <div className="text-left mb-6">
            <h2 className="text-2xl md:text-2xl font-bold text-gray-800 dark:text-white">
              Checkout Top Categories
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 hidden">
              Find everything you need in one place
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleCategories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>

          {/* Load More Button */}
          {categories.length > 9 && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* -------- Right Column: Blog Sidebar -------- */}
        <aside className="space-y-6 overflow-y-auto pl-2">
          <BlogSidebar />

          {/* Extra section like BlogsPage */}
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Archives
          </h2>
          <ProductArchiveAll size={"small"} />
        </aside>
      </div>
    </div>
  );
};

/* ------------------ Category Card ------------------ */
function CategoryCard({ category }) {
  return (
    <motion.div
      className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition"
      whileHover={{ scale: 1.03 }}
    >
      <Link
        // to={`/categories/${category._id}`}
        to={'/products'}
        className="flex flex-col items-center text-center"
      >
        <img
          src={category.image}
          alt={category.name}
          className="h-24 w-24 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {category.name}
        </h3>
      </Link>
    </motion.div>
  );
}

/* ------------------ Blog Sidebar ------------------ */
function BlogSidebar() {
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Latest Blogs
      </h2>
      {allBlogs.slice(0, 5).map((post) => (
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
              {truncateText(stripHtml(post.content), 60)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------ Helpers ------------------ */
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
