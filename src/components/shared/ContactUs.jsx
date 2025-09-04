import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FcContacts } from "react-icons/fc";
import { BiUserCheck } from "react-icons/bi";
import ThemeButton from "../ui/ThemeButton";
import Lottie, { LottiePlayer } from "lottie-react";
import animationData from "../../assets/working"; // path to your JSON
import LottieIcon from "./LottiesPlayer";
// import logoAnimaton from "../../assets/lottie/working";

const subjects = [
  "General Enquiry",
  "Request For Merchant",
  "Feedback",
  "Technical Issue",
  "Other"
];

export default function ContactUs() {
//   const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // User login check
    // if (!user) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Please login first!",
    //     text: "You need to login to send a message.",
    //     confirmButtonColor: "#c30027",
    //     confirmButtonText: "Go to Login"
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       navigate("/login");
    //     }
    //   });
    //   return;
    // }

    setLoading(true);
    console.log("Message sent successfully\n", form);
    try {
      await axiosPublic.post("/contactForm", {
        name: user?.displayName || "",
        email: user?.email || "",
        subject: form.subject,
        message: form.message,
      });
      
      Swal.fire("Success!", "Your message has been sent.", "success");
      setForm({ subject: "", message: "" });
    } catch {
      Swal.fire("Error!", "Failed to send message.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12">
      <div className=" dark:bg-[#18122B]/10 backdrop-blur-[2px] border-gray-700 py-10 dark:border rounded-3xl shadow-lg max-w-[1500px] w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left: Floating Icon */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            src="/logo/faq-5.png"
            alt="Contact Icon"
            className="w-full max-w-[500px]"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
    <div className="w-full">
          <LottieIcon name="working" />

    </div>
          </motion.div>

        </div>
        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h2 className="
          block bg-clip-text text-transparent font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          text-left
          ">Contact us</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5">
            {/* Name (read-only) */}
            <input
              type="text"
              name="name"
              value={user?.displayName}
              
              className="px-4 py-3 rounded-full  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
              placeholder="Name"
            />
            {/* Email (read-only) */}
            <input
              type="email"
              name="email"
              value={user?.email}
             
              className="px-4 py-3 rounded-full  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
              placeholder="Email"
            />
            {/* Subject Dropdown */}
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-full  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            >
              <option value="">Select Subject</option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Message"
              rows={4}
              className="px-4 py-3 rounded-2xl  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            />
            <ThemeButton
              type="submit"
              disabled={loading}
              className="w-full"
              
            >
              {loading ? "Sending..." : "Send Message"}
            </ThemeButton>
          </form>
        </div>
      </div>
    </div>
  );
}