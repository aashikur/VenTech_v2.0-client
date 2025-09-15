import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "@/hooks/axiosPublic";
import Section from "@/components/ui/Section";

export default function CategoriesHighlight({lg = "4", all=false}) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    categories: [],
  });

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let active = true;
    const fetchCategories = async () => {
      try {
        const { data } = await axiosPublic.get("/api/v1/categories");
        if (active) {
          setState({ loading: false, error: null, categories: data || [] });
        }
      } catch (err) {
        if (active)
          setState({
            loading: false,
            error: "Failed to load categories.",
            categories: [],
          });
      }
    };
    fetchCategories();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Section className="-translate-y-20"
    noTitle={false}
      title="Categories"
      subtitle="Latest categories"
      viewAll="View Categories">
      <section className="w-full py-6 pt-0  relative">
        {state.loading ? (
          <SkeletonGrid />
        ) : state.error ? (
          <div className="alert alert-warning bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg p-4 shadow-md">
            {state.error}
          </div>
        ) : state.categories.length > 0 ? (
          <div className={`grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-${lg}`}>
            {all == true && state.categories.map((cat) => (
              <CategoryCard key={cat._id} cat={cat} />
            ))}

            
            {all == false && state.categories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat._id} cat={cat} />
            ))}

            
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-800/50 p-8 text-center shadow-md">
            No categories available yet. Please check back soon!
          </div>
        )}
      </section>
    </Section>
  );
}

/* -------------------- Card -------------------- */
function CategoryCard({ cat }) {
  return (
    <article className="relative border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
      {/* <Link to={`/category/${cat._id}`}> */}
      <Link to={`products`}> 
        <figure>
          <img
            src={
              cat.image ||
              "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt={cat.name}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="p-4 text-center">
          <h3 className="text-lg font-extrabold text-gray-700 dark:text-white transition group-hover:text-orange-400">
            {cat.name}
          </h3>
        </div>
      </Link>
    </article>
  );
}

/* -------------------- Skeleton -------------------- */
function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse"
        >
          <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 mx-auto bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>
  );
}
