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

  if (role === "donor") {
    return <DonorDashboardHome />;
  }
  if (role === "volunteer") {
    return <VolunteerDashboard/>
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
