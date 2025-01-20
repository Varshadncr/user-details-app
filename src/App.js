import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';
import ThemeProvider from './components/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
