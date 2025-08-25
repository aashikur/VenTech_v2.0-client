import { useContext, useState } from "react";
import Lottie from "lottie-react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router";
import loginAnimation from "@/assets/loginAnimation.json";
import { AuthContext } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loading from "./Loading";

const Login = () => {
  const { signIn, googleSignIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  if(user?.email){
    navigate("/dashboard");
    return null;
  }

  // Google login
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    signIn(email, pass)
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

    if(user?.email){
    navigate("/dashboard");
    return null;
  } else {
      return (
 <div className="relative bg-gradient-to-br from-pink-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-8 px-6 py-12">
    
    {/* Left Banner */}
    <div className="hidden md:flex flex-col justify-center items-center flex-1">
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="flex gap-6 pb-10 opacity-80 hover:opacity-100 transition"
      >
        <img className="rounded-2xl shadow-xl" src="/logo/ventech-banner.png" alt="VenTech" />
      </motion.div>
    </div>

    {/* Right Form */}
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10"
      >
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center mb-4">
          Login to VenTech
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Access your vendor dashboard or marketplace account
        </p>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full mb-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="divider text-gray-500">or</div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Email</label>
          <div className="flex items-center rounded-full px-4 bg-gray-50 dark:bg-gray-800 shadow-inner">
            <BiEnvelope className="text-orange-500 mr-2" />
            <input
              className="bg-transparent flex-1 py-3 outline-none text-gray-700 dark:text-gray-200"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Password</label>
          <div className="flex items-center rounded-full px-4 bg-gray-50 dark:bg-gray-800 shadow-inner">
            <BiKey className="text-orange-500 mr-2" />
            <input
              className="bg-transparent flex-1 py-3 outline-none text-gray-700 dark:text-gray-200"
              type="password"
              name="pass"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Remember Me */}
        <div className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400">
          <input type="checkbox" name="remember" className="rounded" />
          <span className="text-sm">Remember Me</span>
          <span className="ml-auto text-sm cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          Login Now
        </button>

        {/* Registration Redirect */}
        <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/registration" className="text-orange-500 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>

  );
  }


};

export default Login;