import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollingNavbar from './ScrollingNavbar';
import MainNavbar from './MainNavbar';
import CourseCard from '../common/CourseCard';
import '../courses/CourseSlider.css';
import './AboutLeadership.css';
import './TrainingCenters.css';
import './AlumniSection.css';
// No longer using FontAwesome icons - all replaced with custom SVG icons

// ✅ SVG ICONS for courses - Relevant and professional with colors
const DataScienceIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#1e88e5"/>
    <circle cx="17" cy="17" r="1.5" fill="#26c6da"/>
    <circle cx="14" cy="14" r="1" fill="#26c6da"/>
    <circle cx="10" cy="11" r="1" fill="#26c6da"/>
  </svg>
);

const AIIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#7e57c2"/>
    <circle cx="8.5" cy="10.5" r="1.5" fill="#ab47bc"/>
    <circle cx="15.5" cy="10.5" r="1.5" fill="#ab47bc"/>
    <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#ab47bc"/>
    <path d="M11 6h2v4h-2z" fill="#ce93d8"/>
  </svg>
);

const BusinessIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zM4 9h16v5h-5v-2H9v2H4V9zm9 6h-2v-2h2v2zm6 4H5v-3h4v2h6v-2h4v3z" fill="#fb8c00"/>
  </svg>
);

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" fill="#29b6f6"/>
    <path d="M8 13h2v4H8zm3-2h2v6h-2zm3 4h2v2h-2z" fill="#81d4fa"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 3 7.647 3l-.004 2.35h4.363v.617H5.92s-2.927-.332-2.927 4.282 0 4.244 0 4.244h1.735v-2.022s-.094-2.78 2.857-2.78z" fill="#3776ab"/>
    <circle cx="8.5" cy="5.5" r=".75" fill="#ffffff"/>
    <path d="M14.415 12.308h-4.328s-2.432-.039-2.432 2.35v3.951S7.286 21 12.064 21c4.574 0 4.289 0 4.289 0l.004-2.35h-4.363v-.617h6.086s2.927.332 2.927-4.282 0-4.244 0-4.244h-1.735v2.022s.094 2.78-2.857 2.78z" fill="#ffd343"/>
    <circle cx="15.5" cy="18.5" r=".75" fill="#3776ab"/>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#43a047"/>
    <path d="M10 17l-3.5-3.5 1.41-1.41L10 14.17l6.09-6.09L17.5 9.5z" fill="#66bb6a"/>
  </svg>
);

// Additional SVG icons (not used in main courses but kept for reference)
const WebDevIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path d="M3 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H3zm1 2h16v3H4V6zm0 5h7v7H4v-7zm9 0h7v7h-7v-7z" fill="#5c6bc0"/>
  </svg>
);

const UIDesignIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path d="M3 3h18v4H3V3zm0 7h9v11H3V10zm11 0h7v11h-7V10z" fill="#ec407a"/>
  </svg>
);

const MarketingIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40">
    <path d="M3 11v6a2 2 0 0 0 2 2h2v2l4-2h3a2 2 0 0 0 2-2v-2L3 11zM21 5h-6V3h6v2z" fill="#26a69a"/>
  </svg>
);

// Feature Icons
const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill="#7e57c2"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="#fb8c00"/>
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="#fdd835"/>
  </svg>
);

const LaptopIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" fill="#29b6f6"/>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 2.5s4.5 2.04 4.5 5.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7 0-3.46 4.5-5.5 4.5-5.5zM5.5 11c0-2.09 1.09-4.09 2.5-5.39v2.73c-1.06.99-1.81 2.33-2.05 3.66H5.5zm13 0h-.45c-.24-1.33-.99-2.67-2.05-3.66V5.61c1.41 1.3 2.5 3.3 2.5 5.39zM12 21.5l-3-5h6l-3 5z" fill="#ef5350"/>
    <circle cx="12" cy="9" r="1.5" fill="#ffb74d"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#66bb6a"/>
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="#5c6bc0"/>
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#ff7043"/>
  </svg>
);

