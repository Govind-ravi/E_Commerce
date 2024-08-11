import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Adjust the path if necessary
import Home from "../pages/Home"; // Adjust the path if necessary
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgetPassword";
import UserProfile from "../pages/UserProfile";
import AdminPanel from "../pages/AdminPanel";
import AdminUser from "../components/AdminUser";
import AdminProducts from "../components/AdminProducts";
import AdminDashboard from "../components/AdminDashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "adminpanel",
        element: <AdminPanel />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUser />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
        ],
      },
    ],
  },
]);

export default Router;
