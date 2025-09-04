// src/pages/Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";
import Section from "@/components/ui/Section";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Sign in with Firebase
      await signIn(form.email, form.password);

      // 2. Firebase observer will auto-sync user to backend
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
    }
  };

  return (
 <Section>
       <form onSubmit={handleSubmit} className="form border p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button className="btn" type="submit">Login</button>
    </form>
 </Section>
  );
};

export default Login;
