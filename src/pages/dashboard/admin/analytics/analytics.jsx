import { motion } from "framer-motion";
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

const COLORS = ["#ec4899", "#facc15", "#f43f5e", "#3b82f6"];

const salesData = [
  { month: "Jan", sales: 4000, orders: 2400 },
  { month: "Feb", sales: 3000, orders: 1398 },
  { month: "Mar", sales: 5000, orders: 2800 },
  { month: "Apr", sales: 2780, orders: 1908 },
  { month: "May", sales: 5890, orders: 4800 },
  { month: "Jun", sales: 6390, orders: 3800 },
];

const userRoleData = [
  { name: "Customers", value: 400 },
  { name: "Merchants", value: 200 },
  { name: "Admins", value: 10 },
  { name: "Pending Merchants", value: 50 },
];

const categoryData = [
  { category: "Electronics", products: 240 },
  { category: "Fashion", products: 139 },
  { category: "Home", products: 980 },
  { category: "Grocery", products: 390 },
];

export default function Analytics() {
  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#0f0f14] transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Platform Analytics
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of users, merchants, sales & product categories
        </p>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {[
          { label: "Total Customers", value: "1,200", color: "from-pink-500 to-red-500" },
          { label: "Active Merchants", value: "350", color: "from-yellow-500 to-orange-500" },
          { label: "Orders This Month", value: "2,890", color: "from-blue-500 to-indigo-500" },
          { label: "Pending Requests", value: "45", color: "from-green-500 to-emerald-500" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className={`p-6 rounded-2xl shadow-md text-white bg-gradient-to-r ${stat.color}`}
          >
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#18122B]"
        >
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Monthly Sales & Orders
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Role Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#18122B]"
        >
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
            User Roles Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userRoleData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {userRoleData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 rounded-2xl shadow-md bg-white dark:bg-[#18122B]"
        >
          <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Products by Category
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="products" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
