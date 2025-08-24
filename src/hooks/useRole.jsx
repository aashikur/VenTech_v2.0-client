import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure("/get-user-role").then((res) => {
      // console.log('status: ', res.data.status, res.data.role, res.data);
      
      setRole(res.data.role);
      setStatus(res.data.status);
      setLoading(false);
    });
  });
  return { role, loading, status };
}
