import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { Button, Input } from "../components/ui";
import {
    User, Lock, Eye, EyeOff, Shield,
    ArrowRight, Wallet
} from "lucide-react";
import { ethers } from "ethers";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await authService.login(username, password);
            // Simulate "Secure Handshake" delay
            setTimeout(() => {
                navigate("/dashboard");
                window.location.reload();
            }, 800);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
            setLoading(false);
        }
    };

    const connectWallet = async () => {
        setIsConnecting(true);
        setError("");

        try {
            if (!window.ethereum) {
                throw new Error("MetaMask is not installed. Please install it to use this feature.");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const walletAddress = await signer.getAddress();

            // Optional: Sign a message for extra security verification (verified on backend)
            // const signature = await signer.signMessage("Sign in to TrustEdu");

            await authService.walletLogin(walletAddress);

            navigate("/dashboard");
            window.location.reload();

        } catch (err) {
            console.error(err);
            setError(err.message || "Wallet connection failed.");
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="login-container">
            {/* LEFT SIDE: Brand & Visuals */}
            <div className="login-brand-section">
                {/* Abstract Background */}
                <div className="brand-art-bg">
                    <div className="brand-pattern"></div>
                    <div className="brand-gradient"></div>
                    <div className="brand-glow"></div>
                </div>

                <div className="brand-content">
                    <div className="brand-badge">
                        <Shield size={16} className="text-primary" />
                        <span>BLOCKCHAIN SECURED v2.0</span>
                    </div>

                    <h1 className="brand-title">
                        The Future of <br />
                        <span className="gradient-text">Transparent Education</span>
                    </h1>

                    <p className="brand-description">
                        Join thousands of students and educators leveraging AI and Blockchain for unbiased, verifiable academic performance tracking.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="login-form-section">
                <div className="login-card">
                    <div className="login-header">
                        <h2 className="login-title">Welcome Back</h2>
                        <p className="login-subtitle">Connect your wallet or enter credentials to access your academic vault.</p>
                    </div>

                    {error && (
                        <div className="login-error flex flex-col items-start gap-2">
                            <div className="flex items-center gap-2">
                                <Shield size={18} />
                                {error}
                            </div>
                            {error.includes("MetaMask is not installed") && (
                                <a
                                    href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary underline hover:text-primary-light ml-6"
                                >
                                    Install from Chrome Web Store &rarr;
                                </a>
                            )}
                        </div>
                    )}

                    {/* Wallet Login Button */}
                    <div className="mb-6">
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            fullWidth
                            onClick={connectWallet}
                            disabled={isConnecting || loading}
                            className="group relative overflow-hidden border-primary/50 hover:bg-primary/10 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isConnecting ? (
                                    <>Connecting...</>
                                ) : (
                                    <>
                                        <Wallet size={20} className="text-primary" />
                                        Connect Wallet
                                    </>
                                )}
                            </span>
                            {/* Animated Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
                        </Button>

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-muted text-xs uppercase tracking-wider">Or using credentials</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <Input
                            label="Username"
                            type="text"
                            placeholder="Student ID / User"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            // Not required if just connecting wallet, but required for form submission
                            // Handled by browser validation on submit
                            leftIcon={<User size={18} />}
                            variant="floating"
                        />

                        <div className="input-group-password">
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftIcon={<Lock size={18} />}
                                rightIcon={
                                    showPassword ?
                                        <EyeOff size={18} onClick={() => setShowPassword(false)} /> :
                                        <Eye size={18} onClick={() => setShowPassword(true)} />
                                }
                                variant="floating"
                            />
                            <Link to="/forgot-password" className="forgot-password-link">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            fullWidth
                            disabled={loading || isConnecting}
                            className="group"
                        >
                            <span className="login-btn-content">
                                {loading ? "Authenticating..." : "Access Dashboard"}
                                {!loading && <ArrowRight size={18} />}
                            </span>
                        </Button>
                    </form>

                    <div className="login-footer">
                        Don't have an account?{" "}
                        <Link to="/register" className="register-link">
                            Create Identity
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
