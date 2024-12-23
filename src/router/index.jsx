import { useRoutes } from "react-router-dom";
import Home from "@/pages/home/Home";
import Latest from "@/pages/latest/Latest";
import NotFound from "../pages/not-found/NotFound";
import Layout from "../pages/layout/Layout";
import Detail from "@/pages/detail/Detail";
import CartPage from "../pages/cart/Cart";
import Search from "../pages/search/Search";
import TicketPage from "../pages/ticket/Ticket";
import LoginPage from "../pages/Login/Login";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/latest",
          element: <Latest />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/product/:id",
          element: <Detail />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/tickets",
          element: <TicketPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
};
export default Router;
