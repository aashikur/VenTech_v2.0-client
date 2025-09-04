import { Link, NavLink } from "react-router";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { FaTachometerAlt, FaSignOutAlt, FaUserCircle, FaSignInAlt, FaUserPlus, FaUser, FaTimes } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import ToggleLightDark from "../ui/ToggleLightDark";
import TopNotice from "./TopNotice";
import { CiMenuFries } from "react-icons/ci";
import Swal from "sweetalert2";
import ThemeButton from "../ui/ThemeButton";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Products", path: "/products" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest("#mobileMenu") && !e.target.closest("#mobileMenuBtn")) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  return (
    <>
      <TopNotice />
      <nav className="sticky  top-0 z-[9999] w-full flex justify-center bg-white/80 dark:bg-[#18122B]/80 backdrop-blur-md border-b border-white/30 dark:border-gray-500/30 shadow-lg">
        <div className="max-w-[1500px] w-full flex items-center px-6 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-6">
            {/* Light theme gradient logo */}
            <span className="hidden md:block text-xl lg:text-2xl font-light bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 ">
              <span className="font-extrabold">Ven</span><span className="text-orange-600">Tech</span><span className="font-extrabold">.</span>
            </span>
            {/* Mobile logo */}
            <span className="md:hidden font-extrabold text-red-500 dark:text-white text-lg">VenT.</span>
          </Link>

          {/* Nav Items (Desktop) */}
          <div className="hidden sm:flex flex-1 items-center gap-6 ml-10">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium transition text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 ${isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "border-b-2 border-transparent"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right side: Auth (Desktop) */}
          <div className="flex items-center gap-3 sm:ml-auto ml-auto">
            <ToggleLightDark />
            {!user ? (
              <>
                {/* Login Button */}
                <NavLink
                  to="/login"
                  className="hidden sm:flex items-center justify-center px-8 py-2 gap-2 w-full  cursor-pointer rounded-full 
              border border-orange-500 text-orange-500 text-sm sm:text-base
              dark:text-white dark:border-white/60 
              hover:bg-orange-50 dark:hover:bg-gray-800 
              font-semibold transition"
                >
                  <FaSignInAlt /> Login
                </NavLink>

                {/* Register Button */}
                <NavLink
                  to="/registration"
                  className="hidden sm:flex items-center text-sm px-8 py-2 justify-center gap-2 w-full  cursor-pointer rounded-full 
              bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  sm:text-base
              text-white font-semibold shadow-lg hover:opacity-90 transition"
                >
                  <FaUserPlus /> Register
                </NavLink>
              </>
            ) : (
              <div className="relative group hidden sm:block">
                <button
                  className="flex items-center gap-2 font-semibold rounded-full
          bg-red-100 text-red-500 dark:bg-[#393053] dark:text-white
          shadow hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition"
                >
                  {user.photoURL ? (
                    <img className="w-9 h-9 rounded-full" src={user.photoURL} alt="" />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                </button>

                {/* Dropdown */}
                <div
                  className="absolute right-0 mt-2 w-44 rounded-xl shadow-lg py-2 z-50
          bg-white dark:bg-[#393053]
          opacity-0 group-hover:opacity-100 pointer-events-auto transition"
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2
            text-gray-700 dark:text-gray-200
            hover:text-red-500 hover:border-b-2 hover:border-red-500 transition"
                  >
                    <FaTachometerAlt className="inline mr-2" /> Dashboard
                  </Link>

                  <button
                    className="block w-full text-left px-4 py-2
            text-red-500 dark:text-red-400
            hover:text-red-700 dark:hover:text-red-500 transition"
                    onClick={() => {
                      logOut().then(() => {
                        Swal.fire({
                          icon: "success",
                          title: "Logout Successful",
                        });
                      });
                    }}
                  >
                    <FaSignOutAlt className="inline mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <button
            id="mobileMenuBtn"
            className="sm:hidden text-2xl ml-4"
            onClick={() => setMobileMenuOpen(true)}
          >
            <CiMenuFries />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed  inset-0 z-[99999] bg-white dark:bg-[#18122B] flex flex-col items-center pt-10 px-4"
        >
          <button
            className="absolute top-4 right-4 text-3xl text-red-500 font-bold"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Auth section */}
          <div className="flex flex-col items-center gap-2 mb-6">
            {user ? (
              <>
                {user.photoURL ? (
                  <img className="w-16 h-16 border-2 rounded-full" src={user.photoURL} alt="" />
                ) : (
                  <FaUser className="w-16 h-16 text-red-500" />
                )}
                <div className="text-lg font-bold text-red-500">{user.displayName || user.email}</div>
              </>
            ) : (
              <div className="flex gap-2">
                <NavLink
                  to="/login"
                >
                </NavLink>

                <ThemeButton
                  onClick={() => setMobileMenuOpen(false)}
                  variant="outline" className="px-6 py-2  border-2  justify-center">
                    <FaSignInAlt /> Login
                </ThemeButton>
                <NavLink
                  to="/registration"
                  className=""
                  onClick={() => setMobileMenuOpen(false)}
                >
                 <ThemeButton variant="primary" className="px-6 py-2 justify-center">
                    <FaUserPlus /> Register
                  </ThemeButton>
                </NavLink>
              </div>
            )}
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded font-medium transition ${isActive
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-b-2 border-transparent"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
