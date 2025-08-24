import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaPlus, FaEdit, FaTrash, FaList, FaUser, FaBook, FaEllipsisV, FaGlobe, FaUpload, FaRegEdit } from "react-icons/fa";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import useDashboardStars from "@/hooks/useDashboardStars";
import Loading from "@/pages/_fronted/home/Loading";

export default function ManageBlogs() {

  const dataDashboard = useDashboardStars();
  console.log(dataDashboard);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role } = useRole();

  // Search/filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch all blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/blogs");
      return data;
    },
  });

  // Fetch total users (optional)
  const { data: users = [] } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/get-users");
      return data;
    },
  });

  // Filtered blogs
  const filteredBlogs = blogs
    .filter(
      (blog) =>
        blog.title?.toLowerCase().includes(search.toLowerCase()) ||
        blog.author?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((blog) =>
      statusFilter === "all" ? true : blog.status === statusFilter
    );

  // Delete blog
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c30027",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blogs/${id}`).then(() => {
          Swal.fire("Deleted!", "Blog deleted.", "success");
          queryClient.invalidateQueries(["all-blogs"]);
        });
      }
    });
  };

  // Publish/Unpublish blog (admin only)
  const handlePublish = (id, status) => {
    Swal.fire({
      title: status === "published" ? "Unpublish this blog?" : "Publish this blog?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c30027",
      confirmButtonText: status === "published" ? "Unpublish" : "Publish",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/blogs/${id}/publish`, { status: status === "published" ? "draft" : "published" })
          .then(() => {
            queryClient.invalidateQueries(["all-blogs"]);
            Swal.fire("Success!", `Blog ${status === "published" ? "unpublished" : "published"}!`, "success");
          });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  // Summary stats
  const myBlogs = blogs?.map((b) => b.authorEmail === users?.email);
  const totalBlogs = blogs.length;
  const totalUsers = users.length;


  // console.log(blogs);
  blogs.map((blog, i) => {
    // console.log(i +1 +". "+blog.authorEmail)
  })
  // console.log("Users", users)

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          icon={<FaBook className="text-2xl text-[#c30027]" />}
          label="My Blogs"
          value={myBlogs}
          color="from-[#c30027] to-pink-400"
        />
        <SummaryCard
          icon={<FaBook className="text-2xl text-blue-600" />}
          label="Total Blogs"
          value={totalBlogs}
          color="from-blue-400 to-blue-200"
        />
        <SummaryCard
          icon={<FaUser className="text-2xl text-green-600" />}
          label="Total Users"
          value={totalUsers}
          color="from-green-400 to-green-200"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <ActionCard
          icon={<FaPlus className="text-3xl" />}
          label="Add Blog"
          color="from-[#c30027] to-pink-400"
          onClick={() => navigate("/dashboard/add-blog")}
        />
        <ActionCard
          icon={<FaEdit className="text-3xl" />}
          label="Edit Blog"
          color="from-blue-400 to-blue-200"
          onClick={() => Swal.fire("Coming soon!", "Edit Blog feature coming soon.", "info")}
        />
      </div>

      {/* Search & Status Filter */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="🔍 Search Blogs by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-full border border-[#c30027]/30 bg-[#FDEDF3] dark:bg-[#393053] outline-none"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="rounded px-2 py-1 text-sm dark:bg-[#2d2b40]"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#18122B] rounded-2xl shadow-md border border-[#c30027]/10">
          <thead>
            <tr className="bg-[#FDEDF3] dark:bg-[#393053] text-[#c30027]">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, idx) => (
                <tr key={blog._id} className="border-t">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    <img
                      src={blog.thumbnail}
                      alt="Thumbnail"
                      className="w-14 h-10 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="p-3 font-semibold">{blog.title}</td>
                  <td className="p-3 flex items-center gap-2">
                    {blog.authorPhoto && (
                      <img
                        src={blog.authorPhoto}
                        alt="Author"
                        className="w-8 h-8 rounded-full border"
                      />
                    )}
                    <span>{blog.author}</span>
                  </td>
                  <td className="p-3 capitalize ">
                    <div className="flex  justify-between max-w-[160px]  \">
                      <span
                        className={`px-2 py-1 flex items-center rounded-full text-[.6rem] font-bold ${blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {blog.status}
                      </span>
                      {/* Publish/Unpublish button (admin only) */}
                      {role === "admin" && (
                        <button
                          className={`ml-2 btn h-7 px-2 py-1 flex gap-[2px] items-center text-white bg-red-700 rounded-full text-xs font-semibold`}
                          onClick={() => handlePublish(blog._id, blog.status)}
                        >
                          <FaRegEdit />
                          {blog.status === "published" ? "Unpublish" : "Publish"}

                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-3 relative">
                    <div className="dropdown dropdown-end">
                      <button tabIndex={0} className="btn btn-ghost btn-sm">
                        <FaEllipsisV />
                      </button>
                      <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-32">
                        <li>
                          <button onClick={() => navigate(`/blogs/${blog._id}`)}>
                            View
                          </button>
                        </li>
                        <li>
                          <button onClick={() => Swal.fire("Coming soon!", "Edit Blog feature coming soon.", "info")}>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Summary Card Component
function SummaryCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-2 shadow-lg bg-gradient-to-tr ${color} relative overflow-hidden`}>
      <div className="absolute right-4 top-4 opacity-20">{icon}</div>
      <div className="text-white text-lg font-semibold">{label}</div>
      <div className="text-3xl font-extrabold text-white">{value}</div>
    </div>
  );
}

// Action Card Component
function ActionCard({ icon, label, color, onClick }) {
  return (
    <button
      className={`rounded-2xl p-8 flex flex-col items-center justify-center gap-3 shadow-lg bg-gradient-to-tr ${color} text-white font-bold text-lg w-full h-40 transition hover:scale-105`}
      onClick={onClick}
      type="button"
    >
      <span className="text-3xl">{icon}</span>
      {label}
    </button>
  );
}