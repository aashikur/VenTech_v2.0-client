import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaPlus,
  FaChartBar,
  FaListAlt,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import ToggleLightDark from "@/components/ui/ToggleLightDark";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import SidebarLoading from "@/components/loading/SidebarLoading";
import Swal from "sweetalert2";

const LINKS = {
  admin: [
    
    
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
    { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
    { to: "/dashboard/categories", icon: <FaListAlt />, label: "Categories" },
    { to: "/dashboard/pending-merchant", icon: <FaBoxOpen />, label: "Pending Merchants" },
    { to: "/dashboard/mailbox", icon: <FaShoppingCart />, label: "Mail Box" },
    { to: "/dashboard/analytics", icon: <FaChartBar />, label: "Analytics" },
  ],
  merchant: [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
    { to: "/dashboard/my-products", icon: <FaBoxOpen />, label: "My Products" },
    { to: "/dashboard/add-product", icon: <FaPlus />, label: "Add Product" },
    { to: "/dashboard/categories", icon: <FaListAlt />, label: "Categories" },
    { to: "/dashboard/my-requests", icon: <FaShoppingCart />, label: "My Request" },
    { to: "/dashboard/analytics", icon: <FaChartBar />, label: "Shop Analytics" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Shop Profile" },
  ],
  customer: [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
    { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
  ],
};

export default function DashboardSidebar() {
  const { user, logOut } = useContext(AuthContext);
  const { role, loading } = useRole();
  const navigate = useNavigate();

  const [open, setOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <SidebarLoading />;

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({ icon: "success", title: "Logout Successful" });
      navigate("/");
    });
  };

  const toggleSidebar = () => setOpen((prev) => !prev);

  const renderLinks = () =>
    LINKS[role || "customer"].map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow"
              : "text-[#18122B] dark:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-red-500/10 hover:to-yellow-500/10"
          }
          ${open ? "justify-start" : "justify-center"}`
        }
        title={item.label}
        end
        onClick={() => isMobile && setOpen(false)}
      >
        <span className="text-lg">{item.icon}</span>
        {open && <span>{item.label}</span>}
      </NavLink>
    ));

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-md"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-[#18122B] min-h-screen flex flex-col transition-all duration-300
          ${open ? (isMobile ? "w-full" : "w-64") : "w-0 md:w-16"}
          border-r border-pink-500/10 fixed z-40 overflow-hidden`}
      >
        {/* Desktop collapse button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute transition-all duration-300 cursor-pointer hover:scale-110 focus:scale-95 top-4 right-[17px] p-1 rounded-full shadow text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:shadow-lg z-50"
          >
            {open ? <BsArrowLeft /> : <BsArrowRight />}
          </button>
        )}
      {/* Back To VenTech Website */}
      { (
        <div className="m-4 translate-y-12">
          <Link className=" inline-flex border-pink-500/10 items-center border rounded-full  gap-1 text-sm font-bold" to="/">
            <img
              src="/logo/logo-V.png"
              alt="Logo"
              className="w-8 h-8 rounded object-cover"
            /> 
           {open && <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 pr-4 pl-1">VenTech</span>}
          </Link> 
        </div>
      )}
        {/* Links */}
        <nav className="flex flex-col gap-1 mt-16 px-2">{renderLinks()}</nav>

        {/* Bottom Profile + Theme + Logout */}
        {open && (
          <div className="mt-auto border-t border-pink-500/10 p-4 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center">
              <img
                src={user?.photoURL || "/logo/logo-V.png"}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 object-cover border-pink-500"
              />
              <div className="font-bold text-sm mt-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                {user?.displayName || "User"}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-300 capitalize">
                {role || "Customer"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ToggleLightDark />
              <BiLogOut
                onClick={handleLogout}
                title="Logout"
                className="text-red-400 cursor-pointer hover:text-red-600"
                size={20}
              />
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
