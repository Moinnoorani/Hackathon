import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { Shield, Brain, Link as LinkIcon, TrendingUp, Lock, Zap, ArrowRight } from 'lucide-react';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();
    const orbRef = React.useRef(null);

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!orbRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate percentage from center (-1 to 1)
            const x = (clientX - innerWidth / 2) / (innerWidth / 2);
            const y = (clientY - innerHeight / 2) / (innerHeight / 2);

            // Apply subtle rotation (max 15 degrees)
            // RotateY corresponds to X movement (left/right tilt)
            // RotateX corresponds to Y movement (up/down tilt) - inverted for natural feel
            orbRef.current.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
                        <div className="orb-float-wrapper">
                            <div className="orb-container" ref={orbRef}>
                                <div className="orb-ring orb-ring-1"></div>
                                <div className="orb-ring orb-ring-2"></div>
                                <div className="orb-core"></div>
                            </div>
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

                    <div className="tech-grid-2x2">
                        {/* Card 1: Explainable AI */}
                        <div className="tech-card hover-glow">
                            <span className="step-number-corner">01</span>
                            <div className="tech-card-header">
                                <div className="tech-icon-wrapper icon-ai-glow">
                                    <Brain size={24} />
                                </div>
                                <Badge variant="ai" className="tech-badge-corner">AI POWERED</Badge>
                            </div>

                            <h3 className="tech-title">AI Transparency</h3>
                            <p className="tech-description">
                                No more "black boxes." See exactly why a grade was predicted—whether it's marks, attendance, or quizzes.
                            </p>

                            <Button variant="outline" className="w-full mt-auto group">
                                View Analysis <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="card-corner-tl"></div>
                            <div className="card-corner-br"></div>
                        </div>

                        {/* Card 2: Bias Detection */}
                        <div className="tech-card hover-glow">
                            <span className="step-number-corner">02</span>
                            <div className="tech-card-header">
                                <div className="tech-icon-wrapper icon-warning-glow">
                                    <Shield size={24} />
                                </div>
                                <Badge variant="warning" className="tech-badge-corner">LIVE MONITORING</Badge>
                            </div>

                            <h3 className="tech-title">Bias Check</h3>
                            <p className="tech-description">
                                Our system actively scans for fairness. We ensure every student gets an equal opportunity, regardless of background.
                            </p>

                            <Button variant="outline" className="w-full mt-auto group">
                                Check Status <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="card-corner-tl"></div>
                            <div className="card-corner-br"></div>
                        </div>

                        {/* Card 3: Blockchain Verification */}
                        <div className="tech-card hover-glow">
                            <span className="step-number-corner">03</span>
                            <div className="tech-card-header">
                                <div className="tech-icon-wrapper icon-blockchain-glow">
                                    <LinkIcon size={24} />
                                </div>
                                <Badge variant="blockchain" className="tech-badge-corner">VERIFIED</Badge>
                            </div>

                            <h3 className="tech-title">Permanent Record</h3>
                            <p className="tech-description">
                                Every prediction is secured on the blockchain. This creates an unchangeable history that builds absolute trust.
                            </p>

                            <Button variant="outline" className="w-full mt-auto group">
                                Verify Logic <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="card-corner-tl"></div>
                            <div className="card-corner-br"></div>
                        </div>

                        {/* Card 4: Transparent Results */}
                        <div className="tech-card hover-glow">
                            <span className="step-number-corner">04</span>
                            <div className="tech-card-header">
                                <div className="tech-icon-wrapper icon-success-glow">
                                    <TrendingUp size={24} />
                                </div>
                                <Badge variant="success" className="tech-badge-corner">TRANSPARENT</Badge>
                            </div>

                            <h3 className="tech-title">Student Insights</h3>
                            <p className="tech-description">
                                Get clear, actionable feedback on how to improve. We give you the data you need to succeed.
                            </p>

                            <Button variant="outline" className="w-full mt-auto group">
                                See Report <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="card-corner-tl"></div>
                            <div className="card-corner-br"></div>
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
