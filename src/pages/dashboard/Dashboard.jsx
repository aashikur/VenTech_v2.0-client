import useRole from "@/hooks/useRole";
import AdminDashboard from "./AdminDashboard";

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
const CustomerDashboard = () => <div>Welcome Customer</div>;
