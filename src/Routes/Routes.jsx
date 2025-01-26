import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layoute/MainLayout";
import Home from "../Home/Home";
import Signup from "../Authentication/Signup";
import Login from "../Authentication/Login";
import Biodata from "../Pages/Biodata/Biodata";
import BiodataDetails from "../Pages/Biodata/BiodataDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageUsers from "../Pages/Dashboard/Admin/Manageusers";
import ApprovePremium from "../Pages/Dashboard/Admin/ApprovePremium";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import EditBiodata from "../Pages/Dashboard/UserDashBoard/EditBiodata";
import ViewBioData from "../Pages/Dashboard/UserDashBoard/ViewBioData";
import ContactRequest from "../Pages/Dashboard/UserDashBoard/ContactRequest";
import Payments from "../Pages/Dashboard/Payments/Payments";
import ApprovedContactRequest from "../Pages/Dashboard/Admin/ApprovedContactRequest";
import MyFavorite from "../Pages/Dashboard/UserDashBoard/MyFavorite";
import PrivateRoute from "./PrivateRoute";
import CreateYourBioData from "../Pages/Dashboard/UserDashBoard/CreateYourBioData";
import AboutPage from "../Pages/About/AboutPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import GotMarriedPage from "../Pages/Dashboard/UserDashBoard/GotMarriedPage";
import AdminRoute from "./AdminRoute";
import AdminSuccessStoryView from "../Pages/Dashboard/Admin/AdminSuccessStoryView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "biodatas",
        element: <Biodata></Biodata>,
      },
      {
        path: "biodataDetails/:id",
        element: (
          <PrivateRoute>
            <BiodataDetails></BiodataDetails>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(`http://localhost:5000/biodata`),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Payments></Payments>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(`http://localhost:5000/biodata`),
        // loader: () => fetch(`http://localhost:5000/biodata`),
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Admin Routs
      {
        path: "admin-dashboard",
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
      },
      {
        path: "approve-premium",
        element: <AdminRoute><ApprovePremium></ApprovePremium></AdminRoute>,
      },
      {
        path: "approve-contacts",
        element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>,
      },
      {
        path : 'success-stories' , 
        element : <AdminRoute><AdminSuccessStoryView></AdminSuccessStoryView></AdminRoute>
      } ,

      // user routes
      {
        path: "create-biodata",
        element: <CreateYourBioData></CreateYourBioData>,
      },
      {
        path: "edit-biodata",
        element: <EditBiodata></EditBiodata>,
      },
      {
        path: "view-biodata",
        element: <ViewBioData></ViewBioData>,
      },
      {
        path: "contact-requests",
        element: <ContactRequest></ContactRequest>,
      },
      {
        path: "favorites",
        element: <MyFavorite></MyFavorite>,
      },
      {
        path: "create-success-story",
        element: <GotMarriedPage></GotMarriedPage>,
      },
    ],
  },
]);
