import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "@/providers/AuthProvider";

export default function useRole() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [userID, setUserID] =  useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (authLoading) return;

    if (!user?.accessToken) {
      setRole(null);
      setStatus(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get("/api/v1/auth/me");
        const dbUser = res.data.user;
        setRole(dbUser.role);
        setStatus(dbUser.status);
        setProfile(dbUser);
        setUserID(dbUser._id);
      } catch (err) {
        console.error("Error fetching role:", err.response?.data || err.message);
        setRole(null);
        setStatus(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [user, authLoading]); 

  // console.log("useRole:", { role, status, loading });
  // console.log("profile:", profile);

  return { role, status, profile, setProfile, loading , userID};
}
