import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import HowItWorks from "./pages/HowItWorks.jsx";
import Features from "./pages/Features.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import EmployerSignup from "./pages/EmployerSignup.jsx";
import EmployerLogin from "./pages/EmployerLogin.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import JobPosting from "./pages/JobPosting.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import JobDetailsUser from "./pages/JobDetailsUser.jsx";
import MessagesUser from "./pages/MessagesUser.jsx";
import Settings from "./pages/Settings.jsx";
import Messages from "./pages/Messages.jsx";
import SearchEmployee from "./pages/SearchEmployee.jsx";
import Broadcast from "./pages/Broadcast.jsx";
import BroadcastNav from "./components/BroadcastNav.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import InterviewManagement from './pages/InterviewManagement';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentHistory from './pages/PaymentHistory';

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
    element: (
      <ErrorBoundary>
        <EmployerDashboard />
        <BroadcastNav />
      </ErrorBoundary>
    ),
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
    path: "/job/:jobId",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <JobDetailsUser />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/messages/:jobId",
    element: <ErrorBoundary><Messages /></ErrorBoundary>,
  },
  {
    path: "/chat/:jobId",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <MessagesUser />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/settings",
    element: <ErrorBoundary><Settings /></ErrorBoundary>,
  },
  {
    path: "/broadcast",
    element: <ErrorBoundary><Broadcast /></ErrorBoundary>,
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
  },
  {
    path: "/how-it-works",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <HowItWorks />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/features",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Features />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/faq",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <FAQ />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/terms",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Terms />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/privacy",
    element: (
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Privacy />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    ),
  },
  {
    path: "/interview-management",
    element: <ErrorBoundary><InterviewManagement /></ErrorBoundary>,
  },
  {
    path: "/payment-success",
    element: <ErrorBoundary><PaymentSuccess /></ErrorBoundary>,
  },
  {
    path: "/payment-history",
    element: <ErrorBoundary><PaymentHistory /></ErrorBoundary>,
  },
]);

const App = () => {
  useEffect(() => {
    // Initialize mock API for development
    // setupMockAPI();
  }, []);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;