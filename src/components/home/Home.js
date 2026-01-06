import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollingNavbar from './ScrollingNavbar';
import MainNavbar from './MainNavbar';
import CourseCard from './CourseCard';
import './home-courses.css';
import './leadership-section.css';
import './TrainingCenters.css';
import './AlumniSection.css';
import './main-content.css';

// ============================================
// SVG ICONS
// ============================================
const Icons = {
  DataScience: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#000000"/>
      <circle cx="17" cy="17" r="1.5" fill="#333333"/>
      <circle cx="14" cy="14" r="1" fill="#333333"/>
      <circle cx="10" cy="11" r="1" fill="#333333"/>
    </svg>
  ),
  AI: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#000000"/>
      <circle cx="8.5" cy="10.5" r="1.5" fill="#333333"/>
      <circle cx="15.5" cy="10.5" r="1.5" fill="#333333"/>
      <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#333333"/>
      <path d="M11 6h2v4h-2z" fill="#666666"/>
    </svg>
  ),
  Business: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v5c0 .75.4 1.38 1 1.73V19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-3.28c.59-.35 1-.99 1-1.72V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zM4 9h16v5h-5v-2H9v2H4V9zm9 6h-2v-2h2v2zm6 4H5v-3h4v2h6v-2h4v3z" fill="#000000"/>
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M12 2.5s4.5 2.04 4.5 5.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7 0-3.46 4.5-5.5 4.5-5.5zM5.5 11c0-2.09 1.09-4.09 2.5-5.39v2.73c-1.06.99-1.81 2.33-2.05 3.66H5.5zm13 0h-.45c-.24-1.33-.99-2.67-2.05-3.66V5.61c1.41 1.3 2.5 3.3 2.5 5.39zM12 21.5l-3-5h6l-3 5z" fill="#000000"/>
      <circle cx="12" cy="9" r="1.5" fill="#333333"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill="#7e57c2"/>
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="#fdd835"/>
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" width="48" height="48">
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="#5c6bc0"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
    </svg>
  ),
  Instagram: () => (
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
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Document: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M7 18H17V16H7V18Z" fill="currentColor"/>
      <path d="M17 14H7V12H17V14Z" fill="currentColor"/>
      <path d="M7 10H11V8H7V10Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor"/>
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4V20M12 20L8 16M12 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// ============================================
// DATA ARRAYS
// ============================================
const COURSES_DATA = [
  {
    icon: <Icons.Business />,
    name: 'Applied Business Analytics (AI-Enabled)',
    features: ['AI-Powered', 'Business Outcomes', 'Decision Support'],
    image: require('../../assets/images/business-analytics.jpg')
  },
  {
    icon: <Icons.AI />,
    name: 'Applied GenAI & Agentic AI (AGAI)',
    features: ['GenAI Systems', 'Agentic Workflows', 'Automation'],
    image: require('../../assets/images/genai-agentic-ai.jpg')
  },
  {
    icon: <Icons.DataScience />,
    name: 'Applied Data Science & AI (AI-Enabled)',
    features: ['Applied AI', 'Problem Solving', 'AI Solutions'],
    image: require('../../assets/images/data-science-ai.jpg')
  },
  {
    icon: <Icons.Rocket />,
    name: 'AI @ Work: Productivity & Automation',
    features: ['Entry-Level', 'Productivity', 'AI Adoption'],
    image: require('../../assets/images/productivity-automation.jpg')
  }
];

const WORKSPACE_TILES = [
  { icon: '📘', title: 'Continue Your Courses', description: 'Pick up where you left off — lessons, recordings, and activities are saved automatically.' },
  { icon: '📊', title: 'Track Your Progress', description: 'View completion status, upcoming tasks, and certificates in one dashboard.' },
  { icon: '🧩', title: 'Practice & Submit', description: 'Access assignments, quizzes, projects, and feedback for each module.' },
  { icon: '🤝', title: 'Get Learning Support', description: 'Raise tickets, check announcements, and stay connected with your program team.' }
];

const SUCCESS_METRICS = [
  { number: '50K+', text: 'Active Learners' },
  { number: '50+', text: 'Programs Delivered' },
  { number: '100+', text: 'Enterprise Engagements' },
  { number: '25K+', text: 'Learning Completion Records' }
];

const BROCHURE_BENEFITS = [
  { title: 'Industry-Aligned Curriculum', description: 'Learn from experts with real-world experience' },
  { title: 'Hands-On Projects Portfolio', description: 'Build 12+ projects to showcase your skills' },
  { title: '100% Job Assistance', description: 'Dedicated placement support until you succeed' }
];

const TRUST_INDICATORS = [
  { number: '25,000+', label: 'Alumni Network' },
  { number: '4.8/5', label: 'Student Rating' },
  { number: '500+', label: 'Hiring Partners' }
];

const BROCHURE_FEATURES = [
  { icon: '📋', text: 'Course Modules' },
  { icon: '💼', text: 'Career Paths' },
  { icon: '💰', text: 'Fee Structure' },
  { icon: '🎯', text: 'Success Stories' }
];

const TESTIMONIALS = [
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
];

const CORPORATE_LOGOS_ROW1 = [
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-kpmg.png", alt: "KPMG" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-deloitte.png", alt: "Deloitte" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-ey.png", alt: "EY" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-pwc.png", alt: "PWC" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-google.png", alt: "Google" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumni-amazon.png", alt: "Amazon" }
];

