import FAQAccordion from "@/components/home/FAQAccordion";
import Banner from "@/components/Banner";
import StatsCards from "@/components/home/StatsCards";
import TopNotice from "@/components/home/TopNotice";
import ContactUs from "@/components/home/ContactUs";
import ShortageTicker from "./homeSections/ShortageTicker";
import Hero from "./homeSections/Hero";
import UrgentNearYou from "./homeSections/UrgentNearYou";
import PartnersTestimonials from "./homeSections/PartnersTestimonials";
import BlogHighlights from "./homeSections/BlogHighlights";
import FaqStrip from "./homeSections/FaqStrip";
import LiveImpact from "./homeSections/LiveImpact";
import SafetyEligibility from "./homeSections/SafetyEligibility";

const Home = () => {
  return (
    <div className="z-10">
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
      <Banner></Banner>
      {/* <StatsCards/> */}
      {/* <ShortageTicker sticky/> */}
      {/* <Hero/> */}
      {/* <UrgentNearYou/> */}
      {/* <PartnersTestimonials/> */}
      {/* <BlogHighlights /> */}
      {/* <FaqStrip /> */}
      {/* <SafetyEligibility /> */}

      {/* <LiveImpact /> */}
      {/* <FAQAccordion /> */}
      {/* <ContactUs /> */}

    </div>
  );
};

export default Home;
