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
    <div className="bg-gradient-to-br from-red-50 via-pink-100 to-white dark:from-[#18122B] dark:via-[#393053] dark:to-[#18122B]">
      <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-5">
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div
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
            className="w-full max-w-xl bg-white dark:bg-[#18122B] rounded-3xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-[#c30027] mb-2 text-center">Login</h2>
            <div className="h-1 w-24 bg-pink-300 rounded-full mx-auto mb-6"></div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full mb-6 py-3 rounded-full border-2 border-[#c30027] dark:border-white/70 text-white/70 text-[#c30027] font-semibold flex items-center justify-center gap-2 hover:bg-[#FDEDF3] transition"
            >
              <FcGoogle className="text-xl" />
              Login with Google
            </button>
            <div className="divider text-gray-500 px-5">or</div>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Email</label>
              <div className="flex items-center border rounded-lg px-3 bg-[#FDEDF3] dark:bg-[#393053]">
                <BiEnvelope className="text-[#c30027] mr-2" />
                <input
                  className="bg-transparent flex-1 py-2 outline-none"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Password</label>
              <div className="flex items-center border rounded-lg px-3 bg-[#FDEDF3] dark:bg-[#393053]">
                <BiKey className="text-[#c30027] mr-2" />
                <input
                  className="bg-transparent flex-1 py-2 outline-none"
                  type="password"
                  name="pass"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            {/* Error */}
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {/* Remember Me */}
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" name="remember" className="" />
              <span className="text-sm">Remember Me</span>
              <span className="ml-auto text-[13px] text-slate-500 cursor-pointer">
                Forgot password?
              </span>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-tr from-red-800   to-red-400  text-white font-semibold hover:bg-[#a80020] transition flex items-center justify-center gap-2"
            >
              Login Now
            </button>
            {/* Registration Redirect */}
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link to="/registration" className="text-[#c30027] underline">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  }


};

export default Login;