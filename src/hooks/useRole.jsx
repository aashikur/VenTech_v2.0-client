// import { useEffect, useState } from "react";
// import useAxiosSecure from "./useAxiosSecure";

// export default function useRole() {
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(true);
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     axiosSecure("/get-user-role").then((res) => {
//       // console.log('status: ', res.data.status, res.data.role, res.data);
      
//       setRole(res.data.role);
//       setStatus(res.data.status);
//       setLoading(false);
//     });
//   });
//   return { role, loading, status };
// }

import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure("/get-user-role").then((res) => {
      const backendData = res.data;
      console.log('Backend response:', backendData);
      
      // Store original user data
      setUserData(backendData.UserCollection_Data);
      setStatus(backendData.status);

      // 🎯 ROLE MAPPING - Backend to Frontend
      let frontendRole = backendData.role;
      
      // Check if this is a VenTech user with role mapping
      if (backendData.UserCollection_Data?.ventech_user) {
        // Use stored frontend role if available
        if (backendData.UserCollection_Data.frontend_role) {
          frontendRole = backendData.UserCollection_Data.frontend_role;
        } else {
          // Fallback: Map backend role to frontend role
          frontendRole = backendData.role === "donor" ? "customer" : "merchant";
        }
      }
      
      console.log('Mapped role:', {
        backend: backendData.role,
        frontend: frontendRole,
        isVenTech: backendData.UserCollection_Data?.ventech_user
      });
      
      setRole(frontendRole);
      setLoading(false);
    }).catch((error) => {
      console.error("Role fetch error:", error);
      setLoading(false);
    });
  }, []); // Add dependency array to prevent infinite loop

  return { 
    role,           // Frontend role (customer/merchant)
    status, 
    loading,
    userData,       // Full user data
    backendRole: userData?.role,  // Original backend role (donor/volunteer)
    isVenTech: userData?.ventech_user || false
  };
}