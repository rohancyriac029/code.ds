// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import TwoSum from './pages/twosum';
import Welcome from './pages/welcome'; 
import AddTwoNumbers from './pages/addtwonumbers';
import Median from './pages/medianoftwosortedarrays';
import LongestPalindromicSubstring from './pages/longestpalindromicsubstring';
import ZigzagConversion from './pages/zigzagconversion';
import ReverseInteger from './pages/reverseinteger';
// Import Welcome page
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root Route - Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* TwoSum Route */}
        <Route path="/twosum" element={<TwoSum />} />

        <Route path="/addtwonumbers" element={<AddTwoNumbers />} />

        <Route path="/medianoftwosortedarrays" element={<Median />} />

        <Route path="/longestpalindromicsubstring" element={<LongestPalindromicSubstring />} />

        <Route path="/zigzagconversion" element={<ZigzagConversion />} />

        <Route path="/reverseinteger" element={<ReverseInteger />} />



      </Routes>
    </Router>
  );
};

export default App;