const CORPORATE_LOGOS_ROW2 = [
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-meta.png", alt: "Meta" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-walmart.png", alt: "Walmart" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-capgemini.png", alt: "Capgemini" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-accenture.png", alt: "Accenture" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-infosys.png", alt: "Infosys" },
  { src: "https://360digit.b-cdn.net/assets/img/new-design/alumn-wipro.png", alt: "Wipro" }
];

const FEATURE_CARDS = [
  { icon: <Icons.Book />, title: 'Industry-Guided Learning Design', description: 'Programs structured by domain experts for real-world applicability.' },
  { icon: <Icons.Trophy />, title: 'Assessments & Progress Tracking', description: 'Track learning milestones, completion status, and outcomes.' },
  { icon: <Icons.GraduationCap />, title: 'Recognised Credentials & Records', description: 'Digital certifications and learning records for internal and external use.' }
];

const TRAINING_CENTERS = [
  {
    city: 'Hyderabad, Telangana',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIeF25ILWHaG79wGOxa4W2D_Q_Igq1szMV0Q&s',
    imageAlt: 'Durgam Cheruvu Cable Bridge, Hyderabad',
    description: 'Our corporate headquarters and flagship training center equipped with world-class infrastructure and technology.',
    address: 'Flat No.201, Third floor, Plot no. 26, D.No.1-89/C/1, Manu Abode Silpee Enclave, Vittal Rao Nagar Rd, Vittal Rao Nagar, Madhapur, Hyderabad, Telangana 500081',
    phone: '1800-212-654321',
    email: 'franchise@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/AjezveDFZuAjzEXw9'
  },
  {
    city: 'Bangalore, Karnataka',
    image: 'https://images.yourstory.com/cs/wordpress/2016/07/Yourstory-Vidhana-Soudha.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75',
    imageAlt: 'Vidhana Soudha, Bangalore',
    description: 'Located in the heart of India\'s Silicon Valley, our Bangalore center offers cutting-edge data science and AI training programs.',
    address: 'No 23, 2nd Floor, 9th Main Rd, 22nd Cross Rd, 7th Sector, HSR Layout, Bangalore - 560102',
    phone: '+91 99899 94319 / 1800-212-654321',
    email: 'enquiry@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/tC3Rore8xfZS8S4U6'
  },
  {
    city: 'Nungambakkam, Chennai',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWA4MwTRzgfOBXVF3RiQH8JgO9sIbcT-ujQ&s',
    imageAlt: 'Valluvar Kottam, Chennai',
    description: 'Our Chennai training center in Nungambakkam provides comprehensive data analytics and business intelligence courses.',
    address: '1st Floor, Santi Ram Centre, Tirumurthy Nagar, Nungambakkam, Opposite to Indian Oil Bhavan, Chennai, Tamil Nadu - 600006',
    phone: '1800 212 654321',
    email: 'enquiry@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/GEor31R9gwVENSmaA'
  },
  {
    city: 'Kharadi, Pune',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuf5_M-4zkPWtfG7dOx46ZGRxYT72BeueyKg&s',
    imageAlt: 'Vitthal-Rukmini Temple, Pune',
    address: '#705, 7th floor, Global Business Hub, Opp. Eon IT Park, Survey No. 1/1 A, Kharadi, Pune - 411014',
    phone: '9850070368',
    email: 'kharadi.pune@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/KCsfrQdYMvHg9nkC6'
  },
  {
    city: 'Bhilai, Chhattisgarh',
    image: 'https://www.shutterstock.com/image-photo/bhilai-chhattisgarh-india-oct-26-260nw-600395621.jpg',
    imageAlt: 'Maitri Bagh, Bhilai',
    address: 'No 8 & 9, Sadhana Complex, Maitri Nagar, Risali, Bhilai(CG) - 490006',
    phone: '+91 9981617903 / +91 9886628363',
    email: 'bhilai@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/UQa2HFYFcHRaqkSk7'
  },
  {
    city: 'Kothrud, Pune',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAvoZ-XB-PJRC9F0qSQB41Vk4PEajHCwNskoR3Q53qOwiTxIj1OSvByPaV7_etP4TpcAQ&usqp=CAU',
    imageAlt: 'Shaniwar Wada, Pune',
    address: '408, Fourth Floor, Saarrthi Success Square, Near Maharshi Karve Statue, Kothrud, Pune - 411038',
    phone: '+91 9665066683',
    email: 'kothrud_pune@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/3WpDihanxE8WDpP88'
  },
  {
    city: 'Bhubaneswar, Odisha',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDDCEPTKaEgPGfTYCCMhUx4l5qKtHt-xQcQ&s',
    imageAlt: 'Lingaraja Temple, Bhubaneswar',
    address: 'A23, Driems Villa, Patia, Bhubaneswar - 751024',
    phone: '+91 9789819082',
    email: 'odisha@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/ZUAcZMLcJtZDMYfX7'
  },
  {
    city: 'Noida, Uttar Pradesh',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmLMV3QfF-Y0XbEsVO3Ft6orHoPZM1zjHltg&s',
    imageAlt: 'Akshardham Temple, Delhi NCR',
    address: '2308 Gold, 23rd Floor, Wave One, Sector-18, Noida – 201301',
    phone: '+91 9205517358',
    email: 'noida@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/DpX7Ho7w4EmeCZWB9'
  },
  {
    city: 'Vizag, Andhra Pradesh',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYcBMRKcHXeNGK_iToHzEnwD4uehP_Y1IuPQ&s',
    imageAlt: 'Dolphin\'s Nose, Visakhapatnam',
    address: '3rd floor, 30-15-35, above IDBI Bank, near Saraswati Park Road, Daba Gardens, Allipuram, Jct, Visakhapatnam, Andhra Pradesh 530020',
    phone: '+91 9640921445',
    email: 'vizag@360digitmg.com',
    mapUrl: 'https://maps.app.goo.gl/d2JKJkVxPcmVBZ6u7'
  }
];

