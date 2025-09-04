import { Outlet } from "react-router";
import Header from "@/components/shared/Header";
import ScrollToTop from "@/components/ui/ScrollToTop"
import Footer from "@/components/shared/Footer";
import Loading from "@/components/shared/Loading";
import { useEffect, useState } from "react";
const RootLayout = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

if(isLoading) return (
  <>
  <Loading></Loading>


  </>
)
  return (
    <div className="relative">
            {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-70 dark:hidden h-full"
        style={{
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(75,85,99,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(75,85,99,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:block hidden opacity-70 h-full"
        style={{
          background: "#0F172A",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />
      <Header></Header>
      <main className="overflow-x-clip">
        <Outlet></Outlet>
      </main>
      <div className=" z-10 relative">
        <Footer></Footer>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default RootLayout;
