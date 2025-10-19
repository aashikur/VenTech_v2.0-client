import Banner from "@/components/shared/Banner";
import BlogHighlights from "./section/BlogHighlights";
import FaqStrip from "./section/FaqStrip";
import CategoriesHighlight from "./section/CategoriesHighlight";
import ProductHighlight from "./section/ProductHighlight";

const Home = () => {

  return (
    <div className="">
      <div className="divider"></div>
      <Banner/>
      <CategoriesHighlight />
      <ProductHighlight />
      <BlogHighlights />
      <FaqStrip />
    </div>
  );
};

export default Home;
