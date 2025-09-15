import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import { FcContacts } from "react-icons/fc";
import { BiUserCheck } from "react-icons/bi";
import ThemeButton from "../ui/ThemeButton";
import Lottie, { LottiePlayer } from "lottie-react";
import LottieIcon from "./LottiesPlayer";
import PageBanner from "./PageBanner";
// import logoAnimaton from "../../assets/lottie/working";

const subjects = [
  "Merchant Pending",
  "Report Merchant",
  "Sponsor VenTech",
  "Others.",
];
export default function ContactUs() {




  //   const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    subject: "",
    message: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [feetBack, setFeetBack] = useState("");

  const handleChange = (e) => {
    setFeetBack("");
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeetBack("");
    setLoading(true);
    try {
      await axiosPublic.post("api/public/mailbox", {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      setFeetBack("* We will get back to you as soon as possible.");

      Swal.fire("Success!", "Your message has been sent.", "success");
      setForm({ subject: "", message: "" });
    } catch {
      Swal.fire("Error!", "Failed to send message.", "error");
    }
    setLoading(false);
  };

  return (
<div> 
  <PageBanner 
    title={"Contact Us"}
    subtitle={"We're here to help and answer any questions you might have. We look forward to hearing from you!"}
    breadcrumb={"Home → Contact Us"}
  />
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
              value={form.name || user?.displayName || ""}
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-[#FDEDF3] dark:bg-[#393053] outline-none"
              placeholder="Your Name"
            />

            <input
              type="email"
              name="email"
              value={form.email || user?.email || ""}
              onChange={handleChange}
              className="px-4 py-3 rounded-full bg-[#FDEDF3] dark:bg-[#393053] outline-none"
              placeholder="example@gmail.com"
            />

            {/* Subject Dropdown */}
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-full  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            >
              <option className="text-gray-500" value="">---- select subject -----</option>
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
              placeholder="Message : I would like to talk about..."
              rows={4}
              className="px-4 py-3 rounded-2xl  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
            /> 
            <p className="text-sm text-success">{feetBack}</p>
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
</div>
  );
}