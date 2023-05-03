import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ErrorPage from "./components/Error";
import Auction from "./pages/Auction";
import Profile from "./pages/Profile";
import Auctions from "./pages/Auctions";
import Signup from "./pages/Signup";
import About from "./pages/About";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Auctions />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/auctions",
      element: (
        <Layout>
          <Auctions />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/auction/:auctionId?",
      element: (
        <Layout>
          <Auction />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/profiles/:name?",
      element: (
        <Layout>
          <Profile />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: (
        <Layout>
          <Signup />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: (
        <Layout>
          <About />
        </Layout>
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
