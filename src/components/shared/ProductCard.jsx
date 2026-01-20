import { Link } from "react-router";
import { Button3 } from "../ui/Button";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";


function ProductCard({ product }) {
  return (
    <article className="border max-w-[450px]  bg-white dark:bg-[#131B25]/50 backdrop-blur-[10px] border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <figure>
          <img
            src={product.images?.[0] || "https://i.ibb.co/jvyTg6vQ/category-product-2.jpg"}
            alt={product.title}
            className="h-48 w-full object-cover"
          />
        </figure>
      </Link>
      <div className="p-4 flex flex-col justify-between border-t border-gray-200 dark:border-gray-700">
        <Link to={`/product/${product._id}`} className="text-lg font-bold text-gray-700 dark:text-white mb-2 truncate">
          {product.title} 
        </Link>
        <p className="text-sm opacity-50 text-gray-600 dark:text-gray-300 mb-4 flex justify-between items-center">
          <span>
            ${product.retailPrice.toFixed(2)}
          </span>

          <span className="flex items-center gap-1">
            4.5
            <span className="flex items-center gap-0.5 text-orange-400">
              {[...Array(5)].map((_, i) => {
                if (i < 4) return <FaStar key={i} />;
                return <FaStarHalfAlt key={i} />;
              })}
            </span>
          </span>


        </p>
        <div className="flex justify-between gap-2 opacity-50 hover:opacity-100 ">

          <Button3 arrow={false} className="">
            <Link to={`/product/${product._id}`} className="block w-full text-center text-gray-500">
            Buy Now
            </Link>
          </Button3>

          <Button3>
            <Link to={`/product/${product._id}`} className="block w-full text-center text-gray-500">
              View Details
            </Link>
          </Button3>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;