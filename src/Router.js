import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <React.Suspense fallback={<div>loading...</div>}>
          <Main />
        </React.Suspense>
      ),
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
