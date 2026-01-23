import React, { useState } from 'react';
import { Card, Input, Button, Badge } from '../components/ui';
import { Bot, Send, Clock, Shield, Sparkles } from 'lucide-react';
import { chatWithTutor } from '../services/api';
import './TutorChat.css';

const TutorChat = () => {
  const [studentId, setStudentId] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quickQuestions = [
    "How can I improve my grades?",
    "What's my current academic risk level?",
    "Tips for better attendance?",
    "Explain machine learning to me"
  ];

  const sendQuestion = async (customQuestion = null) => {
    const queryText = customQuestion || question;

    if (!studentId || !queryText) {
      setError('Please enter both Student ID and a question');
      return;
    }

    setLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage = {
      role: 'user',
      text: queryText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');

    try {
      const response = await chatWithTutor({ studentId, question: queryText });

      const aiMessage = {
        role: 'ai',
        text: response.data.answer,
        type: response.data.type,
        blockchain: response.data.blockchain,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get response. Please try again.');
      console.error('Tutor error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="tutor-chat">
      {/* Hero Section */}
      <section className="chat-hero">
        <div className="container">
          <div className="hero-content">
            <Badge variant="ai" className="chat-badge">
              <Sparkles size={14} />
              AI-Powered Assistant
            </Badge>
            <h1 className="chat-title">
              Accountable <span className="gradient-text">AI Tutor</span>
            </h1>
            <p className="chat-description">
              Get instant help with your academic questions. Every conversation is logged on-chain
              for full transparency and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="chat-content">
        <div className="container">
          <div className="chat-container">
            {/* Sidebar - Student ID */}
            <div className="chat-sidebar">
              <Card>
                <Card.Header>
                  <Card.Title>Student Info</Card.Title>
                  <Card.Description>Enter your ID to start chatting</Card.Description>
                </Card.Header>
                <Card.Content>
                  <Input
                    label="Student ID"
                    placeholder="e.g., STU-2024-001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />

                  <div className="quick-questions">
                    <div className="quick-label">Quick Questions:</div>
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        className="quick-question-btn"
                        onClick={() => sendQuestion(q)}
                        disabled={!studentId || loading}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </div>

            {/* Main Chat */}
            <div className="chat-main">
              <Card className="chat-card">
                {/* Messages */}
                <div className="messages-container">
                  {messages.length === 0 ? (
                    <div className="empty-chat">
                      <Bot size={64} className="empty-icon" />
                      <h3>Start a Conversation</h3>
                      <p>Ask me anything about your academics, studying tips, or general educational topics!</p>
                    </div>
                  ) : (
                    <div className="messages-list">
                      {messages.map((msg, idx) => (
                        <div key={idx} className={`message message-${msg.role}`}>
                          <div className="message-avatar">
                            {msg.role === 'user' ? (
                              <div className="avatar-user">You</div>
                            ) : (
                              <Bot size={20} />
                            )}
                          </div>
                          <div className="message-content">
                            <div className="message-header">
                              <span className="message-sender">
                                {msg.role === 'user' ? 'You' : 'AI Tutor'}
                              </span>
                              <span className="message-time">
                                <Clock size={12} />
                                {formatTime(msg.timestamp)}
                              </span>
                            </div>
                            <div className="message-text">{msg.text}</div>
                            {msg.blockchain && (
                              <div className="message-blockchain">
                                <Shield size={12} />
                                <span>Verified on blockchain</span>
                                <code className="tx-hash">{msg.blockchain.txHash?.substring(0, 10)}...</code>
                              </div>
                            )}
                            {msg.type && (
                              <Badge
                                variant={msg.type === 'ACADEMIC' ? 'primary' : 'default'}
                                size="sm"
                                className="message-badge"
                              >
                                {msg.type}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="message message-ai">
                          <div className="message-avatar">
                            <Bot size={20} />
                          </div>
                          <div className="message-content">
                            <div className="typing-indicator">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="chat-input-container">
                  {error && (
                    <div className="chat-error">{error}</div>
                  )}
                  <div className="chat-input-wrapper">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Ask a question..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={loading || !studentId}
                    />
                    <Button
                      onClick={() => sendQuestion()}
                      disabled={loading || !studentId || !question}
                      className="send-button"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorChat;
