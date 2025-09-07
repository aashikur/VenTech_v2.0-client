import Banner from "@/components/shared/Banner";
import BlogHighlights from "./section/BlogHighlights";
import FaqStrip from "./section/FaqStrip";
import axios from 'axios';
import ContactUs from "@/components/shared/ContactUs";
import CategoriesHighlight from "./section/CategoriesHighlight";

const Home = () => {




// axios.get('/get-user-role')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })




  return (
    <div className="">

      <Banner></Banner> 
            <CategoriesHighlight />

      <BlogHighlights/>
      {/* <StatsCards/> */}
      {/* <ShortageTicker sticky/> */}
      {/* <Hero/> */}
      {/* <UrgentNearYou/> */}
      {/* <PartnersTestimonials/> */}
      <FaqStrip />
      {/* <SafetyEligibility /> */}

      {/* <LiveImpact /> */}
      {/* <FAQAccordion /> */}
      {/* <ContactUs /> */}
      {/* <Section></Section> */}

      <ContactUs/>
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
