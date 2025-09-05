// import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import ManageUsers from "@/pages/dashboard/shared/users/ManageUsers";
import Dashboard from "@/pages/dashboard/Dashboard";
import Error from "@/components/shared/Error";
import Home from "@/pages/frontend/home/Home";
import Login from "@/pages/auth/Login";

import Sponsor from "@/components/shared/Sponsor";
import ProfileDashboard from "@/pages/dashboard/shared/ProfileDashboard";
import CreateDonationRequestDashboard from "@/pages/dashboard/shared/requests/CreateDonationRequestDashboard";
import MyDonationRequestsDashboard from "@/pages/dashboard/shared/requests/MyDonationRequestsDashboard";
import MyDonationRequestsDetails from "@/pages/dashboard/shared/requests/MyDonationRequestsDetails";
import MyDonationRequestsDetailsEdit from "@/pages/dashboard/shared/requests/MyDonationRequestsDetailsEdit";

import ManageBlogs from "@/pages/dashboard/admin/blogs/ManageBlogs";
import FundingPage from "@/pages/frontend/funding/FundingPage";
import ViewContactsDashboard from "@/pages/dashboard/shared/contacts/ViewContactsDashboard";
import ManageDonationsAdmin from "@/pages/dashboard/admin/requests/ManageDonationsAdmin";
import RegistrationPage from "@/pages/auth/Register";
import AllFundingAdmin from "@/pages/dashboard/admin/funding/AllFundingAdmin";
import PrivateRoute from "./PrivateRoute";
import AddBlogs from "@/pages/dashboard/shared/AddBlogs";
import ContactUs from "@/components/shared/ContactUs";
import ManageAllUsers from "@/pages/dashboard/admin/users/ManageAllUser";


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
        path: "manage-donations",
        element: <ManageDonationsAdmin />,
      },

      {
        path: "manage-users",
        // element: <ManageUsers />,
        element: <ManageAllUsers />,
      },
      {
        path: "profile",
        element: <ProfileDashboard />,
      },
      {
        path: "donation-request-details/:id",
        element: <MyDonationRequestsDetails />,
      },
      {
        path: "donation-request-details-edit/:id",
        element: <MyDonationRequestsDetailsEdit />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequestDashboard />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequestsDashboard />,
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
        path: "/dashboard/contacts",
        element: <ViewContactsDashboard />,
      },
      {
        path: "/dashboard/funding",
        element: <AllFundingAdmin />,
      },
      {
        path: "*",
        element: <Error></Error>,
      },

    ],
  },
]);

export default mainRoutes;



