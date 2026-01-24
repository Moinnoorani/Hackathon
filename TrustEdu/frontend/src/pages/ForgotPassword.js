import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import { Button, Input } from "../components/ui";
import {
    Mail, ArrowRight, Shield, ArrowLeft, CheckCircle
} from "lucide-react";
import "./Login.css"; // Reuse Login styles for consistency

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            // Display error to user (you might want to add an error state variable to the component)
            alert(err.response?.data?.message || "Failed to send reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* LEFT SIDE: Brand & Visuals (Reused) */}
            <div className="login-brand-section">
                <div className="brand-art-bg">
                    <div className="brand-pattern"></div>
                    <div className="brand-gradient"></div>
                    <div className="brand-glow"></div>
                </div>

                <div className="brand-content">
                    <div className="brand-badge">
                        <Shield size={16} className="text-primary" />
                        <span>ACCOUNT RECOVERY</span>
                    </div>

                    <h1 className="brand-title">
                        Secure Access <br />
                        <span className="gradient-text">Restoration</span>
                    </h1>

                    <p className="brand-description">
                        Don't worry, it happens. We'll verify your identity via blockchain-secured email verification to get you back on track.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Form */}
            <div className="login-form-section">
                <div className="login-card">
                    {!submitted ? (
                        <>
                            <div className="login-header">
                                <h2 className="login-title">Forgot Password?</h2>
                                <p className="login-subtitle">Enter your email address to receive a recovery link.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="login-form">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="student@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    leftIcon={<Mail size={18} />}
                                    variant="floating"
                                />

                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    disabled={loading}
                                    className="group"
                                >
                                    <span className="login-btn-content">
                                        {loading ? "Sending Link..." : "Send Reset Link"}
                                        {!loading && <ArrowRight size={18} />}
                                    </span>
                                </Button>
                            </form>

                            <div className="login-footer">
                                <Link to="/login" className="flex items-center justify-center gap-2 text-muted hover:text-foreground transition-colors">
                                    <ArrowLeft size={16} />
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-8 glass rounded-2xl border border-white/5 animate-entry">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Check your inbox</h2>
                            <p className="text-muted mb-8">
                                We've sent a password reset link to <strong>{email}</strong>. Please check your email to restore access.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSubmitted(false)}
                                className="w-full"
                            >
                                Try another email
                            </Button>
                            <div className="mt-6">
                                <Link to="/login" className="text-sm text-muted hover:text-foreground">
                                    Return to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
