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
    <div className="">

      <Banner></Banner>
      {/* <StatsCards/> */}
      {/* <ShortageTicker sticky/> */}
      {/* <Hero/> */}
      {/* <UrgentNearYou/> */}
      {/* <PartnersTestimonials/> */}
      <BlogHighlights />
      <FaqStrip />
      {/* <SafetyEligibility /> */}

      {/* <LiveImpact /> */}
      {/* <FAQAccordion /> */}
      {/* <ContactUs /> */}

      <div 
      className="bg-transparent">
        <div className="py-100 bg-transparent text-center text-3xl font-bold max-w-2xl mx-auto">
          Hello VenTech Community ~   👋 We are building An Amizing Business Solutions ~ this is only Fronted for now
        </div>
      </div>

    </div>
  );
};

export default Home;
