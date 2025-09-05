import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";

export default function useRegistrationForm() {
  const navigate = useNavigate();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // -------------------- State --------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    confirmPass: "",
    role: "customer",
    shopName: "",
    shopNumber: "",
    shopAddress: "",
    tradeLicense: "",
    terms: false,
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------- Handlers --------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      console.log("handleChange called:", name, value);

    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleNext = () => {
    setError("");
    if (form.role === "merchant" && step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // -------------------- Validation --------------------
  const validatePassword = (pass) =>
    /[A-Z]/.test(pass) &&
    /[a-z]/.test(pass) &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass) &&
    pass.length >= 6;

  const validateMerchantFields = () => {
    if (form.role === "merchant") {
      if (!form.shopName.trim()) return "Shop name is required.";
      if (!form.shopNumber.trim()) return "Shop number is required.";
      if (!form.shopAddress.trim()) return "Shop address is required.";
    }
    return null;
  };

  // -------------------- Submit --------------------
  const handleSubmit = async (e) => {
    console.log("handleSubmit", form);
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔹 Validate
    if (!validatePassword(form.pass)) {
      setError("Password must have uppercase, lowercase, number, symbol, min 6 chars.");
      setLoading(false);
      return;
    }
    if (form.pass !== form.confirmPass) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (!form.terms) {
      setError("You must accept the terms.");
      setLoading(false);
      return;
    }
    const merchantError = validateMerchantFields();
    if (merchantError) {
      setError(merchantError);
      setLoading(false);
      return;
    }

    try {
      // 🔹 Firebase Auth
      const result = await createUser(form.email, form.pass);
      await updateUser({ displayName: form.name });
      const regUser = { ...result.user, displayName: form.name };
      setUser(regUser);

      // 🔹 API Insert
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.role === "customer" ? "active" : "pending",
        loginCount: 1,
      };
      if (form.role === "merchant") {
          payload.shopDetails = {
          shopName: form.shopName,
          shopNumber: form.shopNumber,
          shopAddress: form.shopAddress,
          tradeLicense: form.tradeLicense || "",
        };
      }
      await axiosPublic.post("/api/v1/auth/add-user", payload);

      // 🔹 Feedback
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text:
          form.role === "customer"
            ? "Welcome! You can start shopping now."
            : "Application submitted! Please wait for admin approval.",
        timer: 3000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Try again.");
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };


  // -------------------- Return --------------------
  return {
    form,
    setForm,
    step,
    setStep,
    error,
    setError,
    loading,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
  };
}
