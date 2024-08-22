import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Adjust the path if necessary
import Home from "../pages/Home"; // Adjust the path if necessary
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgetPassword";
import UserProfile from "../pages/UserProfile";
import YourCart from "../components/YourCart";
import YourOrders from "../components/YourOrders";
import YourWishlist from "../components/YourWishlist";
import Product from "../pages/Product";
import MyAddress from "../components/MyAddress";
import UpdateProfile from "../components/UpdateProfile";
import SearchResults from "../pages/SearchProducts";
import AdminPanel from "../pages/AdminPanel";
import AdminUsers from "../adminComponents/AdminUsers";
import AdminProducts from "../adminComponents/AdminProducts";
import AdminOrders from "../adminComponents/AdminOrders";
import AdminCollections from "../adminComponents/AdminCollections";
import AdminReports from "../adminComponents/AdminReports";
import AdminDashboard from '../adminComponents/AdminDashboard'
import CategoryProducts from "../pages/CategoryProducts";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../components/NotFound";


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
            element: <AdminUsers />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "collections",
            element: <AdminCollections/>
          },
          {
            path: "reports",
            element: <AdminReports/>
          }
        ],
      },
      {
        path: "product",
        element: <Product/>
      },
      {
        path: 'search',
        element: <SearchResults/>
      },
      {
        path: 'category/:categoryName',
        element: <CategoryProducts/>
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword/>
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ],
  },
]);

export default Router;