// Social Media Icons
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient)"/>
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FD5949"/>
        <stop offset="50%" stopColor="#D6249F"/>
        <stop offset="100%" stopColor="#285AEB"/>
      </linearGradient>
    </defs>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
  </svg>
);

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);
  const [currentCenterSlide, setCurrentCenterSlide] = useState(0);
  const [expandedCenter, setExpandedCenter] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Touch gesture states
  const [featureTouchStart, setFeatureTouchStart] = useState(0);
  const [featureTouchEnd, setFeatureTouchEnd] = useState(0);
  const [centerTouchStart, setCenterTouchStart] = useState(0);
  const [centerTouchEnd, setCenterTouchEnd] = useState(0);

  // Career calculator states
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('0-2 Years');
  const [salaryData, setSalaryData] = useState({
    current: '₹3-5 LPA',
    projected: '₹8-12 LPA',
    growth: '+180%'
  });
  const [careerTracks, setCareerTracks] = useState([
    {
      icon: <DataScienceIcon />,
      title: 'Data Analyst',
      salary: '₹4-8 LPA',
      timeline: '3-4 Months',
      skills: ['Python', 'SQL', 'Tableau'],
      demand: 'High Demand'
    },
    {
      icon: <AIIcon />,
      title: 'Data Scientist',
      salary: '₹8-15 LPA',
      timeline: '6-8 Months',
      skills: ['Machine Learning', 'Python', 'Statistics'],
      demand: 'Very High'
    },
    {
      icon: <CloudIcon />,
      title: 'ML Engineer',
      salary: '₹12-25 LPA',
      timeline: '8-10 Months',
      skills: ['Deep Learning', 'MLOps', 'Cloud'],
      demand: 'Extreme'
    }
  ]);
  const [salaryUpdateKey, setSalaryUpdateKey] = useState(0);

  const navigate = useNavigate();

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preserve scroll position on page reload
  useEffect(() => {
    // Restore scroll position on mount
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    // Save scroll position on scroll
    const handleScroll = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modern scroll-based slider tracking for features
  useEffect(() => {
    if (!isMobile) return;

    const featuresGrid = document.querySelector('.features-section .features-grid');
    if (!featuresGrid) return;

    const handleScroll = () => {
      const cards = featuresGrid.querySelectorAll('.feature-card');
      const scrollLeft = featuresGrid.scrollLeft;
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 16; // 1rem gap
      const currentIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentFeatureSlide(Math.min(currentIndex, cards.length - 1));
    };

    featuresGrid.addEventListener('scroll', handleScroll);
    return () => featuresGrid.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Simple Fade Slider for training centers
  useEffect(() => {
    const cards = document.querySelectorAll('.training-centers-section .center-card');
    if (cards.length === 0) return;

    if (!isMobile) {
      // On desktop, remove all active classes
      cards.forEach((card) => {
        card.classList.remove('active');
      });
      return;
    }

    // On mobile: add/remove active class
    cards.forEach((card, index) => {
      if (index === currentCenterSlide) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }, [isMobile, currentCenterSlide]);

  // Course data
  const courses = [
    {
      icon: <DataScienceIcon />,
      name: 'Data Science',
      description: 'Master Python, Machine Learning, and Statistical Analysis',
      features: ['6 Months', 'Live Projects', 'Job Assistance']
    },
    {
      icon: <AIIcon />,
      name: 'Artificial Intelligence',
      description: 'Deep Learning, Neural Networks, and AI Applications',
      features: ['8 Months', 'Industry Projects', 'Certifications']
    },
    {
      icon: <BusinessIcon />,
      name: 'Business Analytics',
      description: 'Excel, Tableau, Power BI, and Business Intelligence',
      features: ['4 Months', 'Case Studies', 'Global Certification']
    },
    {
      icon: <CloudIcon />,
      name: 'Cloud Computing',
      description: 'AWS, Azure, Google Cloud Platform and DevOps',
      features: ['5 Months', 'Hands-on Labs', 'Cloud Certifications']
    },
    {
      icon: <PythonIcon />,
      name: 'Python Programming',
      description: 'Full Stack Python Development and Web Applications',
      features: ['3 Months', 'Portfolio Projects', 'Mentorship']
    },
    {
      icon: <SecurityIcon />,
      name: 'Cyber Security',
      description: 'Ethical Hacking, Network Security, and Digital Forensics',
      features: ['7 Months', 'Lab Simulations', 'Security Certifications']
    }
  ];

  // Career calculator handlers
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    updateSalaryProjection(role, selectedExperience);
  };

  const handleExperienceChange = (experience) => {
    setSelectedExperience(experience);
    updateSalaryProjection(selectedRole, experience);
  };

  const updateSalaryProjection = (role, experience) => {
    // Realistic salary data based on Indian market (2024-2025)
    const salaryMatrix = {
      'Student/Fresher': {
        '0-2 Years': { current: '₹2.5-4 LPA', projected: '₹6-9 LPA', growth: '+140%' },
        '3-5 Years': { current: '₹4-6 LPA', projected: '₹9-14 LPA', growth: '+133%' },
        '5+ Years': { current: '₹6-9 LPA', projected: '₹14-20 LPA', growth: '+140%' }
      },
      'Software Developer': {
        '0-2 Years': { current: '₹4-7 LPA', projected: '₹8-12 LPA', growth: '+80%' },
        '3-5 Years': { current: '₹7-12 LPA', projected: '₹15-22 LPA', growth: '+100%' },
        '5+ Years': { current: '₹12-18 LPA', projected: '₹20-30 LPA', growth: '+75%' }
      },
      'Business Analyst': {
        '0-2 Years': { current: '₹3.5-6 LPA', projected: '₹7-11 LPA', growth: '+90%' },
        '3-5 Years': { current: '₹6-10 LPA', projected: '₹12-18 LPA', growth: '+85%' },
        '5+ Years': { current: '₹10-15 LPA', projected: '₹18-25 LPA', growth: '+75%' }
      },
      'Marketing Executive': {
        '0-2 Years': { current: '₹3-5 LPA', projected: '₹8-12 LPA', growth: '+150%' },
        '3-5 Years': { current: '₹5-8 LPA', projected: '₹12-18 LPA', growth: '+133%' },
        '5+ Years': { current: '₹8-12 LPA', projected: '₹16-24 LPA', growth: '+110%' }
      },
      'Sales Representative': {
        '0-2 Years': { current: '₹2.5-5 LPA', projected: '₹8-13 LPA', growth: '+160%' },
        '3-5 Years': { current: '₹5-9 LPA', projected: '₹13-20 LPA', growth: '+133%' },
        '5+ Years': { current: '₹9-14 LPA', projected: '₹18-28 LPA', growth: '+110%' }
      },
      'Teacher': {
        '0-2 Years': { current: '₹2.5-4 LPA', projected: '₹7-11 LPA', growth: '+170%' },
        '3-5 Years': { current: '₹4-6 LPA', projected: '₹11-16 LPA', growth: '+150%' },
        '5+ Years': { current: '₹6-9 LPA', projected: '₹16-22 LPA', growth: '+140%' }
      },
      'Other': {
        '0-2 Years': { current: '₹3-5 LPA', projected: '₹8-12 LPA', growth: '+150%' },
        '3-5 Years': { current: '₹5-9 LPA', projected: '₹12-18 LPA', growth: '+120%' },
        '5+ Years': { current: '₹9-14 LPA', projected: '₹18-26 LPA', growth: '+100%' }
      }
    };

    // Career track recommendations based on role and experience
    const careerTrackMatrix = {
      'Student/Fresher': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: '₹4-8 LPA',
          timeline: '3-4 Months',
          skills: ['Excel', 'SQL', 'Power BI'],
          demand: 'High Demand'
        },
        {
          icon: <PythonIcon />,
          title: 'Python Developer',
          salary: '₹5-10 LPA',
          timeline: '4-5 Months',
          skills: ['Python', 'Django', 'APIs'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: '₹6-11 LPA',
          timeline: '3-4 Months',
          skills: ['Analytics', 'SQL', 'Tableau'],
          demand: 'High Demand'
        }
      ],
      'Software Developer': [
        {
          icon: <AIIcon />,
          title: 'Data Scientist',
          salary: '₹10-18 LPA',
          timeline: '5-6 Months',
          skills: ['ML', 'Python', 'Statistics'],
          demand: 'Very High'
        },
        {
          icon: <CloudIcon />,
          title: 'ML Engineer',
          salary: '₹15-28 LPA',
          timeline: '6-8 Months',
          skills: ['Deep Learning', 'TensorFlow', 'Cloud'],
          demand: 'Extreme'
        },
        {
          icon: <AIIcon />,
          title: 'AI Engineer',
          salary: '₹18-35 LPA',
          timeline: '8-10 Months',
          skills: ['NLP', 'Computer Vision', 'LLMs'],
          demand: 'Extreme'
        }
      ],
      'Business Analyst': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: '₹6-12 LPA',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Tableau'],
          demand: 'High Demand'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Intelligence Analyst',
          salary: '₹8-15 LPA',
          timeline: '4-5 Months',
          skills: ['Power BI', 'SQL', 'Data Modeling'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Analytics Manager',
          salary: '₹12-22 LPA',
          timeline: '5-6 Months',
          skills: ['Strategy', 'ML', 'Leadership'],
          demand: 'High Demand'
        }
      ],
      'Marketing Executive': [
        {
          icon: <DataScienceIcon />,
          title: 'Marketing Data Analyst',
          salary: '₹6-12 LPA',
          timeline: '3-4 Months',
          skills: ['Analytics', 'SQL', 'Google Analytics'],
          demand: 'High Demand'
        },
        {
          icon: <RocketIcon />,
          title: 'Growth Analyst',
          salary: '₹8-16 LPA',
          timeline: '4-5 Months',
          skills: ['Python', 'A/B Testing', 'SQL'],
          demand: 'Very High'
        },
        {
          icon: <AIIcon />,
          title: 'Marketing Science Analyst',
          salary: '₹12-20 LPA',
          timeline: '5-6 Months',
          skills: ['ML', 'Statistics', 'Marketing'],
          demand: 'Very High'
        }
      ],
      'Sales Representative': [
        {
          icon: <DataScienceIcon />,
          title: 'Sales Data Analyst',
          salary: '₹6-13 LPA',
          timeline: '3-4 Months',
          skills: ['Excel', 'SQL', 'Salesforce'],
          demand: 'High Demand'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: '₹8-16 LPA',
          timeline: '4-5 Months',
          skills: ['Analytics', 'CRM', 'Forecasting'],
          demand: 'Very High'
        },
        {
          icon: <DataScienceIcon />,
          title: 'Sales Intelligence Analyst',
          salary: '₹12-22 LPA',
          timeline: '5-6 Months',
          skills: ['ML', 'Predictive Analytics', 'Python'],
          demand: 'Very High'
        }
      ],
      'Teacher': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: '₹5-10 LPA',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Visualization'],
          demand: 'High Demand'
        },
        {
          icon: <AIIcon />,
          title: 'EdTech Data Scientist',
          salary: '₹8-15 LPA',
          timeline: '5-6 Months',
          skills: ['ML', 'Learning Analytics', 'Python'],
          demand: 'Very High'
        },
        {
          icon: <BookIcon />,
          title: 'Technical Content Creator',
          salary: '₹6-12 LPA',
          timeline: '3-4 Months',
          skills: ['Programming', 'Teaching', 'Content'],
          demand: 'High Demand'
        }
      ],
      'Other': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: '₹5-10 LPA',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Excel'],
          demand: 'High Demand'
        },
        {
          icon: <AIIcon />,
          title: 'Data Scientist',
          salary: '₹10-18 LPA',
          timeline: '6-8 Months',
          skills: ['ML', 'Statistics', 'Python'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: '₹7-13 LPA',
          timeline: '4-5 Months',
          skills: ['Analytics', 'SQL', 'Business'],
          demand: 'High Demand'
        }
      ]
    };

    if (role && salaryMatrix[role] && salaryMatrix[role][experience]) {
      setSalaryData(salaryMatrix[role][experience]);
      setSalaryUpdateKey(prev => prev + 1);

      // Update career tracks based on role
      if (careerTrackMatrix[role]) {
        setCareerTracks(careerTrackMatrix[role]);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendSMS = async (phoneNumber, name) => {
    try {
      // SMS message content
      const message = `Dear ${name},

Thank you for booking a Free Live Class with 360DigiTMG!

What's Next:
- Check your email for class details
- Our team will contact you within 24 hours
- Get ready to transform your career!

About 360DigiTMG:
- 15,000+ successful placements
- Industry-expert trainers
- Global certifications
- 95% job placement rate

Contact: +91-40-23456789
Website: www.360digitmg.com
Email: info@360digitmg.com

We're excited to have you on this journey!

- Team 360DigiTMG`;

      // API endpoint for SMS service
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          message: message,
          name: name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS message');
      }

      console.log('SMS message sent successfully to:', phoneNumber);
      return true;
    } catch (error) {
      console.error('Error sending SMS message:', error);
      // Don't fail the form submission if SMS fails
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Save seat reservation to localStorage
      const reservations = JSON.parse(localStorage.getItem('seatReservations') || '[]');
      const newReservation = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString()
      };

      reservations.push(newReservation);
      localStorage.setItem('seatReservations', JSON.stringify(reservations));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to reserve seat. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleLearnMore = () => {
    navigate("/courses");
  };

  // Course slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Features slider navigation - Modern scroll-based
  const nextFeatureSlide = () => {
    const featuresGrid = document.querySelector('.features-section .features-grid');
    if (featuresGrid) {
      const cards = featuresGrid.querySelectorAll('.feature-card');
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 16;
      featuresGrid.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    }
  };

  const prevFeatureSlide = () => {
    const featuresGrid = document.querySelector('.features-section .features-grid');
    if (featuresGrid) {
      const cards = featuresGrid.querySelectorAll('.feature-card');
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 16;
      featuresGrid.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const goToFeatureSlide = (index) => {
    const featuresGrid = document.querySelector('.features-section .features-grid');
    if (featuresGrid) {
      const cards = featuresGrid.querySelectorAll('.feature-card');
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = 16;
      featuresGrid.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
    }
  };

  // Training centers 3D carousel navigation
  const nextCenterSlide = () => {
    setCurrentCenterSlide((prev) => (prev + 1) % 9);
  };

  const prevCenterSlide = () => {
    setCurrentCenterSlide((prev) => (prev - 1 + 9) % 9);
  };

  const goToCenterSlide = (index) => {
    setCurrentCenterSlide(index);
  };

  const toggleCenterExpand = (centerId) => {
    setExpandedCenter(expandedCenter === centerId ? null : centerId);
  };

  // Touch gesture handlers for features slider
  const handleFeatureTouchStart = (e) => {
    setFeatureTouchStart(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchMove = (e) => {
    setFeatureTouchEnd(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchEnd = () => {
    if (!featureTouchStart || !featureTouchEnd) return;
    const distance = featureTouchStart - featureTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentFeatureSlide < 7) {
      nextFeatureSlide();
    }
    if (isRightSwipe && currentFeatureSlide > 0) {
      prevFeatureSlide();
    }

    setFeatureTouchStart(0);
    setFeatureTouchEnd(0);
  };

  // Touch swipe for stacked cards
  const handleCenterTouchStart = (e) => {
    setCenterTouchStart(e.targetTouches[0].clientX);
  };

  const handleCenterTouchMove = (e) => {
    setCenterTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCenterTouchEnd = () => {
    if (!centerTouchStart || !centerTouchEnd) return;
    const distance = centerTouchStart - centerTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCenterSlide();
    }
    if (isRightSwipe) {
      prevCenterSlide();
    }

    setCenterTouchStart(0);
    setCenterTouchEnd(0);
  };

  return (
    <main className="App">
      <ScrollingNavbar />
      <MainNavbar />

      <div className="main-content">
        <header className="hero-heading">
          <h1>Become the Top 1% in Tech</h1>
        </header>

        <section className="video-booking-section">
          <aside className="video-aside">
            <div className="video-container">
              <video id="background-video" controls loading="lazy" className="course-video">
					<source src="https://360digit.b-cdn.net/assets/video/thankyou.mp4" type="video/mp4"/>
					<source src="https://360digit.b-cdn.net/assets/video/thankyou.webm" type="video/webm"/>
				          </video>
            </div>

            <div className="video-info">
              <h3>Unlock Your Potential with an AI-Driven Curriculum</h3>

              <div className="course-features">
                <ul className="features-list compact">
                  <li>✓ Master cutting-edge AI & ML with a curriculum designed by industry titans.</li>
                  <li>✓ Build a portfolio of real-world projects, from predictive modeling to neural networks.</li>
                  <li>✓ Receive personalized career coaching and land interviews at top-tier tech companies.</li>
                </ul>
              </div>
            </div>
          </aside>

          <aside className="booking-aside">
            <div className="booking-form-container">
              <div className="form-header compact">
                <h2 className="booking-heading">Book Your <br />Free Live Class</h2>
              </div>

              {submitSuccess ? (
                <div className="form-success-message">
                  <h3>✅ Thank You!</h3>
                  <p>Your seat for the free live class has been reserved. We've sent the details to your email.</p>
                </div>
              ) : (
                <form className="student-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.name ? 'error' : ''}`}
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.email ? 'error' : ''}`}
                      required
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.phone ? 'error' : ''}`}
                      required
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <button type="submit" className="submit-btn modern" disabled={isSubmitting}>
                    <h2>{isSubmitting ? 'Reserving...' : 'Reserve Your Seat'}</h2>
                  </button>

                  <div className="form-footer compact">
                    <p className="guarantee-text">Free Session • No Card Required</p>
                  </div>
                </form>
              )}

              <div className="form-highlights">
                <div className="form-highlight-item">
                  <span className="highlight-icon"><BookIcon /></span>
                  <span>Preview our industry-vetted curriculum</span>
                </div>
                <div className="form-highlight-item">
                  <span className="highlight-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="#26c6da"/>
                    </svg>
                  </span>
                  <span>Live Q&A with an industry expert</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="learner-outcomes">
          <div className="outcomes-container">
            <div className="outcomes-header">
              <h2 className="section-heading outcomes-title">Transform Your Career, Multiply Your Income</h2>
              <p className="outcomes-subtitle">Join 20,000+ professionals who transformed their careers and achieved 3x salary growth. Calculate your future tech salary potential.</p>
            </div>

            <div className="outcomes-dashboard">
              <div className="dashboard-left">
                <div className="potential-calculator">
                  <div className="calculator-header">
                    <h3>Career Growth Calculator</h3>
                    <p>See how much you could earn after upskilling</p>
                  </div>
                  <div className="calculator-content">
                    <div className="current-role">
                      <label>Current Role</label>
                      <select className="role-select" value={selectedRole} onChange={handleRoleChange}>
                        <option value="">Select your current role</option>
                        <option value="Student/Fresher">Student/Fresher</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Business Analyst">Business Analyst</option>
                        <option value="Marketing Executive">Marketing Executive</option>
                        <option value="Sales Representative">Sales Representative</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="experience-level">
                      <label>Experience Level</label>
                      <div className="experience-buttons">
                        <button
                          className={`exp-btn ${selectedExperience === '0-2 Years' ? 'active' : ''}`}
                          onClick={() => handleExperienceChange('0-2 Years')}
                        >
                          0-2 Years
                        </button>
                        <button
                          className={`exp-btn ${selectedExperience === '3-5 Years' ? 'active' : ''}`}
                          onClick={() => handleExperienceChange('3-5 Years')}
                        >
                          3-5 Years
                        </button>
                        <button
                          className={`exp-btn ${selectedExperience === '5+ Years' ? 'active' : ''}`}
                          onClick={() => handleExperienceChange('5+ Years')}
                        >
                          5+ Years
                        </button>
                      </div>
                    </div>
                    <div className="potential-result" key={salaryUpdateKey}>
                      <div className="result-card">
                        <div className="result-header">Your Potential Salary Growth</div>
                        <div className="salary-projection">
                          <div className="current-salary">
                            <span className="label">Current Range</span>
                            <span className="amount">{salaryData.current}</span>
                          </div>
                          <div className="arrow-transform">→</div>
                          <div className="projected-salary">
                            <span className="label">After Program</span>
                            <span className="amount highlight">{salaryData.projected}</span>
                          </div>
                        </div>
                        <div className="growth-indicator">
                          <div className="growth-percentage">{salaryData.growth} Growth Potential</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-right">
                <div className="career-tracks">
                  <h3>Recommended Career Tracks</h3>

                  {careerTracks.map((track, index) => (
                    <div className="track-card" key={index}>
                      <div className="track-icon">
                        {track.icon}
                      </div>
                      <div className="track-info">
                        <h4>{track.title}</h4>
                        <div className="track-details">
                          <span className="salary">{track.salary}</span>
                          <span className="timeline">{track.timeline}</span>
                        </div>
                        <div className="track-skills">
                          {track.skills.map((skill, idx) => (
                            <span key={idx}>{skill}</span>
                          ))}
                        </div>
                      </div>
                      <div className="track-demand">{track.demand}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="success-metrics">
              <div className="metric-box">
                <div className="metric-number">15K+</div>
                <div className="metric-text">Successful Transitions</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">180%</div>
                <div className="metric-text">Avg Salary Increase</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">95%</div>
                <div className="metric-text">Job Placement Rate</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">500+</div>
                <div className="metric-text">Hiring Partners</div>
              </div>
            </div>
          </div>
        </section>

        <section className="download-brochure">
          <div className="brochure-container">
            <div className="brochure-content-wrapper">
              {/* Left Side - Main Content */}
              <div className="brochure-left">
                <div className="brochure-badge">
                  <span className="badge-icon">🎓</span>
                  <span className="badge-text">Free Career Guide</span>
                </div>

                <h2 className="section-heading brochure-headline">
                  Ready to Launch Your AI & Data Science Career?
                </h2>

                <p className="brochure-description">
                  Get instant access to our comprehensive program brochure and discover how you can master in-demand skills, work on real-world projects, and land your dream job in tech.
                </p>

                {/* Key Benefits */}
                <div className="brochure-benefits">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <h4>Industry-Aligned Curriculum</h4>
                      <p>Learn from experts with real-world experience</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <h4>Hands-On Projects Portfolio</h4>
                      <p>Build 12+ projects to showcase your skills</p>
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <h4>100% Job Assistance</h4>
                      <p>Dedicated placement support until you succeed</p>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="trust-indicators">
                  <div className="trust-item">
                    <span className="trust-number">25,000+</span>
                    <span className="trust-label">Alumni Network</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-number">4.8/5</span>
                    <span className="trust-label">Student Rating</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-number">500+</span>
                    <span className="trust-label">Hiring Partners</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Download Card */}
              <div className="brochure-right">
                <div className="download-card">
                  <div className="card-header">
                    <div className="document-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 18H17V16H7V18Z" fill="currentColor"/>
                        <path d="M17 14H7V12H17V14Z" fill="currentColor"/>
                        <path d="M7 10H11V8H7V10Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h3 className="card-title">Download Program Brochure</h3>
                    <p className="card-subtitle">Complete guide with curriculum details, fee structure, and placement statistics</p>
                  </div>

                  <div className="card-body">
                    <div className="brochure-features">
                      <div className="feature-tag">
                        <span className="tag-icon">📋</span>
                        <span>Course Modules</span>
                      </div>
                      <div className="feature-tag">
                        <span className="tag-icon">💼</span>
                        <span>Career Paths</span>
                      </div>
                      <div className="feature-tag">
                        <span className="tag-icon">💰</span>
                        <span>Fee Structure</span>
                      </div>
                      <div className="feature-tag">
                        <span className="tag-icon">🎯</span>
                        <span>Success Stories</span>
                      </div>
                    </div>

                    <button className="download-btn">
                      <span className="btn-text">Download Free Brochure</span>
                      <span className="btn-icon-arrow">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20M12 20L8 16M12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </button>

                    <p className="download-note">
                      <svg className="lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Your information is safe with us. No spam, ever.
                    </p>
                  </div>
                </div>

                {/* Bonus Badge */}
                <div className="bonus-badge">
                  <span className="bonus-icon">🎁</span>
                  <div className="bonus-text">
                    <strong>Free Bonus:</strong> Career Roadmap Guide included!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-courses-section">
          <div className="home-courses-container">
            <div className="home-courses-header">
              <h2 className="section-heading home-courses-title">Find Your Perfect Program</h2>
              <p className="home-courses-subtitle">Explore our range of courses designed for every career stage.</p>
            </div>

            <div className="course-slider-container">
              <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous course">
                ‹
              </button>

              <div className="course-slider-wrapper">
                <div
                  className="course-slider-track"
                  data-current-slide={currentSlide}
                >
                  {courses.map((course, index) => (
                    <CourseCard
                      key={index}
                      variant="slider"
                      course={course}
                      onAction={handleLearnMore}
                      actionText="Learn More"
                    />
                  ))}
                </div>
              </div>

              <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next course">
                ›
              </button>

              <div className="slider-dots">
                {courses.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="alumni-section">
          <div className="alumni-container">
            <div className="alumni-header">
              <h2 className="section-heading alumni-title">Trusted By 20,000+ Alumni Working At Top Companies</h2>
            </div>

            <div className="alumni-logos">
              <div className="logo-row scroll-right">
                <div className="logo-track">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="company-logo-ai" />
                  <img src="data:image/png;base64,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" alt="Capgemini" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="company-logo-ai" />
                  <img src="data:image/png;base64,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" alt="Capgemini" className="company-logo-ai" />
                </div>
              </div>

              <div className="logo-row scroll-left">
                <div className="logo-track">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b1/Tata_Consultancy_Services_Logo.png" alt="TCS" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/1280px-Cognizant_logo_2022.svg.png" alt="Cognizant" className="company-logo-ai" />
                  <img src="https://toppng.com/uploads/preview/hcl-technologies-vector-logo-free-11574106908xagflgb27g.png" alt="HCL Technologies" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Tech_Mahindra_logo.png" alt="Tech Mahindra" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/b1/Tata_Consultancy_Services_Logo.png" alt="TCS" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cognizant_logo_2022.svg/1280px-Cognizant_logo_2022.svg.png" alt="Cognizant" className="company-logo-ai" />
                  <img src="https://toppng.com/uploads/preview/hcl-technologies-vector-logo-free-11574106908xagflgb27g.png" alt="HCL Technologies" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Tech_Mahindra_logo.png" alt="Tech Mahindra" className="company-logo-ai" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="section-heading features-title">The 360DigiTMG Advantage</h2>
              <p className="features-subtitle">Everything You Need to Succeed in One Place</p>
            </div>

            <div className="features-slider-wrapper">
              <button className="slider-nav-btn prev" onClick={prevFeatureSlide} aria-label="Previous feature">
                ‹
              </button>

              <div
                className="features-grid"
              >
              <div className="feature-card">
                <div className="feature-icon"><GraduationCapIcon /></div>
                <h3 className="feature-title">Expert Trainers</h3>
                <p className="feature-description">Learn from industry professionals with 10+ years of experience in Data Science and AI</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><BriefcaseIcon /></div>
                <h3 className="feature-title">100% Job Assistance</h3>
                <p className="feature-description">Dedicated placement support with 15,000+ successful placements across top companies</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><TrophyIcon /></div>
                <h3 className="feature-title">Global Certifications</h3>
                <p className="feature-description">Earn internationally recognized certifications from Microsoft, IBM, and other tech giants</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><LaptopIcon /></div>
                <h3 className="feature-title">Live Interactive Classes</h3>
                <p className="feature-description">Real-time learning with live projects, doubt clearing sessions, and peer collaboration</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><RocketIcon /></div>
                <h3 className="feature-title">Hands-on Projects</h3>
                <p className="feature-description">Build real-world projects and create an impressive portfolio that stands out to employers</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><GlobeIcon /></div>
                <h3 className="feature-title">Flexible Learning</h3>
                <p className="feature-description">Choose from weekday, weekend, or self-paced learning options that fit your schedule</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><BookIcon /></div>
                <h3 className="feature-title">Comprehensive Curriculum</h3>
                <p className="feature-description">Updated syllabus covering latest tools and technologies used by industry leaders</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><HandshakeIcon /></div>
                <h3 className="feature-title">Lifetime Support</h3>
                <p className="feature-description">Get continuous support and access to updated materials even after course completion</p>
              </div>
              </div>

              <button className="slider-nav-btn next" onClick={nextFeatureSlide} aria-label="Next feature">
                ›
              </button>

              <div className="slider-dots">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentFeatureSlide ? 'active' : ''}`}
                    onClick={() => goToFeatureSlide(index)}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="training-centers-section" aria-label="Training Centers">
          <div className="centers-container">
            <div className="centers-header">
              <h2 className="section-heading centers-title">Our Training Centers</h2>
              <p className="centers-subtitle">World-class facilities across India's leading tech hubs with state-of-the-art infrastructure</p>
            </div>

            <div className="centers-slider-wrapper">
              <button className="slider-nav-btn prev" onClick={prevCenterSlide} aria-label="Previous training center">
                ‹
              </button>

              <div
                className="centers-grid"
                role="list"
                onTouchStart={handleCenterTouchStart}
                onTouchMove={handleCenterTouchMove}
                onTouchEnd={handleCenterTouchEnd}
              >
              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.google.com/?q=2-56/2/19, 3rd floor, Vijaya Towers, near Meridian School, Ayyappa Society Rd, Madhapur, Hyderabad, Telangana 500081', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIeF25ILWHaG79wGOxa4W2D_Q_Igq1szMV0Q&s" alt="Durgam Cheruvu Cable Bridge, Hyderabad" />
                  </div>
                  <h3 className="center-city">Hyderabad, Telangana</h3>
                </div>
                <div className="center-content-section">
                  <p className="center-description">Our corporate headquarters and flagship training center equipped with world-class infrastructure and technology.</p>
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>2-56/2/19, 3rd floor, Vijaya Towers, near Meridian School, Ayyappa Society Rd, Madhapur, Hyderabad, Telangana 500081</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:1800212654321">1800-212-654321</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:franchise@360digitmg.com">franchise@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/tC3Rore8xfZS8S4U6', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://images.yourstory.com/cs/wordpress/2016/07/Yourstory-Vidhana-Soudha.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75" alt="Vidhana Soudha, Bangalore" />
                  </div>
                  <h3 className="center-city">Bangalore, Karnataka</h3>
                </div>
                <div className="center-content-section">
                  <p className="center-description">Located in the heart of India's Silicon Valley, our Bangalore center offers cutting-edge data science and AI training programs.</p>
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>No 23, 2nd Floor, 9th Main Rd, 22nd Cross Rd, 7th Sector, HSR Layout, Bangalore - 560102</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919989994319">+91 99899 94319 / 1800-212-654321</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:enquiry@360digitmg.com">enquiry@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/GEor31R9gwVENSmaA', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWA4MwTRzgfOBXVF3RiQH8JgO9sIbcT-ujQ&s" alt="Valluvar Kottam, Chennai" />
                  </div>
                  <h3 className="center-city">Nungambakkam, Chennai</h3>
                </div>
                <div className="center-content-section">
                  <p className="center-description">Our Chennai training center in Nungambakkam provides comprehensive data analytics and business intelligence courses.</p>
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>1st Floor, Santi Ram Centre, Tirumurthy Nagar, Nungambakkam, Opposite to Indian Oil Bhavan, Chennai, Tamil Nadu - 600006</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:1800212654321">1800 212 654321</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:enquiry@360digitmg.com">enquiry@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/KCsfrQdYMvHg9nkC6', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuf5_M-4zkPWtfG7dOx46ZGRxYT72BeueyKg&s" alt="Vitthal-Rukmini Temple, Pune" />
                  </div>
                  <h3 className="center-city">Kharadi,<br/> Pune</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>#705, 7th floor, Global Business Hub, Opp. Eon IT Park, Survey No. 1/1 A, Kharadi, Pune - 411014</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:9850070368">9850070368</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:kharadi.pune@360digitmg.com">kharadi.pune@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/UQa2HFYFcHRaqkSk7', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://www.shutterstock.com/image-photo/bhilai-chhattisgarh-india-oct-26-260nw-600395621.jpg" alt="Maitri Bagh, Bhilai" />
                  </div>
                  <h3 className="center-city">Bhilai, Chhattisgarh</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>No 8 & 9, Sadhana Complex, Maitri Nagar, Risali, Bhilai(CG) - 490006</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919981617903">+91 9981617903 / +91 9886628363</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:bhilai@360digitmg.com">bhilai@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/3WpDihanxE8WDpP88', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAvoZ-XB-PJRC9F0qSQB41Vk4PEajHCwNskoR3Q53qOwiTxIj1OSvByPaV7_etP4TpcAQ&usqp=CAU" alt="Shaniwar Wada, Pune" />
                  </div>
                  <h3 className="center-city">Kothrud,<br/> Pune</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>408, Fourth Floor, Saarrthi Success Square, Near Maharshi Karve Statue, Kothrud, Pune - 411038</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919665066683">+91 9665066683</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:kothrud_pune@360digitmg.com">kothrud_pune@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/ZUAcZMLcJtZDMYfX7', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qVElYdlVqthcAlvlvWx4RguDJcviorCXHg&s" alt="Lingaraja Temple, Bhubaneswar" />
                  </div>
                  <h3 className="center-city">Bhubaneswar, Odisha</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>A23, Driems Villa, Patia, Bhubaneswar - 751024</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919789819082">+91 9789819082</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:odisha@360digitmg.com">odisha@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/DpX7Ho7w4EmeCZWB9', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmLMV3QfF-Y0XbEsVO3Ft6orHoPZM1zjHltg&s" alt="Akshardham Temple, Delhi NCR" />
                  </div>
                  <h3 className="center-city">Noida, Uttar Pradesh</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>2308 Gold, 23rd Floor, Wave One, Sector-18, Noida – 201301</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919205517358">+91 9205517358</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:noida@360digitmg.com">noida@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem" onClick={() => window.open('https://maps.app.goo.gl/d2JKJkVxPcmVBZ6u7', '_blank')} style={{cursor: 'pointer'}}>
                <div className="center-image-section">
                  <div className="center-icon" aria-hidden="true">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXStigI_iv0E0DepMYnppIrOP9Fw4-Pex-SjHgbV4ADQ9L3Q9QEHuTYB8vVNEwBMWXOU&usqp=CAU" alt="Dolphin's Nose, Visakhapatnam" />
                  </div>
                  <h3 className="center-city">Vizag, Andhra Pradesh</h3>
                </div>
                <div className="center-content-section">
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>3rd floor, 30-15-35, above IDBI Bank, near Saraswati Park Road, Daba Gardens, Allipuram, Jct, Visakhapatnam, Andhra Pradesh 530020</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+919640921445">+91 9640921445</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:vizag@360digitmg.com">vizag@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>
              </div>

              <button className="slider-nav-btn next" onClick={nextCenterSlide} aria-label="Next training center">
                ›
              </button>

              <div className="slider-dots">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentCenterSlide ? 'active' : ''}`}
                    onClick={() => goToCenterSlide(index)}
                    aria-label={`Go to training center ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="centers-cta" role="region" aria-label="Online learning option">
              <p>Can't find a center near you? <strong>No problem!</strong> We offer <strong>Live Online Classes</strong> with the same quality, expert trainers, and interactive learning experience from anywhere in India.</p>
              <button
                className="explore-btn"
                onClick={() => navigate("/courses")}
                aria-label="Explore our online programs"
              >
                Explore Online Programs →
              </button>
            </div>
          </div>
        </section>

        <section className="leadership-section">
          <div className="leadership-container">
            <div className="leadership-card-compact">
              <div className="leader-image-side">
                <div className="image-wrapper">
                  <a href="https://www.linkedin.com/in/bharanikumardepuru/" target="_blank" rel="noopener noreferrer">
                    <img src={require('../../assets/images/download.jpg')}
                         alt="Bharani Kumar Depuru"
                         className="leader-photo" />
                  </a>
                </div>
              </div>

              <div className="leader-details">
                <div className="leader-header-compact">
                  <h3>Bharani Kumar Depuru</h3>
                  <p className="leader-position">CEO & Founder, AiSPRY | Founder & Director, 360DigiTMG</p>
                </div>

                <div className="leader-badges">
                  <span className="badge">IIT & ISB Alumni</span>
                  <span className="badge">Visiting Faculty at ISB</span>
                  <span className="badge">20+ Years Industry Experience</span>
                </div>

                <p className="leader-summary">
                  Visionary entrepreneur and Chief Data Scientist with a proven track record of transforming businesses through AI and data science innovation. Former Senior Consultant at Deloitte and leadership roles at HSBC, Infosys, and ITC Infotech. Founded AiSPRY and 360DigiTMG in 2015, empowering thousands of professionals worldwide with cutting-edge AI and data science education.
                </p>

                <div className="expertise-compact">
                  <span>Artificial Intelligence</span>
                  <span>Generative AI</span>
                  <span>Data Science</span>
                  <span>Machine Learning Strategy</span>
                  <span>AI Solutions</span>
                  <span>Global Speaker</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="footer-logo">
                  <img
                    src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
                    alt="AiTutor Logo"
                    className="footer-logo-image"
                  />
                </div>
                <p className="footer-description">
                  Transform your career with industry-leading data science and technology programs.
                  Join thousands of successful alumni working at top companies worldwide.
                </p>
                <div className="social-links">
                  <a href="https://www.facebook.com/360digitmg" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                  <a href="https://twitter.com/360digitmg" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                    <TwitterIcon />
                  </a>
                  <a href="https://www.linkedin.com/company/360digitmg" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                  <a href="https://www.instagram.com/360digitmg" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="https://www.youtube.com/c/360DigiTMG" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                </div>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Programs</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Data Science</a></li>
                  <li><a href="#" className="footer-link">Machine Learning</a></li>
                  <li><a href="#" className="footer-link">AI & Deep Learning</a></li>
                  <li><a href="#" className="footer-link">Business Analytics</a></li>
                  <li><a href="#" className="footer-link">Python Programming</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Company</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">About Us</a></li>
                  <li><a href="#" className="footer-link">Our Team</a></li>
                  <li><a href="#" className="footer-link">Careers</a></li>
                  <li><a href="#" className="footer-link">Success Stories</a></li>
                  <li><a href="#" className="footer-link">Contact</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Support</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Student Portal</a></li>
                  <li><a href="#" className="footer-link">Course Materials</a></li>
                  <li><a href="#" className="footer-link">Technical Support</a></li>
                  <li><a href="#" className="footer-link">Community</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Contact Info</h3>
                <div className="contact-info">
                  <p className="contact-item"><strong>Corporate Location</strong></p>
                  <p className="contact-item">2-56/2/19, 3rd floor, Vijaya Towers, near Meridian School, Ayyappa Society Rd, Madhapur, Hyderabad, Telangana 500081</p>

                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Phone</strong></p>
                  <p className="contact-item"> 1800-212-654321</p>

                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Email :</strong>
                  <a href="mailto:enquiry@360digitmg.com">enquiry@360digitmg.com</a></p>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <p className="copyright">
                  © 2024 360DigiTMG. All rights reserved.
                </p>
                <div className="footer-bottom-links">
                  <a href="#" className="bottom-link">Privacy Policy</a>
                  <a href="#" className="bottom-link">Terms of Service</a>
                  <a href="#" className="bottom-link">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
};

export default Home;