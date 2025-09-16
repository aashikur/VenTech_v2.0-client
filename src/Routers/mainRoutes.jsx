// import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import PrivateRoute from "./PrivateRoute";

// Public Pages
import Home from "@/pages/frontend/home/Home";
import Login from "@/pages/auth/Login";
import RegistrationPage from "@/pages/auth/Register";
import ContactUs from "@/components/shared/ContactUs";
import ProductsPage from "@/pages/frontend/product/ProductsPage";
import ProductDetails from "@/pages/frontend/product/ProductDetails";
import CategoriesPage from "@/pages/frontend/categories/CategoriesPage";
import BlogsPage from "@/pages/frontend/blogs/BlogsPage";
import SingleBlog from "@/pages/frontend/home/section/SingleBlog";
import Error from "@/components/shared/Error";

// Dashboard Pages
import Dashboard from "@/pages/dashboard/Dashboard";
import ProfileDashboard from "@/pages/dashboard/shared/ProfileDashboard";
import Order from "@/pages/frontend/shared/Order";

// Admin Pages
import ManageAllUsers from "@/pages/dashboard/admin/users/ManageAllUser";
import PendingMerchants from "@/pages/dashboard/admin/users/PendingMerchants";
import MailBox from "@/pages/dashboard/admin/MailBox";
import Analytics from "@/pages/dashboard/admin/analytics/analytics";
import ManageBlogs from "@/pages/dashboard/admin/blogs/ManageBlogs";
import ManageProducts from "@/pages/dashboard/shared/ManageProducts";

// Merchant Pages
import AddProducts from "@/pages/dashboard/merchant/AddProducts";
import MyProductsMerchant from "@/pages/dashboard/merchant/ProductsMerchant";
import Categories from "@/pages/dashboard/merchant/Categories";
import AddBlogs from "@/pages/dashboard/shared/AddBlogs";
import IDCardGenerator from "@/components/certificate/IDCardGenerator";
import MyRequest from "@/pages/dashboard/merchant/MyRequest";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "registration", element: <RegistrationPage /> },
      { path: "contact", element: <ContactUs /> },
      { path: "products", element: <ProductsPage /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "single-blog/:id", element: <SingleBlog /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "blogs", element: <BlogsPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Shared Routes
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <ProfileDashboard /> },
      { path: "my-orders", element: <Order /> },
      { path: "add-blog", element: <AddBlogs /> },
      
      // Admin Routes
      { path: "manage-users", element: <ManageAllUsers /> },
      { path: "content-management", element: <ManageBlogs /> },
      { path: "mailbox", element: <MailBox /> },
      { path: "analytics", element: <Analytics /> },
      { path: "manageproduct", element: <ManageProducts /> },
      { path: "pending-merchant", element: <PendingMerchants /> },
      
      // Merchant Routes
      { path: "categories", element: <Categories /> },
      { path: "add-product", element: <AddProducts /> },
      { path: "my-products", element: <MyProductsMerchant /> },
      { path: "certificate", element: <IDCardGenerator /> },
      { path: "my-requests", element: <MyRequest /> },
      
      // Error Route
      { path: "*", element: <Error /> },
    ],
  },
]);

export default mainRoutes;



