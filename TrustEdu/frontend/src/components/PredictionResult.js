import React from 'react';
import { Card, Badge } from './ui';
import { TrendingUp, TrendingDown, AlertTriangle, Award, Brain, Target } from 'lucide-react';
import './PredictionResult.css';

const PredictionResult = ({ result }) => {
  if (!result) return null;

  const { prediction, student } = result;

  const getRiskIcon = (risk) => {
    if (risk === 'Low') return <TrendingUp size={24} />;
    if (risk === 'Medium') return <AlertTriangle size={24} />;
    return <TrendingDown size={24} />;
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'success';
    if (risk === 'Medium') return 'warning';
    return 'danger';
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'var(--color-success)';
    if (grade === 'B' || grade === 'B+') return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  const confidencePercentage = Math.round((prediction?.confidence || 0) * 100);

  return (
    <div className="prediction-result">
      {/* Main Prediction Card */}
      <Card variant="highlight" className="prediction-card">
        <div className="prediction-header">
          <div className="prediction-icon" style={{ color: `var(--color-${getRiskColor(prediction?.riskLevel)})` }}>
            {getRiskIcon(prediction?.riskLevel)}
          </div>
          <div className="prediction-meta">
            <span className="prediction-label">AI Prediction Result</span>
            <Badge variant={getRiskColor(prediction?.riskLevel)} pulse>
              {prediction?.riskLevel} Risk
            </Badge>
          </div>
        </div>

        <div className="prediction-main">
          <div className="grade-display">
            <div className="grade-label">Predicted Grade</div>
            <div className="grade-value" style={{ color: getGradeColor(prediction?.predictedGrade) }}>
              {prediction?.predictedGrade || 'N/A'}
            </div>
          </div>

          <div className="confidence-meter">
            <div className="confidence-header">
              <span className="confidence-label">AI Confidence</span>
              <span className="confidence-value">{confidencePercentage}%</span>
            </div>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Breakdown */}
      <Card className="performance-card">
        <Card.Header>
          <div className="card-header-flex">
            <div>
              <Card.Title>Performance Analysis</Card.Title>
              <Card.Description>Your academic metrics breakdown</Card.Description>
            </div>
            <Brain size={24} className="header-icon" />
          </div>
        </Card.Header>

        <Card.Content>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-icon" style={{ background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.5)' }}>
                <Target size={20} style={{ color: 'var(--color-ai)' }} />
              </div>
              <div className="metric-info">
                <div className="metric-label">Overall Marks</div>
                <div className="metric-value">{student?.marks || 0}/100</div>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${student?.marks || 0}%`, background: 'var(--gradient-primary)' }} />
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.5)' }}>
                <TrendingUp size={20} style={{ color: 'var(--color-blockchain)' }} />
              </div>
              <div className="metric-info">
                <div className="metric-label">Attendance</div>
                <div className="metric-value">{student?.attendance || 0}%</div>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${student?.attendance || 0}%`, background: 'linear-gradient(to right, #3b82f6, #60a5fa)' }} />
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.5)' }}>
                <Award size={20} style={{ color: 'var(--color-success)' }} />
              </div>
              <div className="metric-info">
                <div className="metric-label">Quiz Score</div>
                <div className="metric-value">{student?.quizScore || 0}/100</div>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${student?.quizScore || 0}%`, background: 'linear-gradient(to right, #10b981, #34d399)' }} />
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
                <Award size={20} style={{ color: 'var(--color-warning)' }} />
              </div>
              <div className="metric-info">
                <div className="metric-label">Assignment Score</div>
                <div className="metric-value">{student?.assignmentScore || 0}/100</div>
              </div>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: `${student?.assignmentScore || 0}%`, background: 'linear-gradient(to right, #f59e0b, #fbbf24)' }} />
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Recommendations */}
      <Card className="recommendations-card">
        <Card.Header>
          <Card.Title>AI Recommendations</Card.Title>
          <Card.Description>Personalized suggestions to improve performance</Card.Description>
        </Card.Header>

        <Card.Content>
          <div className="recommendations">
            {prediction?.riskLevel === 'High' && (
              <>
                <div className="recommendation-item danger">
                  <AlertTriangle size={18} />
                  <span>High risk detected. Please schedule a meeting with your academic advisor immediately.</span>
                </div>
                {student?.attendance < 75 && (
                  <div className="recommendation-item warning">
                    <TrendingUp size={18} />
                    <span>Improve attendance - currently at {student.attendance}%. Target 75%+</span>
                  </div>
                )}
              </>
            )}

            {prediction?.riskLevel === 'Medium' && (
              <>
                <div className="recommendation-item warning">
                  <AlertTriangle size={18} />
                  <span>Medium risk level. Focus on consistent study habits and assignment completion.</span>
                </div>
                {student?.quizScore < 70 && (
                  <div className="recommendation-item info">
                    <Brain size={18} />
                    <span>Practice weekly quizzes to improve your score from {student.quizScore}%</span>
                  </div>
                )}
              </>
            )}

            {prediction?.riskLevel === 'Low' && (
              <div className="recommendation-item success">
                <Award size={18} />
                <span>Excellent performance! Maintain your current study routine and consider helping peers.</span>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PredictionResult;
