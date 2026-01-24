import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Button, Input, Card } from "../components/ui";

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        if (username.length < 3) {
            setError("Username must be at least 3 characters long.");
            return;
        }

        try {
            await authService.register(name, username, email, password);
            // After registration, redirect to dashboard
            navigate("/dashboard");
            window.location.reload(); // To update navbar state
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed. Try again."
            );
        }
    };

    return (
        <div className="section container min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full glass p-8 glow-gold">
                <h2 className="text-3xl font-heading font-bold text-center mb-6 gradient-text">
                    Join TrustEdu
                </h2>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Full Name
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Username
                        </label>
                        <Input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Password
                        </label>
                        <Input
                            type="password"
                            placeholder="Create a password (min 6 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Sign Up
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-muted">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:text-primary-light">
                        Login
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
