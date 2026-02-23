// =============================================
//  App.jsx — Root Application Component
// =============================================
//
//  This is the entry point for the React component tree.
//  It sets up:
//    1. React Router (BrowserRouter)
//    2. The global Layout wrapper (Navbar + mesh bg)
//    3. Route definitions for each page
//
//  As you build pages, add new <Route> elements below.
// =============================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import InterviewRoom from "./pages/InterviewRoom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room/:id" element={<InterviewRoom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

