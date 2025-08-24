import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/axiosPublic";
import Loading from "../home/Loading";

const categories = ["All", "Blog", "Story", "Success"];

export default function Blog() {
  const axiosPublic = useAxiosPublic();
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Fetch all published blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["public-blogs"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/blogs?status=published");
      return data;
    },
  });

  // Filter by category
  const filteredBlogs =
    category === "All"
      ? blogs
      : blogs.filter((b) => b.category === category);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / pageSize);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (isLoading) return <Loading></Loading>

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#18122B] pb-10">
      {/* Top Banner */} 

      <div className="w-full flex flex-col items-center justify-center bg-pink-100 dark:bg-[#393053] rounded-b-[3rem]">
        {/* <img src="/logo/blog-1.png" alt="Blog Banner" className="w-60 h-40 object-contain mt-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#c30027] mt-2 mb-2 text-center">
          BloodAid <span className="text-black dark:text-white">Blog</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-200 text-center max-w-xl">
          Discover stories, tips, and news from our amazing blood donation community. Stay informed and inspired!
        </p> */}
        <div className="w-full hidden sm:block  max-w-7xl relative h-80">
            {/* <img className="w-full rounded-xl mt-10 h-80 blur-[2px] object-cover" src="/logo/blog-4.png" alt="" /> */}
            <img className="absolute top-1/3 left-2/8 w-50" src="/logo/blog-1.png" alt="" />
            <img className="absolute top-1/3 right-2/8 w-50" src="/logo/blog-1.png" alt="" />
            <img className="absolute top-1/3 right-1/2 translate-x-1/2 w-50" src="/logo/blog-5.png" alt="" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mt-8 mb-6 p-10 rounded-3xl">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full font-semibold text-sm ${
              category === cat
                ? "bg-[#c30027] text-white"
                : "bg-white dark:bg-[#393053] text-[#c30027] border border-[#c30027]/30"
            }`}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 bg- sm:grid-cols-2 md:grid-cols-4 gap-8 px-2 bg-red-">
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
        (!blog) ? (<div><span className="loading loading-spinner text-error"></span></div>) : (    <div
              key={blog._id}
              className=" dark:bg-[#18122B] rounded-2xl border-[#c30027]/10 flex flex-col overflow-hidden"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {blog.category && (
                    <span className="px-2 py-1 rounded-full bg-[#c30027] text-white text-xs font-bold">
                      {blog.category}
                    </span>
                  )}
                  {blog.status === "published" && (
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      Published
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1 text-[#c30027]">{blog.title.slice(0, 30)}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
                  {blog.content.slice(0, 80)}...
                </p>
              <div className="pt-4 flex-1 flex  justify-between">
                  <div className="flex items-center gap-2 mt-3">
                  {blog.authorPhoto && (
                    <img
                      src={blog.authorPhoto}
                      alt="Author"
                      className="w-8 h-8 rounded-full border"
                    />
                  )}
                  <span className="text-xs text-gray-500">{blog.author}</span>
                </div>
                <button
                  className="mt-4 cursor-pointer underline py-2  rounded-full text-[#c30027] font-semibold  transition text-xs"
                  onClick={() => window.location.href = `/blogs/${blog._id}`}
                >
                  More
                </button>
              </div>
              </div>
            </div>)
          ))
        ) : (
          <div className="col-span-full text-center p-4 text-gray-400">
            No blogs found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="px-4 py-2 rounded-full bg-gray-200 text-[#c30027] font-semibold"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          &lt; Back
        </button>
        <span className="px-4 py-2 font-semibold">{page} / {totalPages || 1}</span>
        <button
          className="px-4 py-2 rounded-full bg-gray-200 text-[#c30027] font-semibold"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}