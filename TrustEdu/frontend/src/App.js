import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import TutorChat from "./pages/TutorChat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuditPage from "./pages/AuditPage";
import authService from "./services/authService";
import { Button } from "./components/ui";
import "./App.css";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="app min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="main-content flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor" element={<TutorChat />} />
            <Route path="/audit" element={<AuditPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
