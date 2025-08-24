import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/`,
  });

  return instance;
};

export default useAxiosPublic;
