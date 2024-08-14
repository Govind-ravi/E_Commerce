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
import YourCart from "../components/YourCart";
import YourOrders from "../components/YourOrders";
import YourWishlist from "../components/YourWishlist";
import Product from "../pages/Product";
import MyAddress from "../components/MyAddress";
import UpdateProfile from "../components/UpdateProfile";
import SearchResults from "../pages/SearchProducts";

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
        children: [
          {
            path: "",
            element: <YourCart />,
          },
          {
            path: "myorders",
            element: <YourOrders />,
          },
          {
            path: "mywishlist",
            element: <YourWishlist />,
          },
          {
            path: "myaddress",
            element: <MyAddress />,
          },
          {
            path: "update",
            element: <UpdateProfile/>
          }
        ]
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
      {
        path: "product",
        element: <Product/>
      },
      {
        path: 'search',
        element: <SearchResults/>
      }
    ],
  },
]);

export default Router;
