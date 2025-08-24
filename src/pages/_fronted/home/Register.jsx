import { useContext, useState } from "react";
import Lottie from "lottie-react";
import { useNavigate, Link } from "react-router";
import { BiUser, BiEnvelope, BiKey, BiImageAdd, BiDroplet } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import happy from "@/assets/happy.json";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";
import useDistrictUpazila from "@/hooks/useDistrictUpazila";

const RegistrationPage = () => {
  const { bloodGroups, districts, getUpazilasByDistrict } = useDistrictUpazila();

  const navigate = useNavigate();
  const { createUser, updateUser, setUser, googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [form, setForm] = useState({
    name: "",
    image: null,
    email: "",
    pass: "",
    confirmPass: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    terms: false,
    status: 'active',
  });

  const [upazilaOptions, setUpazilaOptions] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) &&
    /[a-z]/.test(pass) &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass) &&
    pass.length >= 6;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "district") {
      setForm({ ...form, district: value, upazila: "" });
      setUpazilaOptions(getUpazilasByDistrict(value));
    } else if (name === "image") {
      setForm({ ...form, image: files[0] });
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const uploadImageToImgbb = async (imageFile) => {
    const apiKey = "dff59569a81c30696775e74f040e20bb";
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validatePassword(form.pass)) {
      setError("Password must be at least 6 characters, include uppercase, lowercase, number, and symbol.");
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
    if (form.image) {
      avatarUrl = await uploadImageToImgbb(form.image);
    }

    createUser(form.email, form.pass)
      .then((res) => {
        updateUser({ displayName: form.name, photoURL: avatarUrl }).then(() => {
          const RegUserdata = { ...res.user, displayName: form.name, photoURL: avatarUrl };
          setUser(RegUserdata);

          axiosPublic.post("/add-user", {
            name: form.name,
            email: form.email,
            avatar: avatarUrl,
            bloodGroup: form.bloodGroup,
            district: form.district,
            upazila: form.upazila,
            status: "active",
            role: "donor",
            loginCount: 1,
          }).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Registration Successful!',
              text: `Welcome, ${form.name}!`,
              timer: 2000,
              showConfirmButton: false,
            });
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
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

        Swal.fire({
          icon: 'success',
          title: `Welcome, ${user.displayName}!`,
          text: 'You have successfully logged in with Google.',
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.message,
        });
      });
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-pink-100 to-white dark:from-[#18122B] dark:via-[#393053] dark:to-[#18122B]">
      <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-5">
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, filter: "blur(0px)" }}
            className="flex gap-4 pb-10 blur-[4px] hover:blur-none transition"
          >
            <img className="rounded-xl" src="/logo/reg-1.png" alt="" />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white dark:bg-[#18122B] rounded-3xl shadow-lg p-8"
          >
            {/* Mobile Banner */}
            <div className="flex gap-4 pb-10 sm:hidden">
              <img className="rounded-xl w-1/2" src="/logo/reg-1.png" alt="" />
              <div>
                <h2 className="text-3xl text-left font-bold mb-2">
                  Join As <br /><span className=" text-[#c30027]">Hero</span>
                </h2>
                <p className="opacity-50">Be a hero. Your blood can save lives today.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#c30027] mb-2 text-center">Registration</h2>
            <div className="h-1 w-24 bg-pink-300 rounded-full mx-auto mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <InputField icon={<BiUser />} label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />

              {/* Photo */}
              <div>
                <label className="block mb-1 font-semibold">Photo</label>
                <div className="flex items-center border rounded-lg px-3 bg-[#FDEDF3] dark:bg-[#393053]">
                  <BiImageAdd className="text-[#c30027] mr-2" />
                  <input type="file" name="image" accept="image/*" onChange={handleChange} className="flex-1 py-2 outline-none" />
                  {avatarPreview && <img src={avatarPreview} alt="Avatar" className="w-10 h-10 rounded-full ml-2" />}
                </div>
              </div>

              {/* Email */}
              <InputField icon={<BiEnvelope />} label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" type="email" />

              {/* Blood Group */}
              <SelectField icon={<BiDroplet />} label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} options={bloodGroups} />

              {/* District */}
              <SelectField icon={<BiUser />} label="District" name="district" value={form.district} onChange={handleChange} options={districts.map(d => d.name)} />

              {/* Upazila */}
              <SelectField icon={<BiUser />} label="Upazila" name="upazila" value={form.upazila} onChange={handleChange} options={upazilaOptions.map(u => u.name)} />

              {/* Password */}
              <InputField icon={<BiKey />} label="Password" name="pass" value={form.pass} onChange={handleChange} placeholder="Enter your password" type="password" />

              {/* Confirm Password */}
              <InputField icon={<BiKey />} label="Confirm Password" name="confirmPass" value={form.confirmPass} onChange={handleChange} placeholder="Confirm your password" type="password" />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required />
              <span className="text-sm">I accept the <Link to="/terms" className="text-[#c30027] underline">terms and conditions</Link></span>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <BiUser /> {loading ? "Registering..." : "Register"}
            </button>

            <div className="divider text-gray-500">or</div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full mt-2 py-3 rounded-full border-2 dark:border-white/70 dark:text-white/70 border-[#c30027] text-[#c30027] font-semibold flex items-center justify-center gap-2 hover:bg-[#FDEDF3] transition"
            >
              <FcGoogle className="text-xl" />
              Register with Google
            </button>

            <div className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-[#c30027] underline">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input Component (Optional abstraction)
const InputField = ({ icon, label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <div className="flex items-center border rounded-lg px-3 bg-[#FDEDF3] dark:bg-[#393053]">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="bg-transparent flex-1 py-2 outline-none"
        placeholder={placeholder}
      />
    </div>
  </div>
);

// Select Component
const SelectField = ({ icon, label, name, value, onChange, options }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <div className="flex items-center border rounded-lg px-3 bg-[#FDEDF3] dark:bg-[#393053]">
      {icon}
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="bg-transparent flex-1 py-2 outline-none"
      >
        <option className="dark:bg-[#393053]" value="">Select {label}</option>
        {options.map((opt) => (
          <option className="dark:bg-[#393053]" key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

export default RegistrationPage;
