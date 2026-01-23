import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import TutorChat from "./pages/TutorChat";
import { Button } from "./components/ui";
import "./App.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Trust</span>
          <span className="logo-gradient">Edu</span>
        </Link>

        <div className="navbar-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/tutor" className="nav-link">AI Tutor</Link>
        </div>

        <div className="navbar-cta">
          <Button size="sm" onClick={() => navigate('/dashboard')}>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor" element={<TutorChat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
