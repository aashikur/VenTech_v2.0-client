import { useContext, useState } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loading from "../../components/shared/Loading";
import LottieIcon from "@/components/shared/LottiesPlayer";
import GoogleButton from "@/components/auth/shared/GoogleButton";
import LoginForm from "@/components/auth/shared/LoginForm";

const Login = () => {
  const { signIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  if (user?.email) {
    navigate("/dashboard");
    return null;
  }


// need to add login as Guest button  
// guest.customer@ventech.com
// guest.merchent@ventech.com
// guest.admin@ventech.com

// Guest1234.





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

  if (user?.email) {
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
              <LottieIcon name="working" loop={true} />
            </motion.div>
          </div>

          {/* Right Form */}
          <LoginForm/>
        </div>
      </div>

    );
  }


};

export default Login;