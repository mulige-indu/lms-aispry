import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import HomeMalaysia from './components/malaysia/HomeMalaysia';
import Loader from './components/Loader';

import './components/home/VideoInfo.css';
import './components/home/LearnerOutcomes.css';
import './components/home/DownloadBrochure.css';
import './components/home/main-footer.css';
import './components/home/Features.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/malaysia" element={<HomeMalaysia />} />
      </Routes>
    </Router>
  );
};

export default App;