const FACULTY_DATA = [
  {
    name: 'Nahin S',
    designation: 'Senior Analytics Trainer',
    image: 'https://asean-360digitmg-lms2.s3.eu-north-1.amazonaws.com/Website/Website_1111/Nahin.png',
    expertise: ['Business Analytics', 'BI', 'Applied Analytics']
  },
  {
    name: 'Vibin K',
    designation: 'AI & Data Engineering Specialist',
    image: 'https://cdn.prod.website-files.com/67bf1fad5a37b76db797ea32/687793fae8054a41e1cc97b8_trainer-03.avif',
    expertise: ['Data Engineering', 'ML Pipelines', 'Automation']
  },
  {
    name: 'Bhargavi',
    designation: 'AI Applications & Domain Analytics',
    image: 'https://asean-360digitmg-lms2.s3.eu-north-1.amazonaws.com/Website/Barbhavi.png',
    expertise: ['Applied AI', 'GenAI', 'Domain Use Cases']
  }
];

const FOOTER_LINKS = {
  programs: ['Data Science', 'Machine Learning', 'AI & Deep Learning', 'Business Analytics', 'Python Programming'],
  company: ['About Us', 'Our Team', 'Careers', 'Success Stories', 'Contact'],
  support: ['Help Center', 'Student Portal', 'Course Materials', 'Technical Support', 'Community']
};

