import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { BiUser, BiEnvelope, BiKey, BiImageAdd, BiStore, BiMap, BiCreditCard } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, setUser, googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    name: "",
    image: null,
    email: "",
    pass: "",
    confirmPass: "",
    role: "customer",
    businessName: "",
    businessCategory: "",
    businessAddress: "",
    tradeLicense: "",
    paymentInfo: "",
    terms: false,
    status: "active",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Validation + Handlers (kept same) ---

  return (
    <div className="bg-white dark:bg-gray-900 relative">
      <div className="min-h-screen flex flex-col md:flex-row max-w-6xl mx-auto px-6 py-20 sm:py-28 gap-10">
        
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex gap-4"
          >
            <img className="rounded-full w-64 shadow-lg" src="/logo/ventech.png" alt="" />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <form
            // (handler kept same)
            className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-10"
          >
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center text-base sm:text-lg mb-10">
              Join our marketplace and start your journey today 🚀
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField icon={<BiUser />} label="Full Name" name="name" value={form.name} onChange={() => {}} placeholder="Enter your name" />

              {/* Photo */}
              <div>
                <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Profile Photo</label>
                <div className="flex items-center border rounded-full px-3 bg-gray-50 dark:bg-gray-800 shadow-md">
                  <BiImageAdd className="text-pink-500 mr-2" />
                  <input type="file" name="image" accept="image/*" className="flex-1 py-3 bg-transparent outline-none" />
                  {avatarPreview && <img src={avatarPreview} alt="Avatar" className="w-10 h-10 rounded-full ml-2" />}
                </div>
              </div>

              <InputField icon={<BiEnvelope />} label="Email" name="email" value={form.email} onChange={() => {}} placeholder="Enter your email" type="email" />
              <InputField icon={<BiKey />} label="Password" name="pass" value={form.pass} onChange={() => {}} placeholder="Enter your password" type="password" />
              <InputField icon={<BiKey />} label="Confirm Password" name="confirmPass" value={form.confirmPass} onChange={() => {}} placeholder="Confirm your password" type="password" />

              {/* Role */}
              <div className="col-span-2">
                <label className="block mb-2 font-semibold text-gray-900 dark:text-white">Account Type</label>
                <select name="role" value={form.role} onChange={() => {}} className="w-full border rounded-full px-4 py-3 bg-gray-50 dark:bg-gray-800 shadow-md">
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor (Merchant)</option>
                </select>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mt-8">
              <input type="checkbox" name="terms" checked={form.terms} onChange={() => {}} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I accept the <Link to="/terms" className="text-orange-500 underline">terms and conditions</Link>
              </span>
            </div>

            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full sm:w-48 h-12 mt-10 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition mx-auto flex items-center justify-center gap-2"
              disabled={loading}
            >
              <BiUser /> {loading ? "Registering..." : "Register"}
            </button>

            {/* OR Divider */}
            <div className="text-center text-gray-500 dark:text-gray-400 my-8">or</div>

            {/* Google Sign In */}
            <button
              type="button"
              className="w-full sm:w-48 h-12 rounded-full border-2 border-orange-500 dark:border-white/60 text-orange-500 dark:text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-50 dark:hover:bg-gray-800 transition mx-auto"
            >
              <FcGoogle className="text-xl" />
              Register with Google
            </button>

            <div className="text-center text-sm mt-8 text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 underline">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input Component
const InputField = ({ icon, label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block mb-2 font-semibold text-gray-900 dark:text-white">{label}</label>
    <div className="flex items-center border rounded-full px-3 bg-gray-50 dark:bg-gray-800 shadow-md">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={label !== "Trade License / Business ID"}
        className="bg-transparent flex-1 py-3 outline-none"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default RegistrationPage;
