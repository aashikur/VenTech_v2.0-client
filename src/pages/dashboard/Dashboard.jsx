import useRole from "@/hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";
import { AuthContext } from "@/providers/AuthProvider";


export default function Dashboard() {
  const { role, loading } = useRole(); 

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
