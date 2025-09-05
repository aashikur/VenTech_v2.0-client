import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { FaHome, FaUser, FaUsers, FaBoxOpen, FaShoppingCart, FaPlus, FaChartBar } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ToggleLightDark from "@/components/ui/ToggleLightDark";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import SidebarLoading from "@/components/loading/SidebarLoading";
import Swal from "sweetalert2";

// VenTech Marketplace links
const LINKS = {
  admin: [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
    { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
    { to: "/dashboard/pending-merchant", icon: <FaBoxOpen />, label: "Pending Merchants" },
    // { to: "/dashboard/manage-orders", icon: <FaShoppingCart />, label: "Manage Orders" },
    { to: "/dashboard/mailbox", icon: <FaShoppingCart />, label: "Mail Box" },
    { to: "/dashboard/analytics", icon: <FaChartBar />, label: "Analytics" },
  ],
  merchant: [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
    { to: "/dashboard/my-products", icon: <FaBoxOpen />, label: "My Products" },
    { to: "/dashboard/add-product", icon: <FaPlus />, label: "Add Product" },
    { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
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
          ${isActive ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow" : "text-[#18122B] dark:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-red-500/10 hover:to-yellow-500/10"}
          ${open ? "justify-start" : "justify-center"}`
        }
        title={item.label}
        end
      >
        <span className="text-lg">{item.icon}</span>
        {open && <span>{item.label}</span>}
      </NavLink>
    ));

  return (
    <aside
      className={`bg-white dark:bg-[#18122B] min-h-screen flex flex-col transition-all duration-300
        ${open ? "w-64" : "w-16"} border-r border-pink-500/10 fixed z-50`}
    >
      {/* Top: Profile */}
      <div className="flex flex-col items-center py-6 border-b border-pink-500/10">
        <NavLink to="/" className={`mb-4 flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-[1rem] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}>
          {open && <span className="flex gap-2 items-center"><BsArrowLeft /> Visit Marketplace</span>}
        </NavLink>

        <div className="relative">
          <img
            src={user?.photoURL || "/logo/logo-V.png"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 mb-2 object-cover border-pink-500"
          />
        </div>

        {open && (
          <>
            <div className="font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">{user?.displayName || "User"}</div>
            <div className="text-xs text-gray-500 dark:text-gray-300 flex items-center gap-1 capitalize">
              <span>{role || "Customer"}</span>
              <BiLogOut onClick={handleLogout} title="Logout" className="ml-1 text-red-400 cursor-pointer hover:text-red-600" />
            </div>
          </>
        )}

        <button onClick={toggleSidebar} className="mt-4 p-2 rounded-full shadow text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:shadow-lg">
          {open ? <BsArrowLeft /> : <BsArrowRight />}
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-1 mt-6 px-2">{renderLinks()}</nav>

      {/* Dark Mode Toggle */}
      <div className="flex justify-center items-center py-4 mt-auto">
        <ToggleLightDark />
        {open && <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Theme</span>}
      </div>
    </aside>
  );
}
