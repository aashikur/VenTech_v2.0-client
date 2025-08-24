import { Outlet } from "react-router";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ui/ScrollToTop"
import Footer from "@/components/Footer";
import Loading from "@/pages/_fronted/home/Loading";
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
    <div>
            {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-70"
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
        className="absolute inset-0 z-0 dark:block hidden"
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
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default RootLayout;
