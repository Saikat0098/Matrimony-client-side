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
        element: <BiodataDetails></BiodataDetails>,
        loader: () => fetch(`http://localhost:5000/biodata`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin Routs
      {
        path: "admin-dashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "approve-premium",
        element: <ApprovePremium></ApprovePremium>,
      },

      // user routes
      {
        path: 'edit-biodata',
        element: <EditBiodata></EditBiodata>
      }
    ],
  },
]);
