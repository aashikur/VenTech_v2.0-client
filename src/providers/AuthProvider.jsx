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

  // ------------------ Observer ------------------
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     setUser(currentUser);

  //     if (currentUser) {
  //       try {
  //         // Get Firebase ID token
  //         const token = await currentUser.getIdToken(true);
  //         setUser({...currentUser, accessToken: token})
  //         // console.log(currentUser)

  //         // Save token in localStorage (or you can configure axios interceptor)
  //         localStorage.setItem("access-token", token);

  //         // Sync with backend
  //         await axiosPublic.post(
  //           "/api/v1/auth/sync",
  //           {},
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //       } catch (err) {
  //         console.error("❌ Error syncing user:", err);
  //       }
  //     } else {
  //       localStorage.removeItem("access-token");
  //     }

  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [auth, axiosPublic]);
  // inside useEffect of AuthProvider
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const token = await currentUser.getIdToken(); // Firebase ID token
      setUser({ ...currentUser, accessToken: token });
    } else {
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