const SOCIAL_LINKS = [
  { Icon: Icons.Facebook, url: 'https://www.facebook.com/360digitmg', label: 'Facebook' },
  { Icon: Icons.Twitter, url: 'https://twitter.com/360digitmg', label: 'Twitter' },
  { Icon: Icons.LinkedIn, url: 'https://www.linkedin.com/company/360digitmg', label: 'LinkedIn' },
  { Icon: Icons.Instagram, url: 'https://www.instagram.com/360digitmg', label: 'Instagram' },
  { Icon: Icons.YouTube, url: 'https://www.youtube.com/c/360DigiTMG', label: 'YouTube' }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  // Preserve scroll position on page reload
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
    const handleScroll = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-based expansion for training centers
  useEffect(() => {
    const cards = document.querySelectorAll('.training-centers-section .center-card');
    const section = document.querySelector('.training-centers-section');
    const centersGrid = document.querySelector('.centers-grid');
    if (cards.length === 0 || !section || !centersGrid) return;

    const isSmallScreen = window.innerWidth < 1024;
    if (!isSmallScreen) {
      cards.forEach((card) => card.classList.remove('active'));
      return;
    }

    let sectionHasBeenViewed = false;
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !sectionHasBeenViewed) {
          sectionHasBeenViewed = true;
          if (cards[0]) cards[0].classList.add('active');
          setTimeout(() => {
            if (cards[0]) {
              const gridRect = centersGrid.getBoundingClientRect();
              const cardRect = cards[0].getBoundingClientRect();
              const centerOffset = (gridRect.width / 2) - (cardRect.width / 2);
              centersGrid.scrollTo({ left: cards[0].offsetLeft - centerOffset, behavior: 'smooth' });
            }
          }, 100);
        }
      });
    }, { threshold: 0.2 });

    sectionObserver.observe(section);

    let scrollTimeout;
    const handleCardScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const gridRect = centersGrid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;
        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const distance = Math.abs(centerX - (cardRect.left + cardRect.width / 2));
          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        });

        if (closestCard) {
          cards.forEach((card) => card.classList.remove('active'));
          closestCard.classList.add('active');
        }
      }, 50);
    };

    centersGrid.addEventListener('scroll', handleCardScroll);
    centersGrid.addEventListener('scrollend', handleCardScroll);
    handleCardScroll();

    return () => {
      sectionObserver.unobserve(section);
      centersGrid.removeEventListener('scroll', handleCardScroll);
      centersGrid.removeEventListener('scrollend', handleCardScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Slider navigation
  const nextSlide = () => {
    const wrapper = document.querySelector('.course-slider-wrapper');
    if (wrapper) wrapper.scrollBy({ left: 295, behavior: 'smooth' });
    setCurrentSlide((prev) => (prev + 1) % COURSES_DATA.length);
  };

  const prevSlide = () => {
    const wrapper = document.querySelector('.course-slider-wrapper');
    if (wrapper) wrapper.scrollBy({ left: -295, behavior: 'smooth' });
    setCurrentSlide((prev) => (prev - 1 + COURSES_DATA.length) % COURSES_DATA.length);
  };

  const goToSlide = (index) => {
    const wrapper = document.querySelector('.course-slider-wrapper');
    if (wrapper) wrapper.scrollTo({ left: index * 295, behavior: 'smooth' });
    setCurrentSlide(index);
  };

  // Center card click handlers
  const handleCenterCardClick = (e, locationUrl) => {
    const card = e.currentTarget;
    if (!card.classList.contains('expanded')) {
      document.querySelectorAll('.center-card').forEach((c) => c.classList.remove('expanded'));
      card.classList.add('expanded');
    } else {
      window.open(locationUrl, '_blank');
    }
  };

  const handleImageSectionClick = (e) => {
    e.stopPropagation();
    const card = e.currentTarget.closest('.center-card');
    if (card) {
      document.querySelectorAll('.center-card').forEach((c) => c.classList.remove('expanded'));
      card.classList.add('expanded');
    }
  };

  const handleCenterCityClick = (e, locationUrl) => {
    e.stopPropagation();
    window.open(locationUrl, '_blank');
  };

  return (
    <main className="App">
      <ScrollingNavbar />
      <MainNavbar />

      <div className="main-content">
        {/* Hero Section */}
        <section className="video-booking-section">
          <header className="hero-heading">
            <h1>Welcome to Your Learning Workspace</h1>
            <p>Access your courses, continue lessons, track progress, and manage your learning all in one place.</p>
          </header>

          <div className="video-booking-content">
            <div className="banner-section">
              <img src={require('../../assets/images/BANNER-02.png')} alt="Learning Banner" className="banner-image" />
            </div>
            <aside className="booking-aside">
              <div className="booking-form-container">
                <form className="student-form login-form" noValidate>
                  <div className="form-group">
                    <label className="form-label">Username or Email</label>
                    <input type="text" name="username" placeholder="Enter your username or email" className="form-input modern" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" placeholder="Enter your password" className="form-input modern" required />
                  </div>
                  <div className="form-options">
                    <label className="remember-me">
                      <input type="checkbox" name="remember" />
                      <span>Remember me</span>
                    </label>
                    <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
                  </div>
                  <button type="submit" className="submit-btn modern">Login</button>
                  <div className="form-footer-links">
                    <p>Don't have an account? <a href="#register" className="register-link">Register Now</a></p>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </section>

        {/* Learner Outcomes Section */}
        <section className="learner-outcomes">
          <div className="outcomes-container">
            <div className="outcomes-header">
              <h2 className="section-heading outcomes-title">What You Can Do Here</h2>
              <p className="outcomes-subtitle">Join 20,000+ professionals who transformed their careers and achieved 3x salary growth.</p>
            </div>

            <div className="workspace-tiles">
              {WORKSPACE_TILES.map((tile, index) => (
                <div className="workspace-tile" key={index}>
                  <div className="tile-glow"></div>
                  <div className="tile-particles"><span></span><span></span><span></span></div>
                  <div className="tile-icon">{tile.icon}</div>
                  <h3>{tile.title}</h3>
                  <p>{tile.description}</p>
                  <div className="tile-shimmer"></div>
                </div>
              ))}
            </div>

            <div className="success-metrics">
              {SUCCESS_METRICS.map((metric, index) => (
                <div className="metric-box" key={index}>
                  <div className="metric-number">{metric.number}</div>
                  <div className="metric-text">{metric.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="home-courses-section">
          <div className="home-courses-container">
            <div className="home-courses-header">
              <h2 className="section-heading home-courses-title">Learning Tracks Available on the Platform</h2>
              <p className="home-courses-subtitle">Structured programs delivered through live, blended, and self-paced formats.</p>
            </div>

            <div className="course-slider-container">
              <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous course">‹</button>
              <div className="course-slider-wrapper">
                <div className="course-slider-track" data-current-slide={currentSlide}>
                  {COURSES_DATA.map((course, index) => (
                    <CourseCard key={index} course={course} onAction={() => navigate("/courses")} actionText="Continue Learning" />
                  ))}
                </div>
              </div>
              <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next course">›</button>
              <div className="slider-dots">
                {COURSES_DATA.map((_, index) => (
                  <button key={index} className={`slider-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)} aria-label={`Go to slide ${index + 1}`} />
                ))}
              </div>
            </div>
            <p className="courses-micro-footer">All programs are designed for working professionals, with AI embedded as capability — not as a standalone tool.</p>
          </div>
        </section>

        {/* Alumni Section */}
        <section className="alumni-section">
          <div className="alumni-container">
            <div className="alumni-header">
              <h2 className="section-heading alumni-title">Learner Experiences</h2>
              <p className="alumni-subtitle">Feedback from professionals who have completed structured learning programs on the platform.</p>
            </div>

            <div className="testimonial-3d-slider">
              <button className="slider-3d-nav prev" onClick={() => setActiveTestimonial(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1)} aria-label="Previous">‹</button>
              <div className="slider-3d-container">
                <div className="slider-3d-track">
                  {TESTIMONIALS.map((testimonial, index) => {
                    let position = index - activeTestimonial;
                    if (position < -5) position += TESTIMONIALS.length;
                    if (position > 5) position -= TESTIMONIALS.length;
                    return (
                      <div key={index} className={`card-3d ${position === 0 ? 'active' : ''} ${position === -1 ? 'prev-card' : ''} ${position === 1 ? 'next-card' : ''} ${Math.abs(position) > 1 ? 'hidden-card' : ''}`} onClick={() => setActiveTestimonial(index)}>
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
              <button className="slider-3d-nav next" onClick={() => setActiveTestimonial(prev => prev === TESTIMONIALS.length - 1 ? 0 : prev + 1)} aria-label="Next">›</button>
              <div className="slider-3d-dots">
                {TESTIMONIALS.map((_, index) => (
                  <button key={index} className={`dot-3d ${index === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(index)} aria-label={`Go to slide ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Section */}
        <section className="corporate-section">
          <div className="corporate-wrapper">
            <h2 className="corporate-heading">Companies That Trust Us</h2>
            <p className="corporate-subtext">Trusted by organisations for structured workforce upskilling and learning delivery.</p>
            <div className="corporate-scroll-container">
              <div className="corporate-row scroll-left">
                <div className="corporate-track">
                  {[...CORPORATE_LOGOS_ROW1, ...CORPORATE_LOGOS_ROW1].map((logo, index) => (
                    <div className="corporate-logo-card" key={index}>
                      <img src={logo.src} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="corporate-row scroll-right">
                <div className="corporate-track">
                  {[...CORPORATE_LOGOS_ROW2, ...CORPORATE_LOGOS_ROW2].map((logo, index) => (
                    <div className="corporate-logo-card" key={index}>
                      <img src={logo.src} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="section-heading features-title">A Structured Learning Platform, Not Just Courses</h2>
              <p className="features-subtitle">Built to support continuous learning, progress tracking, and organisational capability development.</p>
            </div>
            <div className="features-grid-simple">
              {FEATURE_CARDS.map((card, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon">{card.icon}</div>
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-description">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Centers Section */}
        <section className="training-centers-section" aria-label="Training Centers">
          <div className="centers-container">
            <div className="centers-header">
              <h2 className="section-heading centers-title">Learning Delivery Infrastructure</h2>
              <p className="centers-subtitle">Centralised platform supporting remote, hybrid, and in-person learning delivery across regions.</p>
            </div>
            <div className="centers-slider-wrapper">
              <div className="centers-grid" role="list">
                {TRAINING_CENTERS.map((center, index) => (
                  <article className="center-card" role="listitem" key={index} onClick={(e) => handleCenterCardClick(e, center.mapUrl)}>
                    <div className="center-image-section" onClick={handleImageSectionClick}>
                      <div className="center-icon" aria-hidden="true" style={{cursor: 'pointer'}}>
                        <img src={center.image} alt={center.imageAlt} />
                      </div>
                      <h3 className="center-city" onClick={(e) => handleCenterCityClick(e, center.mapUrl)}>{center.city}</h3>
                    </div>
                    <div className="center-content-section">
                      {center.description && <p className="center-description">{center.description}</p>}
                      <div className="center-details">
                        <div className="detail-item">
                          <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                          <span>{center.address}</span>
                        </div>
                        <div className="detail-item">
                          <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                          <span><a href={`tel:${center.phone.replace(/[^0-9+]/g, '')}`}>{center.phone}</a></span>
                        </div>
                        <div className="detail-item">
                          <img src="https://img.icons8.com/fluency/20/email.png" alt="" aria-hidden="true" />
                          <span><a href={`mailto:${center.email}`}>{center.email}</a></span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="centers-cta" role="region" aria-label="Online learning option">
              <p>Can't find a center near you? <strong>No problem!</strong> We offer <strong>Live Online Classes</strong> with the same quality, expert trainers, and interactive learning experience from anywhere in India.</p>
              <button className="explore-btn" onClick={() => navigate("/courses")} aria-label="Explore our online programs">Explore Online Programs →</button>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="leadership-section">
          <div className="leadership-container">
            <h2 className="section-heading leadership-title">Academic Leadership</h2>
            <div className="leadership-card-compact">
              <div className="leader-image-side">
                <div className="image-wrapper">
                  <a href="https://www.linkedin.com/in/bharanikumardepuru/" target="_blank" rel="noopener noreferrer">
                    <img src={require('../../assets/images/download.jpg')} alt="Bharani Kumar D" className="leader-photo" />
                  </a>
                </div>
              </div>
              <div className="leader-details">
                <div className="leader-header-compact">
                  <h3>Bharani Kumar D</h3>
                  <p className="leader-position">Founder & Lead Faculty – AI & Data Programs</p>
                </div>
                <p className="leader-summary">Provides academic direction and curriculum oversight across AI, analytics, and enterprise learning initiatives, with a focus on applied outcomes and industry relevance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="faculty-section">
          <div className="faculty-container">
            <h2 className="section-heading faculty-title">Faculty & Program Contributors</h2>
            <p className="faculty-subheading">Programs are delivered and supported by experienced practitioners and domain specialists.</p>
            <div className="faculty-grid">
              {FACULTY_DATA.map((faculty, index) => (
                <article className="faculty-card" key={index}>
                  <div className="faculty-image">
                    <img src={faculty.image} alt={faculty.name} />
                  </div>
                  <div className="faculty-info">
                    <h3 className="faculty-name">{faculty.name}</h3>
                    <p className="faculty-designation">{faculty.designation}</p>
                    <div className="faculty-expertise-tags">
                      {faculty.expertise.map((skill, idx) => (
                        <span className="expertise-tag" key={idx}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="footer-logo">
                  <img src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png" alt="AiTutor Logo" className="footer-logo-image" />
                </div>
                <p className="footer-description">Transform your career with industry-leading data science and technology programs. Join thousands of successful alumni working at top companies worldwide.</p>
                <div className="social-links">
                  {SOCIAL_LINKS.map((social, index) => (
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.label} key={index}>
                      <social.Icon />
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Programs</h3>
                <ul className="footer-links">
                  {FOOTER_LINKS.programs.map((link, index) => (
                    <li key={index}><a href="#" className="footer-link">{link}</a></li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Company</h3>
                <ul className="footer-links">
                  {FOOTER_LINKS.company.map((link, index) => (
                    <li key={index}><a href="#" className="footer-link">{link}</a></li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Support</h3>
                <ul className="footer-links">
                  {FOOTER_LINKS.support.map((link, index) => (
                    <li key={index}><a href="#" className="footer-link">{link}</a></li>
                  ))}
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Contact Info</h3>
                <div className="contact-info">
                  <p className="contact-item"><strong>Corporate Location</strong></p>
                  <p className="contact-item">Flat No.201, Third floor, Plot no. 26, D.No.1-89/C/1, Manu Abode Silpee Enclave, Vittal Rao Nagar Rd, Vittal Rao Nagar, Madhapur, Hyderabad, Telangana 500081</p>
                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Phone</strong></p>
                  <p className="contact-item">1800-212-654321</p>
                  <p className="contact-item" style={{marginTop: '10px'}}><strong>Business Email:</strong></p>
                  <p className="contact-item"><a href="mailto:enquiry@360digitmg.com">enquiry@360digitmg.com</a></p>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <p className="copyright">© 360DigiTMG. All rights reserved.</p>
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
