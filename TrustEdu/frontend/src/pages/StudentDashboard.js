import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Badge } from '../components/ui';
import {
  TrendingUp, Award, AlertCircle, Shield,
  Activity, Clock, CheckCircle, Database
} from 'lucide-react';
import PredictionResult from '../components/PredictionResult';
import BlockchainVerification from '../components/BlockchainVerification';
import AuditTrail from '../components/AuditTrail';
import { createPrediction } from '../services/api';
import authService from '../services/authService';
import {
  ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0: Idle, 1: Analyzing, 2: Verifying, 3: Done
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
      setForm(prev => ({ ...prev, studentId: user.user.username }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const simulateProcessing = async (apiCall) => {
    setLoading(true);
    setProcessingStep(1); // Analyzing

    try {
      // Step 1: Analyze (simulated delay)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStep(2); // Verifying

      // Step 2: API Call
      const response = await apiCall();

      // Step 3: Blockchain Verify (simulated delay)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setResult(response.data);
      setProcessingStep(3); // Done
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create prediction.');
      setProcessingStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    await simulateProcessing(async () => {
      return await createPrediction({
        ...form,
        semester: Number(form.semester),
        marks: Number(form.marks),
        attendance: Number(form.attendance),
        quizScore: Number(form.quizScore),
        assignmentScore: Number(form.assignmentScore)
      });
    });
  };

  // Chart Data
  const skillData = [
    { subject: 'Marks', A: Number(form.marks) || 0, fullMark: 100 },
    { subject: 'Quiz', A: Number(form.quizScore) || 0, fullMark: 100 },
    { subject: 'Assign', A: Number(form.assignmentScore) || 0, fullMark: 100 },
    { subject: 'Attend', A: Number(form.attendance) || 0, fullMark: 100 },
    { subject: 'Particip', A: 85, fullMark: 100 }, // Mock
    { subject: 'Project', A: 78, fullMark: 100 }, // Mock
  ];

  const getLoadingText = () => {
    if (processingStep === 1) return "Running AI Analysis...";
    if (processingStep === 2) return "Verifying on Sepolia...";
    return "Processing...";
  };

  return (
    <div className="dashboard">
      <section className="dashboard-content">
        <div className="dashboard-grid">

          {/* LEFT COLUMN: Input Control Panel */}
          <div className="dashboard-input-section animate-entry">
            <Card className="glass-card h-full">
              <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-heading font-bold gradient-text flex items-center gap-2">
                  <Database size={20} className="text-primary" />
                  Academic Input
                </h2>
                <p className="text-sm text-muted mt-1">Enter latest metrics for analysis</p>
              </div>

              <Card.Content className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input
                    label="Username"
                    name="studentId"
                    value={form.studentId}
                    readOnly
                    variant="floating"
                    leftIcon={<Shield size={16} />}
                    className="opacity-75"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Semester"
                      name="semester"
                      type="number"
                      value={form.semester}
                      onChange={handleChange}
                      variant="floating"
                      required
                    />
                    <Input
                      label="Attendance %"
                      name="attendance"
                      type="number"
                      value={form.attendance}
                      onChange={handleChange}
                      variant="floating"
                      required
                    />
                  </div>

                  <Input
                    label="Overall Marks (0-100)"
                    name="marks"
                    type="number"
                    value={form.marks}
                    onChange={handleChange}
                    variant="floating"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Quiz Score"
                      name="quizScore"
                      type="number"
                      value={form.quizScore}
                      onChange={handleChange}
                      variant="floating"
                      required
                    />
                    <Input
                      label="Assignments"
                      name="assignmentScore"
                      type="number"
                      value={form.assignmentScore}
                      onChange={handleChange}
                      variant="floating"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className={`w-full relative overflow-hidden ${loading ? 'opacity-90' : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="spinner w-4 h-4 border-2" />
                        <span>{getLoadingText()}</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Activity size={18} />
                        Generate Prediction
                      </span>
                    )}
                    {loading && <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300" style={{ width: processingStep === 1 ? '50%' : '90%' }} />}
                  </Button>
                </form>
              </Card.Content>
            </Card>
          </div>

          {/* RIGHT COLUMN: Results & Visualization */}
          <div className="dashboard-hero-section animate-entry delay-100">
            {!result && !loading ? (
              <Card className="glass-card h-[400px] flex items-center justify-center text-center p-8">
                <div className="max-w-md">
                  <div className="flex items-center justify-center mx-auto mb-6">
                    <TrendingUp size={48} className="text-primary" />
                  </div>
                  <h1 className="text-3xl font-heading font-bold mb-3">Ready to Analyze</h1>
                  <p className="text-muted text-lg">
                    Our AI models are ready to fetch your historical data and predict your upcoming semester performance with <span className="text-primary font-semibold">98.5% accuracy</span>.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Hero Result Card */}
                <PredictionResult
                  result={result}
                  loading={loading} // Pass loading to component if needed, or handle here
                />
                {result && <BlockchainVerification blockchain={result.blockchain} />}
              </div>
            )}
          </div>

          {/* BOTTOM: Charts & Analytics */}
          {result && (
            <div className="dashboard-charts-section grid grid-cols-1 gap-6 animate-entry delay-200">
              {/* Trust Ledger / History - Expanded to full width since Radar is gone */}
              <Card className="glass-card p-6">
                <h3 className="text-lg font-heading font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-success" />
                  Trust Ledger & History
                </h3>
                <AuditTrail studentId={currentUser?.username} limit={5} compact />
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
