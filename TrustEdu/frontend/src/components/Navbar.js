import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../services/authService";
import { Button } from "./ui";
import { useTheme } from "../context/ThemeContext";
import { LogOut, User, GraduationCap, Moon, Sun } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(undefined);
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav className={`navbar-container ${scrolled ? "navbar-glass" : ""}`}>
            {/* Logo */}
            <Link to="/" className="navbar-logo">
                <GraduationCap size={28} className="logo-icon" />
                <span>Trust<span className="logo-text-gradient">Edu</span></span>
            </Link>

            {/* Center Links (Only for logged in users) */}
            <div className="navbar-links">
                {currentUser && (
                    <>
                        <Link to="/dashboard" className={`nav-item ${isActive("/dashboard")}`}>
                            Dashboard
                        </Link>
                        <Link to="/tutor" className={`nav-item ${isActive("/tutor")}`}>
                            AI Tutor
                        </Link>
                        <Link to="/audit" className={`nav-item ${isActive("/audit")}`}>
                            Audit History
                        </Link>
                    </>
                )}
            </div>

            {/* Right Side (Profile / Auth) */}
            <div className="navbar-user">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2 text-muted hover:text-foreground">
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </Button>

                {currentUser ? (
                    <>
                        <div className="user-greeting">
                            <User size={16} />
                            <span>Hi, <span className="user-name">{currentUser.user?.name || currentUser.user?.username}</span></span>
                        </div>
                        <Button size="sm" variant="outline" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={14} />
                            Logout
                        </Button>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="btn-login">
                            Login
                        </Link>
                        <Link to="/register" className="btn-signup">
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
