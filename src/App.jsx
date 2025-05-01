import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";

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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;