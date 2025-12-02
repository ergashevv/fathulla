import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./pages/Header";
import Advantages from "./pages/Advantages";
import Catalog from "./pages/Catalog";
import Vacancies from "./pages/Vacancies";
import AboutCompany from "./pages/AboutCompany";
import OurPartners from "./pages/OurPartners";
import CategoryDetail from "./pages/CategoryDetail";
import { ToastContainer } from "react-toastify";
import "./i18lang";
import "react-toastify/dist/ReactToastify.css";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import HashProvider from "./components/HashProvider";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/aboutCompany",
    element: <Advantages />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/vacancies",
    element: <Vacancies />,
  },
  // {
  //   path: "/aboutCompany",
  //   element: <AboutCompany />,
  // },
  {
    path: "/ourPartners",
    element: <OurPartners />,
  },
  {
    path: "/category-detail",
    element: <CategoryDetail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
    <ToastContainer />
    <HashProvider>
      <RouterProvider router={routerConfig} />
    </HashProvider>
    </>
);
