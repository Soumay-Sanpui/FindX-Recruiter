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
import ChatPage from './pages/ChatPage.jsx'

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
    path: "/chat/:jobId",  // New route for the chat page
    element: (
      <div className="min-h-screen flex flex-col">
        
        <main className="flex-1">
          <ChatPage /> {/* ChatPage component will be rendered here */}
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
    path: "/settings",
    element: <Settings />,
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