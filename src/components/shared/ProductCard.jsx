import { Link } from "react-router";
import { Button3 } from "../ui/Button";


function ProductCard({ product }) {
  return (
    <article className="border  bg-white dark:bg-[#131B25]/50 backdrop-blur-[10px] border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
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
        <h3 className="text-lg font-bold text-gray-700 dark:text-white mb-2">
          {product.title.slice(0, 35)}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          ${product.retailPrice.toFixed(2)}
        </p>
        <div className="flex justify-between gap-2">

          <Button3 arrow={false} className="opacity-0">
            Buy Now
          </Button3> 

                    <Button3>
            <Link to={`/product/${product._id}`} className="block w-full text-center">
              View Details
            </Link>
          </Button3>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;