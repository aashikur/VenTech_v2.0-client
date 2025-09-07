// useCategories.js
import { useState, useEffect } from "react";
import useAxiosPublic from "./axiosPublic";

const useCategories = () => {

    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        const res = await axiosPublic.get("/api/v1/categories");
        if (!active) return;
        setData(res.data);
      } catch (err) {
        if (!active) return;
        console.error(err);
        setError("Failed to fetch categories");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCategories();
    return () => { active = false; };
  }, [axiosPublic]);

  return { data, loading, error };
};

export default useCategories;
