import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Button, Input, Card } from "../components/ui";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            navigate("/dashboard");
            window.location.reload(); // To update navbar state if needed
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <div className="section container min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full glass p-8 glow-orange-lg">
                <h2 className="text-3xl font-heading font-bold text-center mb-6 gradient-text">
                    Welcome Back
                </h2>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Username
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted mb-2">
                            Password
                        </label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full">
                        Login
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-muted">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:text-primary-light">
                        Sign up
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
