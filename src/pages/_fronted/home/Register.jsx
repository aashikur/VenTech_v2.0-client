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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass) && pass.length >= 6;

  const uploadImageToImgbb = async (imageFile) => {
    const apiKey = "dff59569a81c30696775e74f040e20bb";
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: "POST", body: formData });
    const data = await response.json();
    return data.data.url;
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

    let avatarUrl = "";
    if (form.image) avatarUrl = await uploadImageToImgbb(form.image);

    createUser(form.email, form.pass)
      .then((res) => {
        updateUser({ displayName: form.name, photoURL: avatarUrl }).then(() => {
          const RegUserdata = { ...res.user, displayName: form.name, photoURL: avatarUrl };
          setUser(RegUserdata);

          const userPayload = {
            name: form.name,
            email: form.email,
            avatar: avatarUrl,
            role: form.role,
            status: "active",
            loginCount: 1,
          };

          if (form.role === "vendor") {
            userPayload.businessName = form.businessName;
            userPayload.businessCategory = form.businessCategory;
            userPayload.businessAddress = form.businessAddress;
            userPayload.tradeLicense = form.tradeLicense;
            userPayload.paymentInfo = form.paymentInfo;
          }

          axiosPublic.post("/add-user", userPayload).then(() => {
            Swal.fire({ icon: "success", title: "Registration Successful!", text: `Welcome, ${form.name}!`, timer: 2000, showConfirmButton: false });
            setTimeout(() => navigate("/dashboard"), 2000);
          });
        });
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        Swal.fire({ icon: "success", title: `Welcome, ${user.displayName}!`, text: "You have successfully logged in with Google.", timer: 2000, showConfirmButton: false });
        navigate("/dashboard");
      })
      .catch((err) => Swal.fire({ icon: "error", title: "Login Failed", text: err.message }));
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-8 px-6 py-12">
        
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="flex gap-6 pb-10 opacity-80 hover:opacity-100 transition">
            <img className="rounded-2xl shadow-xl" src="/logo/ventech-banner.png" alt="VenTech" />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10">
            
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center mb-4">
              Create Your Account
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Join VenTech and manage your marketplace account</p>

            {/* Google */}
            <button type="button" onClick={handleGoogle} className="w-full mb-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FcGoogle className="text-xl" /> Continue with Google
            </button>

            <div className="divider text-gray-500">or</div>

            {/* Name & Email */}
            <InputField icon={<BiUser />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
            <InputField icon={<BiEnvelope />} label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email" />
            <InputField icon={<BiKey />} label="Password" name="pass" value={form.pass} onChange={handleChange} placeholder="Enter your password" type="password" />
            <InputField icon={<BiKey />} label="Confirm Password" name="confirmPass" value={form.confirmPass} onChange={handleChange} placeholder="Confirm your password" type="password" />

            {/* Vendor fields */}
            {form.role === "vendor" && (
              <>
                <InputField icon={<BiStore />} label="Business Name" name="businessName" value={form.businessName} onChange={handleChange} placeholder="Your shop/brand name" />
                <InputField icon={<BiStore />} label="Business Category" name="businessCategory" value={form.businessCategory} onChange={handleChange} placeholder="E.g. Electronics, Clothing" />
                <InputField icon={<BiMap />} label="Business Address" name="businessAddress" value={form.businessAddress} onChange={handleChange} placeholder="Shop location" />
                <InputField icon={<BiCreditCard />} label="Trade License / Business ID" name="tradeLicense" value={form.tradeLicense} onChange={handleChange} placeholder="Optional" />
                <InputField icon={<BiCreditCard />} label="Payment Info" name="paymentInfo" value={form.paymentInfo} onChange={handleChange} placeholder="Bank / Bkash / PayPal" />
              </>
            )}

            {/* Terms */}
            <div className="flex items-center gap-2 mt-6 mb-4">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I accept the <Link to="/terms" className="text-orange-500 underline">terms and conditions</Link>
              </span>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Submit */}
            <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2">
              Register Now
            </button>

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

const InputField = ({ icon, label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="mb-5">
    <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex items-center rounded-full px-4 bg-gray-50 dark:bg-gray-800 shadow-inner">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={label !== "Trade License / Business ID"}
        placeholder={placeholder}
        className="bg-transparent flex-1 py-3 outline-none text-gray-700 dark:text-gray-200"
      />
    </div>
  </div>
);

export default RegistrationPage;
