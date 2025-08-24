import { useState, useContext } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";

const subjects = [
  "General Query",
  "Blood Request",
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
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "You need to login to send a message.",
        confirmButtonColor: "#c30027",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    setLoading(true);
    try {
      await axiosPublic.post("/contacts", {
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
    <div className="min-h-screen flex items-center justify-center bg-[#FDEDF3] dark:bg-[#18122B] py-12">
      <div className="bg-white dark:bg-[#18122B] rounded-3xl shadow-lg max-w-[1500px] w-full flex flex-col md:flex-row overflow-hidden">
        {/* Left: Floating Icon */}
        <div className="flex-1 flex items-center justify-center bg-pink-100 dark:bg-[#393053] p-8">
          <motion.img
            src="/logo/faq-5.png"
            alt="Contact Icon"
            className="w-72 h-72 object-contain"
            animate={{ y: [0, -20, 0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-[#c30027] mb-6">Contact us</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5">
            {/* Name (read-only) */}
            <input
              type="text"
              name="name"
              value={user?.displayName || "your-name ~ please login first"}
              readOnly
              className="px-4 py-3 rounded-full  bg-[#FDEDF3] dark:bg-[#393053] outline-none"
              placeholder="Name"
            />
            {/* Email (read-only) */}
            <input
              type="email"
              name="email"
              value={user?.email || "your-email ~ please login first"}
              readOnly
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold hover:bg-[#a80020] transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}