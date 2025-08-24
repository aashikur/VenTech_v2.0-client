import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  FaHome, FaUser, FaUsers, FaRegListAlt, FaBlog, FaDonate, FaPlus, FaEdit, FaEnvelope,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import ToggleLightDark from "@/components/ui/ToggleLightDark";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import { BiLogOut } from "react-icons/bi";
import Swal from "sweetalert2";
import Loading from "@/pages/_fronted/home/Loading";
import SidebarLoading from "@/components/loading/SidebarLoading";

// Power links (admin/volunteer only)
const adminPowerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },

  { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage All Users" },
  { to: "/dashboard/manage-donations", icon: <FaRegListAlt />, label: "Manage Donations Request" },
  // { to: "/dashboard/all-blood-donation-request", icon: <FaRegListAlt />, label: "All Requests" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Content Management" },
  { to: "/dashboard/funding", icon: <FaDonate />, label: "All Funding" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "All Contacts" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Hospitals" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Drives" },

];

const volunteerPowerLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },

  { to: "/dashboard/all-blood-donation-request", icon: <FaRegListAlt />, label: "All Requests" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Contact Messages" },
  { to: "/dashboard/manage-donations", icon: <FaRegListAlt />, label: "Manage Donations" },
  { to: "/dashboard/content-management", icon: <FaBlog />, label: "Manage Blogs" },
  
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Hospitals" },
  { to: "/dashboard/contacts", icon: <FaEnvelope />, label: "Drives" },


];

// General links (all roles)
const generalLinks = [
  { to: "/dashboard", icon: <FaHome />, label: "Dashboard Home" },
  { to: "/dashboard/my-donation-requests", icon: <FaRegListAlt />, label: "My Requests" },
  { to: "/dashboard/create-donation-request", icon: <FaPlus />, label: "Create Request" },
  { to: "/dashboard/add-blog", icon: <FaEdit />, label: "Add Blog" },
  { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
];

export default function DashboardSidebar() {
  const { user , logOut} = useContext(AuthContext);
  const navigate = useNavigate();
  const { role, loading, status } = useRole();
  const [open, setOpen] = useState(window.innerWidth >= 768);

  const handleToggle = () => setOpen((prev) => !prev);

  // if (loading) return  <div className="bg-white h-screen w-[240px] flex items-center justify-center"><span className="loading loading-spinner text-error"></span></div>;



  if(loading) return <SidebarLoading></SidebarLoading>

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
            ? "bg-[#c30027] text-white shadow"
            : "text-[#18122B] dark:text-white hover:bg-[#c30027]/10"
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

  // Which power links to show
  let powerLinks = [];
  let powerTitle = "";
  if (role === "admin") {
    powerLinks = adminPowerLinks;
    powerTitle = "Admin Access";
  } else if (role === "volunteer") {
    powerLinks = volunteerPowerLinks;
    powerTitle = "Volunteer Access";
  }

  return (
    <aside
      className={`bg-white fixed  dark:bg-[#18122B] min-h-screen flex flex-col transition-all duration-300
        ${open ? "w-64 fixed" : "w-16"} 
        md:static z-50 left-0 top-0 md:top-auto md:left-auto border-r border-[#c30027]/10`}
    >
      {/* Top: Profile and Toggle */}
      <div className="flex flex-col items-center py-6 border-b border-[#c30027]/10">
        <NavLink
          to="/"
          className="mb-4 flex items-center gap-2 px-3 py-1 rounded-full text-[#c30027] font-semibold text-[1rem] transition"
        >
          {open && <span className="flex gap-2 items-center"><BsArrowLeft /> Visit Website</span>}
        </NavLink>
        <img
          src={user?.photoURL || "/logo/icon-2.png"}
          alt="Profile"
          className="w-14 h-14 rounded-full border-2 border-[#c30027] mb-2"
        />
        {open && (
          <>
            <div className="font-bold text-[#c30027] text-base">
                  {user?.displayName || "User"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-300 capitalize">
                 {role}
              <span className="border  border-gray-300 px-2 rounded-full dark:border-gray-600 text-[.6rem]">   
                {status ? status : 'user'}
              </span> 
               <BiLogOut onClick={handleLogout} title="Logout" className="inline-block ml-1 dark:text-red-400 cursor-pointer" />
            </div>
           
          </>
        )}
        <button
          onClick={handleToggle}
          className="mt-4 p-2 rounded-full dark:bg-[#393053] shadow bg-[#c30027] text-white transition"
        >
          {open ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Power Section (Admin/Volunteer) */}
      {powerLinks.length > 0 && (
        <div className="mt-6">
          <div className={`px-4 mb-2 text-xs font-bold uppercase tracking-wider text-[#c30027] ${open ? "" : "hidden"}`}>
            {powerTitle}
          </div>
          <nav className="flex flex-col gap-1">{renderLinks(powerLinks)}</nav>
        </div>
      )}

      {/* General Section (All roles) */}
      <div className="mt-6">
        <div className={`px-4 mb-2 text-xs font-bold uppercase tracking-wider text-[#c30027] ${open ? "" : "hidden"}`}>
          General
        </div>
        <nav className="flex flex-col gap-1">{renderLinks(
          (role === "admin" || role === "volunteer") ?
            generalLinks.slice(1)
            :
            // generalLinks.filter(link => link.label !== "Create Request")
            generalLinks
        )}</nav>

      </div>

      {/* Dark - Light Mode  */}
      <div className="flex justify-center items-center py-4 mt-auto">
        <ToggleLightDark />{open && <span className="ml-2 text-xs">Dark/Light Mode</span>}
      </div>
    </aside>
  );
}