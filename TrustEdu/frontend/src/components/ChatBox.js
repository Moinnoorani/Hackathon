// Legacy ChatBox component - replaced by enhanced TutorChat page
// This file is kept for backward compatibility

import React, { useState } from 'react';
import { chatWithTutor } from '../services/api';
import { Input, Button, Badge } from './ui';
import { Bot, Shield } from 'lucide-react';

const ChatBox = () => {
  const [studentId, setStudentId] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const sendQuestion = async () => {
    const res = await chatWithTutor({ studentId, question });

    setMessages([
      ...messages,
      { role: 'user', text: question },
      { role: 'ai', text: res.data.answer, blockchain: res.data.blockchain }
    ]);

    setQuestion('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Bot size={24} /> AI Tutor
      </h2>

      <Input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <div style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0.75rem',
        padding: '1rem',
        minHeight: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '1rem', padding: '0.75rem', borderRadius: '0.5rem', background: m.role === 'user' ? 'rgba(247, 147, 26, 0.1)' : 'rgba(255, 255, 255, 0.05)' }}>
            <strong style={{ color: m.role === 'user' ? 'var(--color-primary)' : 'var(--color-ai)' }}>
              {m.role === 'user' ? 'You' : 'AI'}:
            </strong> {m.text}
            {m.blockchain && (
              <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blockchain)' }}>
                <Shield size={12} />
                TX: {m.blockchain.txHash?.substring(0, 15)}...
              </div>
            )}
          </div>
        ))}
      </div>

      <Input
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Button onClick={sendQuestion}>Send</Button>
    </div>
  );
};

export default ChatBox;
