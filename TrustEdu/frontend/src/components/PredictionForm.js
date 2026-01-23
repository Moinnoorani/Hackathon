// Legacy PredictionForm component - replaced by inline form in StudentDashboard
// This file is kept for backward compatibility

import React, { useState } from 'react';
import { createPrediction } from '../services/api';
import { Input, Button } from './ui';

const PredictionForm = ({ onResult }) => {
  const [form, setForm] = useState({
    studentId: '',
    semester: '',
    marks: '',
    attendance: '',
    quizScore: '',
    assignmentScore: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPrediction({
      ...form,
      semester: Number(form.semester),
      marks: Number(form.marks),
      attendance: Number(form.attendance),
      quizScore: Number(form.quizScore),
      assignmentScore: Number(form.assignmentScore)
    });
    onResult(res.data);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Enter Academic Data</h2>

      <Input name="studentId" placeholder="Student ID" onChange={handleChange} required />
      <Input name="semester" type="number" placeholder="Semester" onChange={handleChange} required />
      <Input name="marks" type="number" placeholder="Marks" onChange={handleChange} required />
      <Input name="attendance" type="number" placeholder="Attendance %" onChange={handleChange} required />
      <Input name="quizScore" type="number" placeholder="Quiz Score" onChange={handleChange} required />
      <Input name="assignmentScore" type="number" placeholder="Assignment Score" onChange={handleChange} required />

      <Button type="submit" fullWidth>Get Prediction</Button>
    </form>
  );
};

export default PredictionForm;
