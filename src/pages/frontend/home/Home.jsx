import Banner from "@/components/shared/Banner";
import BlogHighlights from "./section/BlogHighlights";
import FaqStrip from "./section/FaqStrip";

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
      {/* <Section></Section> */}

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
