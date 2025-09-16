import useRole from "@/hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";


export default function Dashboard() {
  const navigate = useNavigate();
  const { role, loading } = useRole(); 
  const { user } = useContext(AuthContext);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "merchant" && <AdminDashboard />}
      {role === "customer" && <CustomerDashboard />}
      {!role && <div>Unauthorized</div>}
    </div>
  );
}

// Example Components
