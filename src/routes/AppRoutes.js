import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import Inquiries from '../pages/Inquiries/Inquiries';
import Reports from '../pages/Reports/Reports';
import Users from '../pages/Users/Users';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<Users />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/trainers" element={<Inquiries />} />
    </Routes>
  );
}
