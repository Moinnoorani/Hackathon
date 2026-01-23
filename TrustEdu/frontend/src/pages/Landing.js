import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { Shield, Brain, Link as LinkIcon, TrendingUp, Lock, Zap } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg-grid"></div>
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>

                <div className="container hero-container">
                    <div className="hero-content">
                        <Badge variant="primary" className="hero-badge">
                            <Zap size={14} />
                            Hackathon 2026
                        </Badge>

                        <h1 className="hero-title">
                            Transparent AI for{' '}
                            <span className="gradient-text">Unbiased Learning</span>
                        </h1>

                        <p className="hero-description">
                            TrustEdu combines explainable AI and blockchain to deliver bias-free academic predictions
                            and accountable AI tutoring. Every prediction is transparent. Every interaction is verified.
                            Every student deserves fairness.
                        </p>

                        <div className="hero-cta">
                            <Button size="lg" onClick={() => navigate('/dashboard')}>
                                Get Started
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => navigate('/tutor')}>
                                Try AI Tutor
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-value">100%</div>
                                <div className="stat-label">Blockchain Verified</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">0</div>
                                <div className="stat-label">Hidden Predictions</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">95%</div>
                                <div className="stat-label">AI Accuracy</div>
                            </div>
                        </div>
                    </div>

                    {/* 3D Orb Visualization */}
                    <div className="hero-visual">
                        <div className="orb-container">
                            <div className="orb-ring orb-ring-1"></div>
                            <div className="orb-ring orb-ring-2"></div>
                            <div className="orb-core"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="section problem-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">The Problem We Solve</h2>
                        <p className="section-description">
                            AI bias and lack of accountability threaten fair education
                        </p>
                    </div>

                    <div className="problem-grid">
                        <Card variant="danger" className="problem-card">
                            <div className="icon-container icon-danger">
                                <Shield size={24} />
                            </div>
                            <Card.Title>Biased Predictions</Card.Title>
                            <Card.Description>
                                Traditional AI models can be manipulated through biased training data,
                                leading to unfair student assessments and missed opportunities.
                            </Card.Description>
                        </Card>

                        <Card variant="danger" className="problem-card">
                            <div className="icon-container icon-danger">
                                <Brain size={24} />
                            </div>
                            <Card.Title>Unaccountable AI</Card.Title>
                            <Card.Description>
                                AI tutors operate as black boxes with no oversight, potentially
                                providing incorrect advice with zero audit trail.
                            </Card.Description>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Solution - How It Works */}
            <section className="section how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            How <span className="gradient-text">TrustEdu</span> Works
                        </h2>
                        <p className="section-description">
                            Blockchain-verified AI for transparent, accountable education
                        </p>
                    </div>

                    <div className="timeline">
                        <div className="timeline-line"></div>

                        <div className="timeline-item">
                            <div className="timeline-number">1</div>
                            <Card glass className="timeline-card card-corners">
                                <div className="icon-container icon-ai">
                                    <Brain size={32} />
                                </div>
                                <Card.Title>Explainable AI Prediction</Card.Title>
                                <Card.Description>
                                    Advanced ML model analyzes student performance with SHAP-based explainability.
                                    See exactly which factors influence predictions - no black boxes.
                                </Card.Description>
                                <Badge variant="ai" className="mt-3">
                                    <Brain size={12} />
                                    AI Powered
                                </Badge>
                            </Card>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">2</div>
                            <Card glass className="timeline-card card-corners">
                                <div className="icon-container icon-warning">
                                    <Shield size={32} />
                                </div>
                                <Card.Title>Bias Detection</Card.Title>
                                <Card.Description>
                                    Real-time bias monitoring checks for demographic fairness and equal opportunity.
                                    Automated alerts ensure ethical AI at all times.
                                </Card.Description>
                                <Badge variant="warning" pulse>
                                    Live Monitoring
                                </Badge>
                            </Card>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">3</div>
                            <Card glass className="timeline-card card-corners">
                                <div className="icon-container icon-blockchain">
                                    <LinkIcon size={32} />
                                </div>
                                <Card.Title>Blockchain Verification</Card.Title>
                                <Card.Description>
                                    Every prediction and AI interaction is hashed and stored on-chain.
                                    Immutable proof creates permanent accountability.
                                </Card.Description>
                                <Badge variant="blockchain" pulse>
                                    On-Chain Verified
                                </Badge>
                            </Card>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-number">4</div>
                            <Card glass className="timeline-card card-corners">
                                <div className="icon-container icon-success">
                                    <TrendingUp size={32} />
                                </div>
                                <Card.Title>Transparent Results</Card.Title>
                                <Card.Description>
                                    Students receive detailed performance insights with blockchain proof,
                                    AI explanations, and actionable recommendations.
                                </Card.Description>
                                <Badge variant="success">
                                    100% Transparent
                                </Badge>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="section features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Cutting-Edge Features</h2>
                        <p className="section-description">
                            Everything you need for trustworthy educational AI
                        </p>
                    </div>

                    <div className="features-grid">
                        <Card hover className="feature-card">
                            <div className="icon-container icon-primary">
                                <Shield size={28} />
                            </div>
                            <Card.Title>SHAP Explainability</Card.Title>
                            <Card.Description>
                                Understand every prediction with Shapley values showing feature importance and decision logic.
                            </Card.Description>
                        </Card>

                        <Card hover className="feature-card">
                            <div className="icon-container icon-blockchain">
                                <Lock size={28} />
                            </div>
                            <Card.Title>Tamper-Proof Records</Card.Title>
                            <Card.Description>
                                Blockchain verification ensures no one can alter historical data or predictions retroactively.
                            </Card.Description>
                        </Card>

                        <Card hover className="feature-card">
                            <div className="icon-container icon-ai">
                                <Brain size={28} />
                            </div>
                            <Card.Title>Accountable AI Tutor</Card.Title>
                            <Card.Description>
                                Every conversation logged on-chain with GPT-4 powered responses and fallback safety mechanisms.
                            </Card.Description>
                        </Card>

                        <Card hover className="feature-card">
                            <div className="icon-container icon-success">
                                <TrendingUp size={28} />
                            </div>
                            <Card.Title>Performance Analytics</Card.Title>
                            <Card.Description>
                                Track student progress over time with detailed dashboards, trend analysis, and risk indicators.
                            </Card.Description>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <Card glass className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">
                                Ready to Experience <span className="gradient-text">Transparent AI</span>?
                            </h2>
                            <p className="cta-description">
                                Join the future of accountable education technology
                            </p>
                            <div className="cta-buttons">
                                <Button size="lg" onClick={() => navigate('/dashboard')}>
                                    Start Predicting
                                </Button>
                                <Button size="lg" variant="outline" onClick={() => navigate('/tutor')}>
                                    Chat with AI Tutor
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Landing;
