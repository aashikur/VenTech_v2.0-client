import { Outlet } from "react-router";
import { useState } from "react";
import DashboardSidebar from "@/pages/dashboard/DashboardSidebar";
import { FiBell, FiSearch } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";

// 🔹 Dashboard Layout
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-[#FDEDF3] dark:bg-[#18122B]">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      
      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <DashboardNavbar setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 w-full max-w-6xl   md:ml-12 xl:mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// 🔹 Top Navbar Component
export function DashboardNavbar({ setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#1f1b2e] shadow flex items-center justify-between px-4 py-3">
      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-md md:hidden"
        >
          ☰
        </button>
        <h1 className=" hidden font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Dashboard
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 border rounded-full dark:border-gray-700">
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-32"
          />
        </div>

        {/* Notifications */}
        <button className="relative">
          <FiBell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <BiUserCircle size={26} className="cursor-pointer hover:text-pink-500" />
      </div>
    </header>
  );
}

export default DashboardLayout;
