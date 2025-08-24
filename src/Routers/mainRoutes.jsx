import axios from "axios";
import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RootLayout from "@/layouts/RootLayout";
import ManageUsers from "@/pages/_dashboard/shared/users/ManageUsers";
import Dashboard from "@/pages/_dashboard/Dashboard";
import Error from "@/pages/_fronted/home/Error";
import Home from "@/pages/_fronted/home/Home";
import Login from "@/pages/_fronted/home/Login";

import SupportBloodAid from "@/components/SponsorBloodAid";
import ProfileDashboard from "@/pages/_dashboard/ProfileDashboard";
import CreateDonationRequestDashboard from "@/pages/_dashboard/shared/requests/CreateDonationRequestDashboard";
import MyDonationRequestsDashboard from "@/pages/_dashboard/shared/requests/MyDonationRequestsDashboard";
import MyDonationRequestsDetails from "@/pages/_dashboard/shared/requests/MyDonationRequestsDetails";
import MyDonationRequestsDetailsEdit from "@/pages/_dashboard/shared/requests/MyDonationRequestsDetailsEdit";
import DonationRequestsPublic from "@/pages/_dashboard/DonationRequestsPublic";

import ManageBlogs from "@/pages/_dashboard/admin/blogs/ManageBlogs";
import Blog from "@/pages/_fronted/blog/Blog";
import Search from "@/pages/_fronted/search/Search";
import FundingPage from "@/pages/_fronted/funding/FundingPage";
import ViewContactsDashboard from "@/pages/_dashboard/shared/contacts/ViewContactsDashboard";
import ManageDonationsAdmin from "@/pages/_dashboard/admin/requests/ManageDonationsAdmin";
import RegistrationPage from "@/pages/_fronted/home/Register";
import AllFundingAdmin from "@/pages/_dashboard/admin/funding/AllFundingAdmin";
import PrivateRoute from "./PrivateRoute";
import AddBlogs from "@/pages/_dashboard/shared/AddBlogs";
import Test from "@/pages/_fronted/test/Test";
import Urgent from "@/pages/_fronted/urgent/Urgent";
import Drives from "@/pages/_fronted/drives/Drives";
import Hospitals from "@/pages/_fronted/hospitals/Hospitals";
import About from "@/pages/_fronted/about/About";

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
        path: "/donation-requests",
        element: <DonationRequestsPublic />,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "hospitals",
        element: <Hospitals></Hospitals>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "registration",
        element: <RegistrationPage></RegistrationPage>,
      },
      {
        path: "blog",
        element: <Blog />,
      },{
        path: "donor",
        element: <Search />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "drives",
        element: <Drives />,
      },
      {
        path: "urgent",
        element: <Urgent />,
      },
      {
        path: '/sponsor',
        element: <SupportBloodAid></SupportBloodAid>

      },
      {
        path: '/funding',
        element:  <PrivateRoute><FundingPage></FundingPage></PrivateRoute>
      },
            {
        path: "test",
        element: <Test />,
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
      // {
      //   path: "all-users",
      //   element: <AllUsers />,
      // },
      {
        path: "manage-donations",
        element: <ManageDonationsAdmin />,
      },

      {
        path: "manage-users",
        element: <ManageUsers />,
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



