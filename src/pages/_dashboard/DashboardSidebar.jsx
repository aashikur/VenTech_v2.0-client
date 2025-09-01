import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  FaHome, FaUser, FaUsers, FaRegListAlt, FaBlog, FaStore, FaPlus, FaEdit, FaEnvelope,
  FaChevronLeft, FaChevronRight, FaShoppingCart, FaBoxOpen, FaChartBar
} from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ToggleLightDark from "@/components/ui/ToggleLightDark";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";
import SidebarLoading from "@/components/loading/SidebarLoading";

// VenTech Admin links
const venTechAdminLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage All Users" },
  { to: "/dashboard/manage-merchants", icon: <FaStore />, label: "Manage Merchants" },
  { to: "/dashboard/manage-products", icon: <FaBoxOpen />, label: "Manage Products" },
  { to: "/dashboard/manage-orders", icon: <FaShoppingCart />, label: "Manage Orders" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Content Management" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Customer Support" },
  { to: "/dashboard/analytics", icon: <FaChartBar />, label: "Analytics" },
];

// VenTech Merchant links
const venTechMerchantLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/my-products", icon: <FaBoxOpen />, label: "My Products" },
  { to: "/dashboard/add-product", icon: <FaPlus />, label: "Add Product" },
  { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
  { to: "/dashboard/shop-analytics", icon: <FaChartBar />, label: "Shop Analytics" },
  { to: "/dashboard/all-products", icon: <FaRegListAlt />, label: "Browse Products" },
];

// VenTech Customer links
const venTechCustomerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
  { to: "/dashboard/wishlist", icon: <FaRegListAlt />, label: "My Wishlist" },
  { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
];

// VenTech Merchant general links
const venTechMerchantGeneralLinks = [
  { to: "/dashboard/profile", icon: <FaUser />, label: "Shop Profile" },
  { to: "/dashboard/add-blog", icon: <FaEdit />, label: "Add Blog" },
];

// Legacy Blood Donation System Links
const legacyAdminLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage All Users" },
  { to: "/dashboard/manage-donations", icon: <FaRegListAlt />, label: "Manage Donations Request" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Content Management" },
  { to: "/dashboard/funding", icon: <FaStore />, label: "All Funding" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "All Contacts" },
];

const legacyVolunteerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/all-blood-donation-request", icon: <FaRegListAlt />, label: "All Requests" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Contact Messages" },
  { to: "/dashboard/manage-donations", icon: <FaRegListAlt />, label: "Manage Donations" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Manage Blogs" },
];

const legacyDonorLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/my-donation-requests", icon: <FaRegListAlt />, label: "My Requests" },
  // { to: "/dashboard/create-donation-request", icon: <FaPlus />, label: "Create Request" },
  { to: "/dashboard/add-blog", icon: <FaEdit />, label: "Add Blog" },
  { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
];

