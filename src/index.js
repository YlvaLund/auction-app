import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

const Router = React.lazy(() => import("./Router"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router />
    </React.Suspense>
  </React.StrictMode>
);
