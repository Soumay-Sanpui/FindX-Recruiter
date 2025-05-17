import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import EmployerLogin from "./pages/EmployerLogin.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import JobPosting from "./pages/JobPosting.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import Settings from "./pages/Settings.jsx";
import Messages from "./pages/Messages.jsx";
import SearchEmployee from "./pages/SearchEmployee.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Home />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/pricing",
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Pricing />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/employer-signup",
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <EmployerSignup />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/employer-login",
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <EmployerLogin />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/employer-dashboard",
    element: <EmployerDashboard />,
  },
  {
    path: "/post-job",
    element: <JobPosting />,
  },
  {
    path: "/my-jobs",
    element: <MyJobs />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/search-employee",
    element: <SearchEmployee />,
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;