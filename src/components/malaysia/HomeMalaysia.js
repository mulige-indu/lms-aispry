import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollingNavbar from './ScrollingNavbar';
import MainNavbar from './MainNavbar';
import CourseCard from '../Browse Courses/CourseCard';
import './home-courses.css';
import '../Browse Courses/CourseSlider.css';
import './leadership-section.css';
import './TrainingCenters.css';
import './AlumniSectionMalaysia.css';
import './main-content.css';
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

const HomeMalaysia = () => {
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [expandedCenter, setExpandedCenter] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Touch gesture states
  const [featureTouchStart, setFeatureTouchStart] = useState(0);
  const [featureTouchEnd, setFeatureTouchEnd] = useState(0);

  // Career calculator states
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('0-2 Years');
  const [salaryData, setSalaryData] = useState({
    current: 'RM3-5 K/year',
    projected: 'RM8-12 K/year',
    growth: '+180%'
  });
  const [careerTracks, setCareerTracks] = useState([
    {
      icon: <DataScienceIcon />,
      title: 'Data Analyst',
      salary: 'RM4-8 K/year',
      timeline: '3-4 Months',
      skills: ['Python', 'SQL', 'Tableau'],
      demand: 'High Demand'
    },
    {
      icon: <AIIcon />,
      title: 'Data Scientist',
      salary: 'RM8-15 K/year',
      timeline: '6-8 Months',
      skills: ['Machine Learning', 'Python', 'Statistics'],
      demand: 'Very High'
    },
    {
      icon: <CloudIcon />,
      title: 'ML Engineer',
      salary: 'RM12-25 K/year',
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

  // Scroll-based expansion for training centers
  useEffect(() => {
    const cards = document.querySelectorAll('.training-centers-section .center-card');
    const section = document.querySelector('.training-centers-section');
    const centersGrid = document.querySelector('.centers-grid');
    if (cards.length === 0 || !section || !centersGrid) return;

    // Check if we're in mobile/tablet view (below 1024px)
    const isSmallScreen = window.innerWidth < 1024;

    if (!isSmallScreen) {
      // On desktop, remove all active classes
      cards.forEach((card) => {
        card.classList.remove('active');
      });
      return;
    }

    let sectionHasBeenViewed = false;

    // Observer for the section itself
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !sectionHasBeenViewed) {
          // Section is in view for the first time
          sectionHasBeenViewed = true;

          // Activate first card
          if (cards[0]) {
            cards[0].classList.add('active');
          }

          // Scroll first card to center after a short delay
          setTimeout(() => {
            if (cards[0]) {
              const firstCard = cards[0];
              const gridRect = centersGrid.getBoundingClientRect();
              const cardRect = firstCard.getBoundingClientRect();
              const centerOffset = (gridRect.width / 2) - (cardRect.width / 2);
              const scrollLeft = firstCard.offsetLeft - centerOffset;

              centersGrid.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    sectionObserver.observe(section);

    // Scroll event handler for horizontal card scrolling
    let scrollTimeout;
    const handleCardScroll = () => {
      // Clear previous timeout to debounce
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const gridRect = centersGrid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;

        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(centerX - cardCenterX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        });

        if (closestCard) {
          const currentActive = document.querySelector('.center-card.active');
          if (currentActive !== closestCard) {
            cards.forEach((card) => card.classList.remove('active'));
            closestCard.classList.add('active');
          }
        }
      }, 50); // Debounce for 50ms
    };

    // Add scroll listener
    centersGrid.addEventListener('scroll', handleCardScroll);

    // Also trigger on scroll end for more accurate detection
    centersGrid.addEventListener('scrollend', handleCardScroll);

    // Initial call to set the first card
    handleCardScroll();

    // Cleanup
    return () => {
      sectionObserver.unobserve(section);
      centersGrid.removeEventListener('scroll', handleCardScroll);
      centersGrid.removeEventListener('scrollend', handleCardScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

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
        '0-2 Years': { current: 'RM2.5-4 K/year', projected: 'RM6-9 K/year', growth: '+140%' },
        '3-5 Years': { current: 'RM4-6 K/year', projected: 'RM9-14 K/year', growth: '+133%' },
        '5+ Years': { current: 'RM6-9 K/year', projected: 'RM14-20 K/year', growth: '+140%' }
      },
      'Software Developer': {
        '0-2 Years': { current: 'RM4-7 K/year', projected: 'RM8-12 K/year', growth: '+80%' },
        '3-5 Years': { current: 'RM7-12 K/year', projected: 'RM15-22 K/year', growth: '+100%' },
        '5+ Years': { current: 'RM12-18 K/year', projected: 'RM20-30 K/year', growth: '+75%' }
      },
      'Business Analyst': {
        '0-2 Years': { current: 'RM3.5-6 K/year', projected: 'RM7-11 K/year', growth: '+90%' },
        '3-5 Years': { current: 'RM6-10 K/year', projected: 'RM12-18 K/year', growth: '+85%' },
        '5+ Years': { current: 'RM10-15 K/year', projected: 'RM18-25 K/year', growth: '+75%' }
      },
      'Marketing Executive': {
        '0-2 Years': { current: 'RM3-5 K/year', projected: 'RM8-12 K/year', growth: '+150%' },
        '3-5 Years': { current: 'RM5-8 K/year', projected: 'RM12-18 K/year', growth: '+133%' },
        '5+ Years': { current: 'RM8-12 K/year', projected: 'RM16-24 K/year', growth: '+110%' }
      },
      'Sales Representative': {
        '0-2 Years': { current: 'RM2.5-5 K/year', projected: 'RM8-13 K/year', growth: '+160%' },
        '3-5 Years': { current: 'RM5-9 K/year', projected: 'RM13-20 K/year', growth: '+133%' },
        '5+ Years': { current: 'RM9-14 K/year', projected: 'RM18-28 K/year', growth: '+110%' }
      },
      'Teacher': {
        '0-2 Years': { current: 'RM2.5-4 K/year', projected: 'RM7-11 K/year', growth: '+170%' },
        '3-5 Years': { current: 'RM4-6 K/year', projected: 'RM11-16 K/year', growth: '+150%' },
        '5+ Years': { current: 'RM6-9 K/year', projected: 'RM16-22 K/year', growth: '+140%' }
      },
      'Other': {
        '0-2 Years': { current: 'RM3-5 K/year', projected: 'RM8-12 K/year', growth: '+150%' },
        '3-5 Years': { current: 'RM5-9 K/year', projected: 'RM12-18 K/year', growth: '+120%' },
        '5+ Years': { current: 'RM9-14 K/year', projected: 'RM18-26 K/year', growth: '+100%' }
      }
    };

    // Career track recommendations based on role and experience
    const careerTrackMatrix = {
      'Student/Fresher': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: 'RM4-8 K/year',
          timeline: '3-4 Months',
          skills: ['Excel', 'SQL', 'Power BI'],
          demand: 'High Demand'
        },
        {
          icon: <PythonIcon />,
          title: 'Python Developer',
          salary: 'RM5-10 K/year',
          timeline: '4-5 Months',
          skills: ['Python', 'Django', 'APIs'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: 'RM6-11 K/year',
          timeline: '3-4 Months',
          skills: ['Analytics', 'SQL', 'Tableau'],
          demand: 'High Demand'
        }
      ],
      'Software Developer': [
        {
          icon: <AIIcon />,
          title: 'Data Scientist',
          salary: 'RM10-18 K/year',
          timeline: '5-6 Months',
          skills: ['ML', 'Python', 'Statistics'],
          demand: 'Very High'
        },
        {
          icon: <CloudIcon />,
          title: 'ML Engineer',
          salary: 'RM15-28 K/year',
          timeline: '6-8 Months',
          skills: ['Deep Learning', 'TensorFlow', 'Cloud'],
          demand: 'Extreme'
        },
        {
          icon: <AIIcon />,
          title: 'AI Engineer',
          salary: 'RM18-35 K/year',
          timeline: '8-10 Months',
          skills: ['NLP', 'Computer Vision', 'LLMs'],
          demand: 'Extreme'
        }
      ],
      'Business Analyst': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: 'RM6-12 K/year',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Tableau'],
          demand: 'High Demand'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Intelligence Analyst',
          salary: 'RM8-15 K/year',
          timeline: '4-5 Months',
          skills: ['Power BI', 'SQL', 'Data Modeling'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Analytics Manager',
          salary: 'RM12-22 K/year',
          timeline: '5-6 Months',
          skills: ['Strategy', 'ML', 'Leadership'],
          demand: 'High Demand'
        }
      ],
      'Marketing Executive': [
        {
          icon: <DataScienceIcon />,
          title: 'Marketing Data Analyst',
          salary: 'RM6-12 K/year',
          timeline: '3-4 Months',
          skills: ['Analytics', 'SQL', 'Google Analytics'],
          demand: 'High Demand'
        },
        {
          icon: <RocketIcon />,
          title: 'Growth Analyst',
          salary: 'RM8-16 K/year',
          timeline: '4-5 Months',
          skills: ['Python', 'A/B Testing', 'SQL'],
          demand: 'Very High'
        },
        {
          icon: <AIIcon />,
          title: 'Marketing Science Analyst',
          salary: 'RM12-20 K/year',
          timeline: '5-6 Months',
          skills: ['ML', 'Statistics', 'Marketing'],
          demand: 'Very High'
        }
      ],
      'Sales Representative': [
        {
          icon: <DataScienceIcon />,
          title: 'Sales Data Analyst',
          salary: 'RM6-13 K/year',
          timeline: '3-4 Months',
          skills: ['Excel', 'SQL', 'Salesforce'],
          demand: 'High Demand'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: 'RM8-16 K/year',
          timeline: '4-5 Months',
          skills: ['Analytics', 'CRM', 'Forecasting'],
          demand: 'Very High'
        },
        {
          icon: <DataScienceIcon />,
          title: 'Sales Intelligence Analyst',
          salary: 'RM12-22 K/year',
          timeline: '5-6 Months',
          skills: ['ML', 'Predictive Analytics', 'Python'],
          demand: 'Very High'
        }
      ],
      'Teacher': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: 'RM5-10 K/year',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Visualization'],
          demand: 'High Demand'
        },
        {
          icon: <AIIcon />,
          title: 'EdTech Data Scientist',
          salary: 'RM8-15 K/year',
          timeline: '5-6 Months',
          skills: ['ML', 'Learning Analytics', 'Python'],
          demand: 'Very High'
        },
        {
          icon: <BookIcon />,
          title: 'Technical Content Creator',
          salary: 'RM6-12 K/year',
          timeline: '3-4 Months',
          skills: ['Programming', 'Teaching', 'Content'],
          demand: 'High Demand'
        }
      ],
      'Other': [
        {
          icon: <DataScienceIcon />,
          title: 'Data Analyst',
          salary: 'RM5-10 K/year',
          timeline: '3-4 Months',
          skills: ['Python', 'SQL', 'Excel'],
          demand: 'High Demand'
        },
        {
          icon: <AIIcon />,
          title: 'Data Scientist',
          salary: 'RM10-18 K/year',
          timeline: '6-8 Months',
          skills: ['ML', 'Statistics', 'Python'],
          demand: 'Very High'
        },
        {
          icon: <BusinessIcon />,
          title: 'Business Analyst',
          salary: 'RM7-13 K/year',
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


  // Handle center card click - expand on first click
  const handleCenterCardClick = (e, locationUrl) => {
    const card = e.currentTarget;
    const isExpanded = card.classList.contains('expanded');

    if (!isExpanded) {
      // Not expanded - expand the card
      const cards = document.querySelectorAll('.center-card');
      cards.forEach((c) => c.classList.remove('expanded'));
      card.classList.add('expanded');
    } else {
      // Already expanded - navigate to location
      window.open(locationUrl, '_blank');
    }
  };

  // Handle center image section click - always expand the card
  const handleImageSectionClick = (e) => {
    e.stopPropagation();

    const card = e.currentTarget.closest('.center-card');
    if (card) {
      const cards = document.querySelectorAll('.center-card');
      cards.forEach((c) => c.classList.remove('expanded'));
      card.classList.add('expanded');
    }
  };

  // Handle center image click - only expand the card, never navigate
  const handleCenterImageClick = (e, centerIndex, locationUrl) => {
    e.stopPropagation();

    const card = e.currentTarget.closest('.center-card');

    // Always just expand the card, never navigate
    if (card) {
      const cards = document.querySelectorAll('.center-card');
      cards.forEach((c) => c.classList.remove('expanded'));
      card.classList.add('expanded');
    }
  };

  // Handle center city click - always navigate to location immediately
  const handleCenterCityClick = (e, locationUrl) => {
    e.stopPropagation();
    // Always navigate directly to location
    window.open(locationUrl, '_blank');
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
              <h2 className="section-heading alumni-title">Our Alumni Success Stories</h2>
            </div>

            <div className="testimonial-3d-slider">
              <button className="slider-3d-nav prev" onClick={() => setActiveTestimonial(prev => prev === 0 ? 11 : prev - 1)} aria-label="Previous">‹</button>

              <div className="slider-3d-container">
                <div className="slider-3d-track">
                  {[
                    { name: "Yi Xian", role: "Data Scientist", img: "https://360digitmg.com/uploads/success_stories/imaage-11.png", linkedin: "https://www.youtube.com/live/pSUKRbhl4I4", text: "I still remember going through websites for the Data Scientist course and reading reviews. That's when I finally found 360DigiTMG. Today, I will consider 360DigiTMG as the best one because it has offered me way more than any other training institute can do: Incredible curriculum, instructors, mentorship, and most job search skills and interviews best practices. I strongly recommend the Data Science program at 360DigiTMG to anyone looking for a Data Scientist/Analyst role." },
                    { name: "Ben Balachandran", role: "Power BI Analyst, Emirates Dubai", img: "https://360digitmg.com/uploads/success_stories/Blocks-2-05.png", linkedin: "https://www.youtube.com/watch?v=HYZ7DdrtRwQ", text: "When I decided to transition from a 13-year career as a flight attendant to data science during the COVID-19 pandemic, 360DigiTMG became my turning point. Their curriculum focused on Python and R, laid the foundation I needed. The mentorship and practical experience were invaluable. I'm now proud to have successfully transitioned into the data science field. I highly recommend 360DigiTMG to anyone looking to make a similar career shift." },
                    { name: "Nikhil Miriyala", role: "Senior Data Scientist, HCL Technologies", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images/Nikhil%20Miriyala-02.png", linkedin: "https://www.linkedin.com/in/miryala-nikhil/", text: "The practical training and hands-on projects at 360DigiTMG made complex concepts easy to grasp. Mentor support and placement assistance enhanced my learning, setting me up for a successful data science career." },
                    { name: "Sowjanya V", role: "Senior Data Scientist, Capgemini", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images/Sowji-02.png", linkedin: "https://www.linkedin.com/in/sowjanya-v-47b3801a1/", text: "The training at 360DigiTMG simplified complex topics, and the mentors were supportive. Hands-on projects gave real-world experience, boosting my confidence. Placement assistance helped me land a job. A great journey!" },
                    { name: "Prakruthi", role: "Data Scientist, NVIDIA", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images3/Prakruthi-02.png", linkedin: "https://www.linkedin.com/in/prakruthi-b-gowda-b3aaa9160/", text: "Learning was impactful with practical training at 360DigiTMG. Mentors provided great support, and hands-on projects simplified complex topics. Placement assistance was invaluable in my job search. Exactly what I needed!" },
                    { name: "Kiran Kumar", role: "Data Scientist, EY", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images4/Kiran%20Kumar-02.png", linkedin: "https://www.linkedin.com/in/kiran-inumula-6545i/", text: "The course was practical and useful. Trainers explained things clearly, and projects helped me learn more. Mentors supported me and made sure I was ready for my career." },
                    { name: "Meghal Aggarwal", role: "Junior Data Scientist, Deloitte", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images4/Meghal%20agarwal-3-02%20(1).png", linkedin: "https://www.linkedin.com/in/meghalagarwal/", text: "From day one, mentors made difficult concepts manageable. Real-life projects mirrored industry challenges, and interactive sessions kept me engaged. This training provided the knowledge and confidence for new roles." },
                    { name: "Abduljameel Shaik", role: "Data Scientist, PwC", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images5/abduljameel-02.png", linkedin: "https://www.linkedin.com/in/abduljameelshaik/", text: "The learning environment fostered questions and understanding. Real-world projects made theories come alive. I gained confidence with every session. This experience was invaluable for my career growth." },
                    { name: "Sam Christy", role: "Graduate Data Analyst, Amazon", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images5/Sam%20Christy-02%20(1).png", linkedin: "https://www.linkedin.com/in/sam-christy-b871b4209/", text: "The course was clear and practical. Group projects and mentor help made learning fun. The hands-on approach helped me understand better and prepared me for future challenges." },
                    { name: "Surya J", role: "Data Science Engineer, Walmart", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images4/Surya-02.png", linkedin: "https://www.linkedin.com/in/surya-j-503612187/", text: "The course focused on practical skills. Mentors made learning easy, and hands-on projects built my confidence. Placement support helped me find a job. It prepared me well for the future." },
                    { name: "Hemanth YK", role: "Senior Consultant, Capgemini", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images5/Hemanth-2-02.png", linkedin: "https://www.linkedin.com/in/hemanth-y-k-016yk/", text: "Real-life examples in lessons helped me connect the dots. Collaborative projects deepened my skills. Whenever challenges arose, mentors were always there. I now feel ready for industry-specific problems." },
                    { name: "Momin", role: "Assistant Manager - Data Science & IT, Volvo", img: "https://360digit.b-cdn.net/assets/admin/ckfinder/userfiles/images/success-story-student-images5/Momin%20Patel-02.png", linkedin: "https://www.linkedin.com/in/momin-patel-085a7a141/", text: "Trainers made complex topics approachable, and real-world projects enhanced my understanding. The focus on individual growth and self-paced learning had a lasting impact, providing skills that will stay with me forever." }
                  ].map((testimonial, index) => {
                    let position = index - activeTestimonial;
                    if (position < -6) position += 12;
                    if (position > 6) position -= 12;

                    return (
                      <div
                        key={index}
                        className={`card-3d ${position === 0 ? 'active' : ''} ${position === -1 ? 'prev-card' : ''} ${position === 1 ? 'next-card' : ''} ${Math.abs(position) > 1 ? 'hidden-card' : ''}`}
                        onClick={() => setActiveTestimonial(index)}
                      >
                        <div className="card-3d-inner">
                          <div className="card-3d-image">
                            <img alt={testimonial.name} src={testimonial.img} />
                            <a href={testimonial.linkedin} rel="nofollow" target="_blank" className="card-linkedin">
                              <img alt="LinkedIn" src="https://360digit.b-cdn.net/assets/img/template4/images and icon-10.png" />
                            </a>
                          </div>
                          <div className="card-3d-content">
                            <p className="card-3d-text">"{testimonial.text}"</p>
                            <h5 className="card-3d-name">{testimonial.name}</h5>
                            <h6 className="card-3d-role">{testimonial.role}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button className="slider-3d-nav next" onClick={() => setActiveTestimonial(prev => prev === 11 ? 0 : prev + 1)} aria-label="Next">›</button>

              <div className="slider-3d-dots">
                {[...Array(12)].map((_, index) => (
                  <button key={index} className={`dot-3d ${index === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(index)} aria-label={`Go to slide ${index + 1}`}></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prestigious Corporate Connections Section - Malaysia */}
        <section className="corporate-section">
          <div className="container">
            <h2 className="corporate-heading" style={{textAlign: 'center', marginBottom: '30px'}}>Companies That Trust Us</h2>
            <div className="prestco-slider-wrapper">
              <div className="prestco-slider">
                <div className="prestco-box">
                  <div className="media">
                    <div className="prest-c" style={{borderRadius: '0', width: '90px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <img alt="Herbalife" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/herbalife.png" style={{width: '100%', height: 'auto', objectFit: 'contain'}} />
                    </div>
                    <div className="media-body">
                      <h5>Ong Peik Chen</h5>
                      <h6>Director, Herbalife</h6>
                      <p>I had the privilege of collaborating with Lavanya and her team in 2023. Their professionalism and attentive approach to our specific requirements were commendable. I am sincerely grateful for their flexibility in tailoring the content for our 20+ participants. The virtual training delivered was exceptional, and the trainers' teaching style resonated well with participants, earning widespread appreciation.</p>
                    </div>
                  </div>
                </div>
                <div className="prestco-box">
                  <div className="media">
                    <div className="prest-c" style={{borderRadius: '8px'}}>
                      <img alt="USIM" className="img-responsive" src="https://logo.clearbit.com/usim.edu.my" style={{width: '100%', height: '100%', objectFit: 'contain', background: '#fff', padding: '10px', borderRadius: '8px'}} />
                    </div>
                    <div className="media-body">
                      <h5>Dr. Mazlynda Md Yusuf</h5>
                      <h6>Assoc. Prof. Universiti Sains Islam Malaysia (USIM)</h6>
                      <p>First of all, thank you for arranging such a successful and worthy training program for our students at USIM. We are grateful that the program runs smoothly and that the students enjoyed and have gained valuable knowledge and analytical skills in Data Science using Python and R. The students were very impressed and satisfied with the whole programme.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="anprelogs desktop-view">
              {/* Row 1 - Scrolls Left */}
              <div className="logo-row scroll-left">
                <div className="logo-track">
                  <div className="anprlog"><img alt="Maybank" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-maybank.png" /></div>
                  <div className="anprlog"><img alt="RHB" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-rhb.png" /></div>
                  <div className="anprlog"><img alt="Bank of America" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-bankamerica.png" /></div>
                  <div className="anprlog"><img alt="Malaysia" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-malaysia.png" /></div>
                  <div className="anprlog"><img alt="UNIMAS" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-unimas.png" /></div>
                  <div className="anprlog"><img alt="Affin" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-affin.png" /></div>
                  {/* Duplicate for seamless loop */}
                  <div className="anprlog"><img alt="Maybank" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-maybank.png" /></div>
                  <div className="anprlog"><img alt="RHB" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-rhb.png" /></div>
                  <div className="anprlog"><img alt="Bank of America" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-bankamerica.png" /></div>
                  <div className="anprlog"><img alt="Malaysia" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-malaysia.png" /></div>
                  <div className="anprlog"><img alt="UNIMAS" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-unimas.png" /></div>
                  <div className="anprlog"><img alt="Affin" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-affin.png" /></div>
                </div>
              </div>
              {/* Row 2 - Scrolls Right */}
              <div className="logo-row scroll-right">
                <div className="logo-track">
                  <div className="anprlog"><img alt="Korean" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-ksrean.png" /></div>
                  <div className="anprlog"><img alt="Medtronic" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-medtr.png" /></div>
                  <div className="anprlog"><img alt="Hong Leong" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-hong.png" /></div>
                  <div className="anprlog"><img alt="LTI" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-lti.png" /></div>
                  <div className="anprlog"><img alt="Mindtree" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-mindt.png" /></div>
                  <div className="anprlog"><img alt="Air Asia" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-air.png" /></div>
                  {/* Duplicate for seamless loop */}
                  <div className="anprlog"><img alt="Korean" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-ksrean.png" /></div>
                  <div className="anprlog"><img alt="Medtronic" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-medtr.png" /></div>
                  <div className="anprlog"><img alt="Hong Leong" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-hong.png" /></div>
                  <div className="anprlog"><img alt="LTI" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-lti.png" /></div>
                  <div className="anprlog"><img alt="Mindtree" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-mindt.png" /></div>
                  <div className="anprlog"><img alt="Air Asia" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/pre-air.png" /></div>
                </div>
              </div>
            </div>

            <div className="mobile-view">
              <img alt="Corporate Partners" className="img-responsive" src="https://360digit.b-cdn.net/assets/img/new-design/anprgolgd.png" />
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
              <p className="centers-subtitle">World-class facilities in Malaysia with state-of-the-art infrastructure</p>
            </div>

            <div className="centers-slider-wrapper">
              <div
                className="centers-grid single-center"
                role="list"
              >
              <article className="center-card" role="listitem" onClick={(e) => handleCenterCardClick(e, 'https://maps.app.goo.gl/L52KHDjYAbxBYRYAA')}>
                <div className="center-image-section" onClick={handleImageSectionClick}>

                  <div className="center-icon" aria-hidden="true" onClick={(e) => handleCenterImageClick(e, 0, 'https://maps.app.goo.gl/L52KHDjYAbxBYRYAA')} style={{cursor: 'pointer'}}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ue2YDFaVWlq3AXtsrejRW2HrrsqcSBCQZA&s" alt="Petronas Towers, Kuala Lumpur" />
                  </div>
                  <h3 className="center-city" onClick={(e) => handleCenterCityClick(e, 'https://maps.google.com/?q=Level+16,+1+Sentral,+Jalan+Stesen+Sentral+5,+KL+Sentral,+Kuala+Lumpur,+Malaysia')}>Kuala Lumpur, Malaysia</h3>
                </div>
                <div className="center-content-section">
                  <p className="center-description">360DigiTMG SDN BHD (1265527-M) - Our Malaysia headquarters offering world-class data science and AI training programs.</p>
                  <div className="center-details">
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                      <span>Level 16, 1 Sentral, Jalan Stesen Sentral 5, KL Sentral, Kuala Lumpur, Malaysia</span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                      <span><a href="tel:+60193831378">+60 19-383 1378</a></span>
                    </div>
                    <div className="detail-item">
                      <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                      <span><a href="mailto:info@360digitmg.com">info@360digitmg.com</a></span>
                    </div>
                  </div>
                </div>
              </article>
              </div>
            </div>

            <div className="centers-cta" role="region" aria-label="Online learning option">
              <p>Can't find a center near you? <strong>No problem!</strong> We offer <strong>Live Online Classes</strong> with the same quality, expert trainers, and interactive learning experience from anywhere in Malaysia.</p>
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
                  <p className="contact-item">360DigiTMG SDN BHD (1265527-M)<br/>Level 16, 1 Sentral, Jalan Stesen Sentral 5, KL Sentral, Kuala Lumpur, Malaysia</p>

                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Phone</strong></p>
                  <p className="contact-item"><a href="tel:+60193831378">+60 19-383 1378</a></p>

                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Email :</strong>
                  <a href="mailto:info@360digitmg.com">info@360digitmg.com</a></p>
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

export default HomeMalaysia;