import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import SectionTitle from "@/components/ui/SectionTitle";
import { Button3 } from "@/components/ui/Button";

export default function Blog() {
  const [state, setState] = useState({
    loading: true,
    error: null,
    posts: [],
  });

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let active = true;
    const fetchPosts = async () => {
      try {
        const { data } = await axiosPublic.get("/blogs");
        if (active) {
          const publishedPosts = (Array.isArray(data) ? data : [])
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setState({ loading: false, error: null, posts: publishedPosts });
        }
      } catch (err) {
        if (active) setState({ loading: false, error: "Failed to load blog posts.", posts: [] });
      }
    };
    fetchPosts();
    return () => { active = false; };
  }, [axiosPublic]);

  return (
    <main className="w-full bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        {/* Hero Header */}
        <SectionTitle
          topText="Insights & Stories"
          title="Our Blog"
          subtitle="Education, community stories, and updates from the VenTech team."
        />

        {/* Blog Grid */}
        <section className="w-full py-6">
          {state.loading ? (
            <SkeletonGrid />
          ) : state.error ? (
            <div className="alert alert-warning bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg p-4 shadow-md">
              {state.error}
            </div>
          ) : state.posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-800/50 p-8 text-center shadow-md">
              No blog posts have been published yet. Please check back soon!
            </div>
          )}
        </section>
      </div>

      <div className="relative flex justify-center mt-10">
        <Button3 className="px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 transition-all">
          View All
        </Button3>
      </div>
    </main>
  );
}

/* -------------------- Card + UI pieces -------------------- */
function BlogCard({ post }) {
  return (
    <article className="relative  border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
      <figure>
        <img
          src={post.thumbnail || "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="p-4 flex flex-col justify-between group">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400">
          {post.category && <span className="px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300">{post.category}</span>}
          <span>{formatDate(post.createdAt)}</span> 
        </div>
        <h3 className="text-lg font-extrabold text-gray-700 dark:text-white mb-2 group-hover:text-orange-400 group-dark:hover:dark:text-orange-400  transition">
          <Link to={`/blog/${post._id}`}>{truncateText(post.title, 60)}</Link>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{truncateText(stripHtml(post.content), 100)}</p>
        <div className="mt-auto flex justify-end ">
          <Button3 className=" transition">
            <Link to={`/blog/${post._id}`} className="block">Read More</Link>
          </Button3> 
        </div>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse">
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Helpers ----------------------------- */
function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function truncateText(text = "", maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}
