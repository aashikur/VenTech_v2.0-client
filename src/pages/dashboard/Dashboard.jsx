import useRole from "@/hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";
import { AuthContext } from "@/providers/AuthProvider";
import Loading from "@/components/shared/Loading";


export default function Dashboard() {
  const { role, loading } = useRole(); 

  if (loading) return (<>
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner text-error"></span>

    </div>
  </>);
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
