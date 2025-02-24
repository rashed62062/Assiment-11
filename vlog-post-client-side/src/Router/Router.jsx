import { createBrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";
import Layout from "../Layout/Layout";
import SignUp from "../Companet/from/SignUp";
import Login from "../Companet/from/Login";
import AddBlog from "../Pages/AddBlog";
import Home from "../Pages/Home/Home";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import Wishlist from "../Pages/Wishlist";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      
      {
        path: "allBlog",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "FeaturedBlogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      //   blog adding  and user authenticated route
      {
        path: "addBlog",
        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>,
      },
      {
        path: "wishlist",
        element: <PrivateRoute> <Wishlist></Wishlist></PrivateRoute>,
      },

      //   user  logins
      {
        path: "register",
        element: <SignUp></SignUp>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
