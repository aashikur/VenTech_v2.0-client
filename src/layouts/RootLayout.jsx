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
