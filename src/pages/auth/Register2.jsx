// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate, Link } from "react-router";
import Section from "@/components/ui/Section";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUser(form.email, form.password);
      await updateUser({ displayName: form.name });
      console.log("User created:", userCredential);
      alert("User created successfully!");
    //   navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      setError(err.message || "Failed to register");
    }
  };

  return (
    <Section viewAll=""  className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
              Sign in
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10
                border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10
                border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10
                border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent
            text-sm font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 via-red-500 
            to-yellow-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-orange-500 transition-all duration-200"
          >
            Create Account
          </button>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 
              border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
              transition-all duration-200"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span>Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Register;
