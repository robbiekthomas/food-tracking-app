import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getUserRow } from './api-requests';
import './App.css';

import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import TrackingPage from './pages/TrackingPage';


function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/tracking-page" element={(<TrackingPage />)} />
        <Route path="/" element={(<LandingPage />)} />
        <Route path="/dashboard-page" element={(<DashboardPage />)} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;