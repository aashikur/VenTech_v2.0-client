// src/providers/AuthProvider.jsx
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "@/firebase/firebase.config";
import useAxiosPublic from "@/hooks/axiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // ------------------ Auth Actions ------------------
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const removeUser = (user) => {
    return deleteUser(user);
  };

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token"); // remove token when logging out
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    console.log('server running:',import.meta.env.VITE_SERVER_URL);

    if (currentUser) {
      const token = await currentUser.getIdToken(); // Firebase ID token
      localStorage.setItem("access-token", token);

      try {
        // 🔑 Sync with backend
        const { data } = await axiosPublic.get("/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Store both Firebase & backend user info
        setUser({
          ...currentUser,
          accessToken: token,
          role: data.user.role,
          status: data.user.status,
          loginCount: data.user.loginCount,
        });

        // console.log("✅ Synced user:", data.user);
      } catch (err) {
        console.error("Auth sync error:", err);
        setUser(null);
      }
    } else {
      localStorage.removeItem("access-token");
      setUser(null);
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  // ------------------ Context Value ------------------
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    setUser,
    logOut,
    googleSignIn,
    updateUser,
    removeUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
