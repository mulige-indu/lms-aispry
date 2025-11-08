import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './components/courses/CoursePageModern';
import Courses from './components/courses/Courses';
import MyCourses from './components/courses/MyCourses';
import Apply from './components/home/Apply';
import Loader from './pages/auth/Loader';
import ForumOverview from './components/forum/ForumOverview';
import DiscussionThread from './components/forum/DiscussionThread';
import CreateThread from './components/forum/CreateThread';

import './styles/GlobalResponsive.css'; // Import responsive styles first
import './styles/VideoInfo.css';
import './styles/AttractiveForm.css';
import './styles/LearnerOutcomes.css';
import './styles/DownloadBrochure.css';
import './components/home/AlumniPage.css';
import './components/home/Footer.css';
import './components/courses/Courses.css';
import './components/home/Features.css';
import './components/home/AICareerCompact.css';

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
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