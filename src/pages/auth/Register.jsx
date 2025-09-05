import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { BiUser, BiEnvelope, BiKey, BiStore, BiMap, BiCreditCard, BiPhone } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "@/hooks/axiosPublic";
import Swal from "sweetalert2";
import LottieIcon from "@/components/shared/LottiesPlayer";
import InputField from "@/components/auth/shared/inputField";
import RoleSelector from "@/components/auth/shared/RoleSelector";
import StepPersonalInfo from "@/components/auth/StepPersonalInfo";
import StepShopInfo from "@/components/auth/StepShopInfo";
import SubmitButton from "@/components/auth/shared/SubmitButton";
import useRegistrationForm from "@/hooks/auth/useRegistrationForm";
import GoogleButton from "@/components/auth/shared/GoogleButton";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // if already logged in → redirect
  useEffect(() => {
    if (user?.email) navigate("/dashboard");
  }, [user, navigate]);

   const {
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
   } = useRegistrationForm();


  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-red-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex flex-col md:flex-row max-w-7xl mx-auto gap-8 px-6 py-12">
        {/* Left Banner */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center gap-6 pb-10 opacity-80 hover:opacity-100 transition"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                Welcome to VenTech
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {form.role === "customer"
                  ? "Discover amazing products from trusted merchants"
                  : "Start your online business journey with us"}
              </p>
            </div>
            <LottieIcon name="working" />
          </motion.div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className={`w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-10 transition-all duration-300 ${form.role === "merchant" ? "max-w-4xl" : "max-w-lg"
              }`}
          >
            {/* Title */}
            <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center mb-4">
              Join VenTech
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Create your {form.role === "customer" ? "shopping" : "merchant"} account
            </p>

            {/* Role Selection */}

            <RoleSelector form={form} setForm={setForm} setStep={setStep} />
            {/* Google */}
            <GoogleButton/>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="px-4 text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>


            {/* Step Form */}
            {step === 1 && (
              <StepPersonalInfo form={form} setForm={setForm} onChange={handleChange} />
            )}

            {step === 2 && form.role === "merchant" && (
              <StepShopInfo form={form} onChange={handleChange} />
            )}

            {/* Terms */}
            {step === (form.role === "merchant" ? 2 : 1) && (
              <div className="flex items-center gap-2 mt-6 mb-4">
                <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="rounded text-orange-500 focus:ring-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I accept the <Link to="/terms" className="text-orange-500 underline hover:text-orange-600">terms and conditions</Link>
                </span>
              </div>
            )}

            {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-4">{error}</div>}

            {/* Navigation Buttons */}
            <SubmitButton handleNext={handleNext} handleBack={handleBack} step={step} form={form} loading={loading} />

            {/* Status Note for Merchant */}
            {form.role === "merchant" && step === 2 && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 text-sm p-3 rounded-lg mt-4 flex items-center gap-2">
                <span>⏳</span>
                <span>Merchant accounts require admin approval before you can start selling products.</span>
              </div>
            )}

            {/* Redirect */}
            <div className="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default RegistrationPage;
