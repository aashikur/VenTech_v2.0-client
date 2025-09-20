export const base_api = import.meta.VITE_SERVER_URL

export const ENDPOINT = {
    auth: {
       sync : `${base_api}/api/v1/auth/`,
       me: `${base_api}/api/v1/auth/me`,

    }
}










// // src/config/index.js == Example

// // Base API URL
// export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/v1";

// // Endpoints
// export const ENDPOINTS = {
//   auth: {
//     sync: `${API_BASE}/auth/sync`,
//     me: `${API_BASE}/auth/me`,
//     updateProfile: `${API_BASE}/auth/update-profile`,
//     requestMerchant: `${API_BASE}/auth/request-merchant`,
//   },
//   admin: {
//     pendingMerchants: `${API_BASE}/admin/pending-merchants`,
//     approveMerchant: (id) => `${API_BASE}/admin/approve-merchant/${id}`,
//   },
//   products: {
//     public: `${API_BASE}/products/public`,
//     all: `${API_BASE}/products`,
//     byId: (id) => `${API_BASE}/products/${id}`,
//   },
//   merchant: {
//     data: `${API_BASE}/merchant-data`,
//   },
// };

// // Reusable runtime data (example)
// export const RUNTIME_IDS = {
//   demoUserId: "64c9d8f234abcd1234567890", // example user ID
//   demoProductId: "68c86587444a5f5b0547ed8f",
// };




// import { ENDPOINTS, RUNTIME_IDS } from "../config";
// import useAxiosPublic from "@/hooks/axiosPublic";

// const axiosPublic = useAxiosPublic();

// // Fetch user details
// const fetchUser = async () => {
//   const userId = RUNTIME_IDS.demoUserId;
//   const res = await axiosPublic.get(`/users/${userId}`);
//   console.log(res.data);
// };

// // Fetch product details
// const fetchProduct = async () => {
//   const productId = RUNTIME_IDS.demoProductId;
//   const res = await axiosPublic.get(ENDPOINTS.products.byId(productId));
//   console.log(res.data);
// };







