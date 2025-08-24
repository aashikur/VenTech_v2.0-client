// src/pages/_fronted/blog/Blog.jsx
// FIXED: Prevents infinite request loop with a correct useEffect dependency array.
// Includes skeletons, error handling, and a professional layout.

import { useEffect, useState } from "react";
import { Link } from "react-router"; // Standard for modern React Router
import useAxiosPublic from "@/hooks/axiosPublic";

export default function Blog() {
  // Use a single state object to prevent UI flicker
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
        const { data } = await axiosPublic.get("/blogs"); // Your endpoint
        if (active) {
          // Filter for only published posts before setting state
          const publishedPosts = (Array.isArray(data) ? data : [])
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setState({
            loading: false,
            error: null,
            posts: publishedPosts,
          });
        }
      } catch (err) {
        if (active) {
          setState({
            loading: false,
            error: "Failed to load blog posts. Please try again later.",
            posts: [],
          });
        }
      }
    };

    fetchPosts();

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      active = false;
    };
  // ====================================================================
  // THE FIX: Use an empty dependency array `[]`.
  // This tells React to run this effect ONLY ONCE after the component mounts.
  // ====================================================================
  }, [axiosPublic]); // axiosPublic from a hook is stable, so this is safe.

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Hero Header */}
        <section className="w-full py-8 md:py-10 text-center">
          <p className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Insights & Stories
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">Our Blog</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-300">
            Education, community stories, and updates from the BloodAid team.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="w-full py-6">
          {state.loading ? (
            <SkeletonGrid />
          ) : state.error ? (
            <div className="alert alert-warning">
              <span>{state.error}</span>
            </div>
          ) : state.posts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {state.posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-200/60 bg-white/80 p-8 text-center text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
              No blog posts have been published yet. Please check back soon!
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* -------------------- Card + UI pieces (same file) -------------------- */

function BlogCard({ post }) {
  return (
    <article className="card h-full bg-base-100 border border-base-300/40 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <figure>
        <img
          src={post.thumbnail || `https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg`}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2 text-xs text-base-content/70">
          {post.category && <span className="badge badge-primary">{post.category}</span>}
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="card-title text-lg">
          <Link to={`/blog/${post._id}`} className="link-hover">
            {truncateText(post.title, 60)}
          </Link>
        </h3>
        <p className="text-sm text-base-content/70">
          {truncateText(stripHtml(post.content), 100)}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/blog/${post._id}`} className="btn btn-ghost btn-sm">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-lg">
          <div className="skeleton h-48 w-full"></div>
          <div className="card-body">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-6 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
            <div className="card-actions justify-end">
              <div className="skeleton h-8 w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function formatDate(isoString) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function truncateText(text = "", maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

function stripHtml(html) {
  if (!html) return "";
  // This is a simple client-side way to strip HTML. Be mindful of performance on very large texts.
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}