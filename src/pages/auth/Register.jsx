import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { BiUser, BiEnvelope, BiKey, BiStore, BiMap, BiCreditCard, BiPhone } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";
import LottieIcon from "@/components/shared/LottiesPlayer";
import GoogleButton from "@/components/auth/shared/GoogleButton";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, setUser, user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

useEffect(() => {
  if (user?.email) {
    navigate("/dashboard");
  }
}, [user, navigate]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
    role: "customer",
    shopName: "",
    shopNumber: "",
    shopAddress: "",
    tradeLicense: "",
    terms: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // New step state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass) && pass.length >= 6;

  const validateMerchantFields = () => {
    if (form.role === "merchant") {
      if (!form.shopName.trim()) {
        setError("Shop name is required for merchants.");
        return false;
      }
      if (!form.shopNumber.trim()) {
        setError("Shop number is required for merchants.");
        return false;
      }
      if (!form.shopAddress.trim()) {
        setError("Shop address is required for merchants.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    // For Merchant, step 1 is personal info, step 2 is shop info
    if (form.role === "merchant" && step === 1) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validatePassword(form.pass)) {
      setError("Password must include uppercase, lowercase, number, symbol, and be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (form.pass !== form.confirmPass) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!form.terms) {
      setError("You must accept the terms and conditions.");
      setLoading(false);
      return;
    }

    if (!validateMerchantFields()) {
      setLoading(false);
      return;
    }

      console.log("😍form data", form);

    try {
      const result = await createUser(form.email, form.pass);
      await updateUser({ displayName: form.name });
      const regUserData = { ...result.user, displayName: form.name };
      setUser(regUserData);

      const backendRole = form.role === "customer" ? "customer" : "merchant";

      const userPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: backendRole,
        status: form.role === "customer" ? "active" : "pending",
        loginCount: 1,
        ventech_user: true,
        frontend_role: form.role,
      };

      if (form.role === "merchant") {
        userPayload.roleRequest = { type: "merchant", status: "pending", requestedAt: new Date() };
        userPayload.shopDetails = {
          shopName: form.shopName,
          shopNumber: form.shopNumber,
          shopAddress: form.shopAddress,
          tradeLicense: form.tradeLicense || "",
        };
      }

      await axiosPublic.post("/api/v1/auth/add-user", userPayload);
      console.log("userPayload", userPayload);
      console.log("form data", form);


      const message =
        form.role === "customer"
          ? "Welcome to VenTech! You can start shopping now."
          : "Application submitted successfully! Please wait for admin approval to start selling.";

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: message,
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Please try again.");

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-8 px-6 py-12">
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6 pb-10 opacity-80 hover:opacity-100 transition"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                Welcome to VenTech
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {form.role === "customer"
                  ? "Discover amazing products from trusted merchants"
                  : "Start your online business journey with us"}
              </p>
            </div>
            <LottieIcon name="working" />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className={`w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 transition-all duration-300 ${
              form.role === "merchant" ? "max-w-4xl" : "max-w-lg"
            }`}
          >
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center mb-4">
              Join VenTech
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Create your {form.role === "customer" ? "shopping" : "merchant"} account
            </p>

            {/* Role Selection */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: "customer" });
                    setStep(1);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    form.role === "customer"
                      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  🛍️ Customer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...form, role: "merchant" });
                    setStep(1);
                  }}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    form.role === "merchant"
                      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  🏪 Merchant
                </button>
              </div>
            </div>

            {/* Google */}
                <GoogleButton/>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Step Form */}
            {step === 1 && (
              <div className="space-y-5">
                <InputField icon={<BiUser />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
                <InputField icon={<BiEnvelope />} label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email" />
                <InputField icon={<BiPhone />} label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
                <InputField icon={<BiKey />} label="Password" name="pass" value={form.pass} onChange={handleChange} placeholder="Enter your password" type="password" />
                <InputField icon={<BiKey />} label="Confirm Password" name="confirmPass" value={form.confirmPass} onChange={handleChange} placeholder="Confirm your password" type="password" />
              </div>
            )}

            {step === 2 && form.role === "merchant" && (
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">🏪 Shop Information</h3>
                <InputField icon={<BiStore />} label="Shop Name *" name="shopName" value={form.shopName} onChange={handleChange} placeholder="Enter your shop name" />
                <InputField icon={<BiCreditCard />} label="Shop Number *" name="shopNumber" value={form.shopNumber} onChange={handleChange} placeholder="Unique shop identifier" />
                <InputField icon={<BiMap />} label="Shop Address *" name="shopAddress" value={form.shopAddress} onChange={handleChange} placeholder="Enter your shop address" />
                <InputField icon={<BiCreditCard />} label="Trade License" name="tradeLicense" value={form.tradeLicense} onChange={handleChange} placeholder="Trade license number (optional)" required={false} />
              </div>
            )}

            {/* Terms */}
            {step === (form.role === "merchant" ? 2 : 1) && (
              <div className="flex items-center gap-2 mt-6 mb-4">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="rounded text-orange-500 focus:ring-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I accept the <Link to="/terms" className="text-orange-500 underline hover:text-orange-600">terms and conditions</Link>
                </span>
              </div>
            )}

            {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-4">{error}</div>}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4 mt-4">
              {step > 1 && <button type="button" onClick={handleBack} className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Back</button>}
              {step < (form.role === "merchant" ? 2 : 1) ? (
                <button type="button" onClick={handleNext} className="ml-auto w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition">Next</button>
              ) : (
                <button type="submit" disabled={loading} className="ml-auto w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    `Register as ${form.role === "customer" ? "Customer" : "Merchant"}`
                  )}
                </button>
              )}
            </div>

            {/* Status Note for Merchant */}
            {form.role === "merchant" && step === 2 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-sm p-3 rounded-lg mt-4 flex items-center gap-2">
                <span>⏳</span>
                <span>Merchant accounts require admin approval before you can start selling products.</span>
              </div>
            )}

            {/* Redirect */}
            <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, name, value, onChange, placeholder, type = "text", required = true }) => (
  <div>
    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">{label}</label>
    <div className="flex items-center rounded-full px-4 bg-gray-50 dark:bg-gray-800 shadow-inner border border-gray-200 dark:border-gray-700 focus-within:border-orange-500 transition">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-transparent flex-1 py-3 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  </div>
);

export default RegistrationPage;
