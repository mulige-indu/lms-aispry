import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Courses from './components/Browse Courses/Courses';
import MyCourses from './components/Browse Courses/MyCourses';
import Apply from './components/home/Apply';
import Loader from './components/Loader';
import ForumOverview from './components/forum/ForumOverview';
import DiscussionThread from './components/forum/DiscussionThread';
import CreateThread from './components/forum/CreateThread';

import './components/home/VideoInfo.css';
import './components/home/LearnerOutcomes.css';
import './components/home/DownloadBrochure.css';
import './components/home/main-footer.css';
import './components/Browse Courses/Courses.css';
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
        <Route path="/courses" element={<Courses />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/forum" element={<ForumOverview />} />
        <Route path="/forum/category/:id" element={<ForumOverview />} />
        <Route path="/forum/thread/:threadId" element={<DiscussionThread />} />
        <Route path="/forum/create" element={<CreateThread />} />
      </Routes>
    </Router>
  );
};

export default App;