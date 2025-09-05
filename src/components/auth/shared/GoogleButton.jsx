import useAxiosPublic from '@/hooks/axiosPublic';
import { AuthContext } from '@/providers/AuthProvider';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const GoogleButton = () => {

      const {  googleSignIn } = useContext(AuthContext);
      const axiosPublic = useAxiosPublic();
        const navigate = useNavigate();


    const handleGoogle = async () => {
        console.log('handleGoogle Clicked ~ Login Page');
        try {
            const result = await googleSignIn();
            const user = result.user;

            // Get Firebase ID token
            const idToken = await user.getIdToken();

            // Save token
            localStorage.setItem("access-token", idToken);

            // ✅ Call backend to sync user + get profile
            const { data } = await axiosPublic.get("/api/v1/auth/me", {
                headers: { Authorization: `Bearer ${idToken}` }
            });

            console.log("Synced user:", data);

            Swal.fire({
                icon: "success",
                title: `Welcome, ${data.user.name || user.displayName}!`,
                text: "You have successfully signed in with Google.",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/dashboard");
        } catch (error) {
            console.error("Google sign-in error:", error);
            Swal.fire({
                icon: "error",
                title: "Sign-in Failed",
                text: error.message,
            });
        }
    };
    return (
        <div>
            {/* Google Login */}
            <button
                type="button"
                onClick={handleGoogle}
                className="w-full mb-6 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <FcGoogle className="text-xl" />
                Continue with Google
            </button>

        </div>
    );
};

export default GoogleButton;