import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Adjust the path if necessary
import Home from "../pages/Home"; // Adjust the path if necessary

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default Router;
