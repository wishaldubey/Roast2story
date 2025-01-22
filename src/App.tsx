import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import RoastPage from './pages/RoastPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<HomePage />} />
          <Route path="/roast/:sessionId" element={<RoastPage />} />
          <Route path="/dashboard/:sessionId" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="bottom-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;