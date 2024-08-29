import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import JobListing from "./pages/Job-Listing";
import JobPage from "./pages/Job";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJob";

import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import Myjobs from "./pages/Myjobs";
import ProtectedRoutes from "./components/protected-routes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
            <Onboarding />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoutes>
            <JobListing />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
            <JobPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/postjob",
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoutes>
            <SavedJobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <Myjobs />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
