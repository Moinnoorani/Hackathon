import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Badge } from '../components/ui';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';
import PredictionResult from '../components/PredictionResult';
import BlockchainVerification from '../components/BlockchainVerification';
import AuditTrail from '../components/AuditTrail';
import { createPrediction } from '../services/api';
import authService from '../services/authService';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [form, setForm] = useState({
    studentId: '',
    semester: '',
    marks: '',
    attendance: '',
    quizScore: '',
    assignmentScore: ''
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.user) {
      setCurrentUser(user.user);
      // Auto-fill studentId from username
      setForm(prev => ({ ...prev, studentId: user.user.username }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createPrediction({
        ...form,
        semester: Number(form.semester),
        marks: Number(form.marks),
        attendance: Number(form.attendance),
        quizScore: Number(form.quizScore),
        assignmentScore: Number(form.assignmentScore)
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ... (rest of helper functions)

  return (
    <div className="dashboard">
      {/* ... (Hero Section same as before) */}
      <section className="dashboard-hero">
        <div className="container">
          <div className="hero-content">
            <Badge variant="primary" className="dashboard-badge">
              <TrendingUp size={14} />
              Academic Intelligence
            </Badge>
            <h1 className="dashboard-title">
              Student <span className="gradient-text">Performance</span> Dashboard
            </h1>
            <p className="dashboard-description">
              Get AI-powered academic predictions with blockchain-verified transparency.
              Every prediction is explainable, unbiased, and permanently recorded.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Left Column - Input Form */}
            <div className="dashboard-form-section">
              <Card className="form-card">
                <Card.Header>
                  <Card.Title>Enter Academic Data</Card.Title>
                  <Card.Description>
                    Submit your academic metrics to receive an AI-powered performance prediction
                  </Card.Description>
                </Card.Header>

                <Card.Content>
                  <form onSubmit={handleSubmit} className="prediction-form">
                    <div className="form-row">
                      <Input
                        label="Username"
                        name="studentId"
                        value={form.studentId}
                        readOnly
                        disabled
                        className="opacity-75 cursor-not-allowed"
                      />
                      <Input
                        label="Semester"
                        name="semester"
                        type="number"
                        min="1" max="8"
                        placeholder="e.g., 5"
                        value={form.semester}
                        onChange={handleChange}
                        required
                        helperText="Current semester (1-8)"
                      />
                    </div>

                    <div className="form-row">
                      <Input
                        label="Overall Marks"
                        name="marks"
                        type="number"
                        min="0" max="100"
                        placeholder="e.g., 75"
                        value={form.marks}
                        onChange={handleChange}
                        required
                        helperText="Out of 100"
                      />
                      <Input
                        label="Attendance %"
                        name="attendance"
                        type="number"
                        min="0" max="100"
                        placeholder="e.g., 85"
                        value={form.attendance}
                        onChange={handleChange}
                        required
                        helperText="0-100%"
                      />
                    </div>

                    <div className="form-row">
                      <Input
                        label="Quiz Score"
                        name="quizScore"
                        type="number"
                        min="0" max="100"
                        placeholder="e.g., 80"
                        value={form.quizScore}
                        onChange={handleChange}
                        required
                        helperText="Average quiz score"
                      />
                      <Input
                        label="Assignment Score"
                        name="assignmentScore"
                        type="number"
                        min="0" max="100"
                        placeholder="e.g., 78"
                        value={form.assignmentScore}
                        onChange={handleChange}
                        required
                        helperText="Average assignment score"
                      />
                    </div>

                    {error && (
                      <div className="error-message">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      className={loading ? 'loading' : ''}
                      disabled={loading}
                    >
                      {loading ? 'Analyzing...' : 'Get AI Prediction'}
                    </Button>
                  </form>
                </Card.Content>
              </Card>
            </div>


            {/* Right Column - Results */}
            <div className="dashboard-results-section">
              {result ? (
                <>
                  <PredictionResult result={result} />
                  <BlockchainVerification blockchain={result.blockchain} />
                </>
              ) : (
                <Card className="empty-state">
                  <div className="empty-content">
                    <Award size={64} className="empty-icon" />
                    <h3>Ready for Prediction</h3>
                    <p>Fill in your academic data to receive an AI-powered performance analysis with blockchain verification.</p>
                  </div>
                </Card>
              )}

              {/* Audit Trail Section */}
              {currentUser && <AuditTrail studentId={currentUser.username} limit={5} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
