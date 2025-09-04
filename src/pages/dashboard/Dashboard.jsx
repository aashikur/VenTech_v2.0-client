import useRole from "@/hooks/useRole";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "merchant" && <MerchantDashboard />}
      {role === "customer" && <CustomerDashboard />}
      {!role && <div>Unauthorized</div>}
    </div>
  );
}

// Example Components
const AdminDashboard = () => <div>Welcome Admin</div>;
const MerchantDashboard = () => <div>Welcome Merchant</div>;
const CustomerDashboard = () => <div>Welcome Customer</div>;
