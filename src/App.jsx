import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import EmployerLogin from "./pages/EmployerLogin.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import JobPosting from "./pages/JobPosting.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Settings from "./pages/Settings.jsx";
import Messages from "./pages/Messages.jsx";
import SearchEmployee from "./pages/SearchEmployee.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Home />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/pricing",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Pricing />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/contact",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Contact />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/employer-signup",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <EmployerSignup />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/employer-login",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <EmployerLogin />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/employer-dashboard",
    element: <ErrorBoundary><EmployerDashboard /></ErrorBoundary>,
  },
  {
    path: "/post-job",
    element: <ErrorBoundary><JobPosting /></ErrorBoundary>,
  },
  {
    path: "/my-jobs",
    element: <ErrorBoundary><MyJobs /></ErrorBoundary>,
  },
  {
    path: "/job-details/:jobId",
    element: <ErrorBoundary><JobDetails /></ErrorBoundary>,
  },
  {
    path: "/messages",
    element: <ErrorBoundary><Messages /></ErrorBoundary>,
  },
  {
    path: "/settings",
    element: <ErrorBoundary><Settings /></ErrorBoundary>,
  },
  {
    path: "/search-employee",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <SearchEmployee />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    )
  }
]);

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;