import { Outlet } from "react-router";
import DashboardSidebar from "@/pages/_dashboard/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen mx-autow-full bg-[#FDEDF3] dark:bg-[#18122B] flex fflex-row">
      {/* Sidebar */}
     <div className="relative z-50 border-r border-[#c30027]/20">
       <DashboardSidebar /> 
     </div>
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 md:p-6 flex justify-center items-start">
        <div className="w-full">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;