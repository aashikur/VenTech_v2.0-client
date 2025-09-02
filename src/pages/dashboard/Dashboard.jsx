import { Navigate } from "react-router";
import useRole from "@/hooks/useRole";
import AdminDashboard from "./admin/AdminDashboard";
import DonorDashboardHome from "./DonorDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import DashboardLoading from "@/components/loading/DashboardLoading";

export default function Dashboard() {
  const { role, loading } = useRole();

  if (loading) {
    return <DashboardLoading/>
  }

  // Map both old and new roles to appropriate dashboards
  if (role === "donor" || role === "customer") {
    return <DonorDashboardHome />; // Customer/Donor Dashboard
  }
  
  if (role === "volunteer" || role === "merchant") {
    return <VolunteerDashboard />; // Merchant/Volunteer Dashboard
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}