export default function DashboardSidebar() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { role, loading, status, isVenTech, backendRole } = useRole();
  const [open, setOpen] = useState(window.innerWidth >= 768);

  const handleToggle = () => setOpen((prev) => !prev);

  if (loading) return <SidebarLoading></SidebarLoading>

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful',
        text: 'You have successfully logged out.',
      })
      navigate("/");
    });
  }

  // Sidebar section rendering helper
  const renderLinks = (links) =>
    links.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${isActive
            ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow"
            : "text-[#18122B] dark:text-white hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-red-500/10 hover:to-yellow-500/10"
          }
          ${open ? "justify-start" : "justify-center"}
          text-[15px]`
        }
        title={item.label}
        end
      >
        <span className="text-lg">{item.icon}</span>
        {open && <span>{item.label}</span>}
      </NavLink>
    ));

  // Role-based navigation logic
  let powerLinks = [];
  let generalLinks = [];
  let powerTitle = "";
  let generalTitle = "General";

  if (isVenTech) {
    // VenTech Marketplace Users
    if (role === "admin") {
      powerLinks = venTechAdminLinks;
      powerTitle = "Admin Controls";
      generalLinks = [
        { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
      ];
    } else if (role === "merchant") {
      powerLinks = venTechMerchantLinks;
      powerTitle = "Merchant Tools";
      generalLinks = venTechMerchantGeneralLinks;
    } else if (role === "customer") {
      powerLinks = [];
      powerTitle = "";
      generalLinks = venTechCustomerLinks;
      generalTitle = "Customer Menu";
    }
  } else {
    // Legacy Blood Donation System Users
    // Use backendRole for legacy users since they don't have role mapping
    const actualRole = backendRole || role;
    
    if (actualRole === "admin") {
      powerLinks = legacyAdminLinks;
      powerTitle = "Admin Access";
      generalLinks = [
        { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
      ];
    } else if (actualRole === "volunteer") {
      powerLinks = legacyVolunteerLinks;
      powerTitle = "Volunteer Access";
      generalLinks = [
        { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
        { to: "/dashboard/add-blog", icon: <FaEdit />, label: "Add Blog" },
      ];
    } else if (actualRole === "donor") {
      powerLinks = [];
      powerTitle = "";
      generalLinks = legacyDonorLinks;
      generalTitle = "Customer Menu";
    }
  }

  // Get display role for UI
  const getDisplayRole = () => {
    if (isVenTech) {
      // VenTech users - use frontend role
      if (role === "customer") return "Customer";
      if (role === "merchant") return "Merchant";
      if (role === "admin") return "Admin";
    } else {
      // Legacy users - use backend role
      const actualRole = backendRole || role;
      if (actualRole === "donor") return "Customer";
      if (actualRole === "volunteer") return "Marchent";
      if (actualRole === "admin") return "Admin";
    }
    return "Customer";
  };

  // Get status badge color
  const getStatusColor = () => {
    if (status === "active") return "text-green-600";
    if (status === "pending") return "text-orange-600";
    if (status === "blocked") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <aside
      className={`bg-white fixed dark:bg-[#18122B] min-h-screen flex flex-col transition-all duration-300
        ${open ? "w-64 fixed" : "w-16"} 
        md:static z-50 left-0 top-0 md:top-auto md:left-auto border-r ${
          isVenTech ? "border-pink-500/10" : "border-[#c30027]/10"
        }`}
    >
      {/* Top: Profile and Toggle */}
      <div className={`flex flex-col items-center py-6 border-b ${
        isVenTech ? "border-pink-500/10" : "border-[#c30027]/10"
      }`}>
        <NavLink
          to="/"
          className={`mb-4 flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-[1rem] transition ${
            isVenTech 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" 
              : "text-[#c30027]"
          }`}
        >
          {open && (
            <span className="flex gap-2 items-center">
              <BsArrowLeft /> 
              Visit {isVenTech ? 'Marketplace' : 'Website'}
            </span>
          )}
        </NavLink>
        
        <div className="relative">
          <img
            src={user?.photoURL || "/logo/logo-V.png"}
            alt="Profile"
            className={`w-14 h-14 rounded-full border-2 mb-2 object-cover ${
              isVenTech 
                ? "border-pink-500" 
                : "border-[#c30027]"
            }`}
          />
          {isVenTech && (
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-1 py-0.5 rounded-full text-[8px] font-bold">
              VT
            </div>
          )}
        </div>

        {open && (
          <>
            <div className={`font-bold text-base ${
              isVenTech 
                ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" 
                : "text-[#c30027]"
            }`}>
              {user?.displayName || "User"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300 capitalize flex items-center gap-1">
              <span>{getDisplayRole()}</span>
              <span className={`border border-gray-300 px-2 rounded-full dark:border-gray-600 text-[.6rem] ${getStatusColor()}`}>   
                {status || 'active'}
              </span> 
              <BiLogOut 
                onClick={handleLogout} 
                title="Logout" 
                className="inline-block ml-1 text-red-400 cursor-pointer hover:text-red-600" 
              />
            </div>
          </>
        )}
        
        <button
          onClick={handleToggle}
          className={`mt-4 p-2 rounded-full shadow text-white transition hover:shadow-lg ${
            isVenTech 
              ? "bg-gradient-to-r from-pink-500 to-yellow-500 dark:bg-gradient-to-r dark:from-pink-600 dark:to-yellow-600" 
              : "bg-[#c30027] dark:bg-[#393053]"
          }`}
        >
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Power Section */}
      {powerLinks.length > 0 && (
        <div className="mt-6">
          <div className={`px-4 mb-2 text-xs font-bold uppercase tracking-wider ${open ? "" : "hidden"} ${
            isVenTech 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500" 
              : "text-[#c30027]"
          }`}>
            {powerTitle}
          </div>
          <nav className="flex flex-col gap-1 px-2">{renderLinks(powerLinks)}</nav>
        </div>
      )}

      {/* General Section */}
      {generalLinks.length > 0 && (
        <div className="mt-6">
          <div className={`px-4 mb-2 text-xs font-bold uppercase tracking-wider ${open ? "" : "hidden"} ${
            isVenTech 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500" 
              : "text-[#c30027]"
          }`}>
            {generalTitle}
          </div>
          <nav className="flex flex-col gap-1 px-2">{renderLinks(generalLinks)}</nav>
        </div>
      )}

      {/* VenTech Badge */}
      {isVenTech && open && (
        <div className="mx-4 mt-6 p-3 bg-gradient-to-r from-pink-50 to-yellow-50 dark:from-pink-900/20 dark:to-yellow-900/20 rounded-lg border border-pink-200 dark:border-pink-700">
          <div className="text-xs text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-bold">VenTech</span>
            <br />
            <span className="text-gray-600 dark:text-gray-400">Marketplace</span>
          </div>
        </div>
      )}

      {/* Dark - Light Mode */}
      <div className="flex justify-center items-center py-4 mt-auto">
        <ToggleLightDark />
        {open && <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">Theme</span>}
      </div>
    </aside>
  );
}