import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";
import SidebarLoading from "@/components/loading/SidebarLoading";
import Swal from "sweetalert2";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaPlus,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const LINKS = {
  admin: [
    { to: "/dashboard/manage-users", icon: <FaUsers />, label: "Manage Users" },
    { to: "/dashboard/pending-merchant", icon: <FaBoxOpen />, label: "Pending Merchants" },
    { to: "/dashboard/mailbox", icon: <FaShoppingCart />, label: "Mail Box" },
    { to: "/dashboard/analytics", icon: <FaChartBar />, label: "Analytics" },
  ],
  merchant: [
    { to: "/dashboard/my-products", icon: <FaBoxOpen />, label: "My Products" },
    { to: "/dashboard/add-product", icon: <FaPlus />, label: "Add Product" },
    { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
    { to: "/dashboard/shop-analytics", icon: <FaChartBar />, label: "Shop Analytics" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Shop Profile" },
  ],
  customer: [
    { to: "/dashboard/my-orders", icon: <FaShoppingCart />, label: "My Orders" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "My Profile" },
  ],
};

// Demo Data for Charts
const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 800 },
  { name: "Apr", sales: 500 },
  { name: "May", sales: 700 },
];

const pieData = [
  { name: "Electronics", value: 40 },
  { name: "Fashion", value: 25 },
  { name: "Groceries", value: 20 },
  { name: "Others", value: 15 },
];
const COLORS = ["#ec4899", "#f97316", "#facc15", "#22c55e"];

const barData = [
  { name: "Merchant A", orders: 120 },
  { name: "Merchant B", orders: 98 },
  { name: "Merchant C", orders: 140 },
  { name: "Merchant D", orders: 80 },
];

export default function DashboardOverview() {
  
  const navigate = useNavigate();

  const { user, logOut } = useContext(AuthContext);
  const { role, loading } = useRole();

  if (loading) return <SidebarLoading />;

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/"); 
      Swal.fire({ icon: "success", title: "Logout Successful" });
    });
  };

  const roleLinks = LINKS[role || "customer"];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      {/* Greeting + Profile */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              {user?.displayName || "User"}
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-1">
            Role: {role || "Customer"}
          </p>
        </motion.div>

        {/* Profile + Logout */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img
            src={user?.photoURL || "/logo/logo-V.png"}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-pink-500 object-cover"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90 transition"
          >
            <BiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Dashboard Grid: Navigation Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {roleLinks.map((item) => (
          <motion.div
            key={item.to}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
          >
            <NavLink
              to={item.to}
              className="group block p-6 rounded-2xl shadow-md bg-white dark:bg-[#18122B] hover:shadow-xl transition relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10" />
              <div className="relative flex flex-col items-center justify-center gap-3 text-center">
                <span className="text-3xl text-pink-500">{item.icon}</span>
                <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                  {item.label}
                </h2>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sales Trend */}
        <motion.div
          className="bg-white dark:bg-[#18122B] rounded-2xl shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Sales Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ec4899"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          className="bg-white dark:bg-[#18122B] rounded-2xl shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Merchants */}
        <motion.div
          className="bg-white dark:bg-[#18122B] rounded-2xl shadow p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Top Merchants by Orders
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
