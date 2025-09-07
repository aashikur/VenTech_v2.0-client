// import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Error from "@/components/shared/Error";
import Home from "@/pages/frontend/home/Home";
import Login from "@/pages/auth/Login";

import Sponsor from "@/components/shared/Sponsor";
import ProfileDashboard from "@/pages/dashboard/shared/ProfileDashboard";
import ManageBlogs from "@/pages/dashboard/admin/blogs/ManageBlogs";
import FundingPage from "@/pages/frontend/funding/FundingPage";
import RegistrationPage from "@/pages/auth/Register";
import AllFundingAdmin from "@/pages/dashboard/admin/funding/AllFundingAdmin";
import PrivateRoute from "./PrivateRoute";
import AddBlogs from "@/pages/dashboard/shared/AddBlogs";
import ContactUs from "@/components/shared/ContactUs";
import ManageAllUsers from "@/pages/dashboard/admin/users/ManageAllUser";
import PendingMerchants from "@/pages/dashboard/admin/users/PendingMerchants";
import MailBox from "@/pages/dashboard/admin/MailBox";
import Analytics from "@/pages/dashboard/admin/analytics/analytics";
import AddProducts from "@/pages/dashboard/merchant/AddProducts";
import MyProductsMerchant from "@/pages/dashboard/merchant/ProductsMerchant";
import SingleBlog from "@/pages/frontend/home/section/SingleBlog";
import Categories from "@/pages/dashboard/merchant/Categories";


const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <RegistrationPage></RegistrationPage>,
      },

      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: '/sponsor',
        element: <Sponsor></Sponsor>

      },
      {
        path: '/single-blog/:id',
        element: <SingleBlog></SingleBlog>

      },
      {
        path: '/categories',
        element: <div>go create component</div>
      },

      {
        path: '/sponsor',
        element: <Sponsor></Sponsor>

      },
      {
        path: '/funding',
        element:  <PrivateRoute><FundingPage></FundingPage></PrivateRoute>
      },

    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "manage-users",
        element: <ManageAllUsers />,
      },
      {
        path: "profile",
        element: <ProfileDashboard />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "add-blog",
        // element: <div>hello</div>,
        element: <AddBlogs />,
        
      },
      {
        path: "content-management",
        element: <ManageBlogs />,
      },
      {
        path: "add-product",
        element: <AddProducts />,
      },
      
      {
        path: "/dashboard/mailbox",
        element: <MailBox />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
      },
      {
        path: "/dashboard/funding",
        element: <AllFundingAdmin />,
      },
      {
        path: "/dashboard/pending-merchant",
        element: <PendingMerchants/>,
      },
      {
        path: "/dashboard/my-products",
        element: <MyProductsMerchant/>,
      },
      {
        path: "*",
        element: <Error></Error>,
      },

    ],
  },
]);

export default mainRoutes;



