-- 360DigiTMG Academy Database Setup
-- Run this SQL to set up the database for the application

-- Create database
CREATE DATABASE IF NOT EXISTS `digitmg_360_academy`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `digitmg_360_academy`;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `students`;

-- Create students table (matches auth.js expectations)
CREATE TABLE IF NOT EXISTS `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `dateOfBirth` DATE NULL,
  `gender` ENUM('Male', 'Female', 'Other', 'Prefer not to say') NULL,
  `address` TEXT NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country` VARCHAR(100) DEFAULT 'India',
  `pincode` VARCHAR(20) NULL,
  `educationLevel` VARCHAR(100) NULL,
  `currentRole` VARCHAR(100) NULL,
  `experienceYears` INT DEFAULT 0,
  `preferredCourse` VARCHAR(200) NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_phone` (`phone`),
  INDEX `idx_created_at` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create courses table
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) NULL,
  `durationMonths` INT NULL,
  `price` DECIMAL(10, 2) NULL,
  `category` VARCHAR(100) NULL,
  `level` ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
  `isActive` BOOLEAN DEFAULT TRUE,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_level` (`level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create enrollments table
CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `studentId` INT NOT NULL,
  `courseId` INT NOT NULL,
  `enrollmentDate` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('active', 'completed', 'dropped', 'pending') DEFAULT 'active',
  `progress` INT DEFAULT 0,
  `completionDate` TIMESTAMP NULL,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_enrollment` (`studentId`, `courseId`),
  INDEX `idx_student_id` (`studentId`),
  INDEX `idx_course_id` (`courseId`),
  INDEX `idx_enrollment_date` (`enrollmentDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample courses
INSERT INTO `courses` (`name`, `description`, `icon`, `durationMonths`, `price`, `category`, `level`) VALUES
-- Data Science Courses
('Data Science with Python', 'Master Python, Machine Learning, Statistical Analysis, and Data Visualization', '📊', 6, 49999.00, 'Data Science', 'Intermediate'),
('Advanced Data Science & ML', 'Advanced Machine Learning, Deep Learning, and Neural Networks', '🔬', 8, 64999.00, 'Data Science', 'Advanced'),
('Data Science Fundamentals', 'Introduction to Data Science, Python Basics, and Statistics', '📚', 4, 34999.00, 'Data Science', 'Beginner'),
('Applied Data Science', 'Real-world Data Science Projects and Case Studies', '💼', 6, 54999.00, 'Data Science', 'Intermediate'),
('Data Science with R Programming', 'Statistical Computing, Data Analysis, and Visualization with R', '📐', 5, 44999.00, 'Data Science', 'Intermediate'),

-- Artificial Intelligence Courses
('Artificial Intelligence & Deep Learning', 'Deep Learning, Neural Networks, Computer Vision, and NLP', '🤖', 8, 59999.00, 'Artificial Intelligence', 'Advanced'),
('AI Fundamentals', 'Introduction to AI, Machine Learning, and Neural Networks', '🧠', 5, 42999.00, 'Artificial Intelligence', 'Beginner'),
('Computer Vision & Image Processing', 'OpenCV, Image Recognition, Object Detection, and Face Recognition', '👁️', 6, 54999.00, 'Artificial Intelligence', 'Advanced'),
('Natural Language Processing', 'Text Analysis, Sentiment Analysis, Chatbots, and Language Models', '💬', 7, 57999.00, 'Artificial Intelligence', 'Advanced'),
('AI for Business Applications', 'Implementing AI Solutions in Business Environments', '💡', 5, 48999.00, 'Artificial Intelligence', 'Intermediate'),
('Generative AI & LLMs', 'Large Language Models, GPT, Prompt Engineering, and AI Applications', '✨', 6, 62999.00, 'Artificial Intelligence', 'Advanced'),

-- Analytics Courses
('Business Analytics with Power BI', 'Excel, Tableau, Power BI, and Business Intelligence Tools', '📈', 4, 39999.00, 'Analytics', 'Beginner'),
('Data Analytics for Beginners', 'SQL, Excel, Basic Statistics, and Data Visualization', '📉', 3, 24999.00, 'Analytics', 'Beginner'),
('Advanced Business Analytics', 'Predictive Analytics, Forecasting, and Strategic Decision Making', '📊', 6, 49999.00, 'Analytics', 'Advanced'),
('Marketing Analytics', 'Customer Analytics, Campaign Analysis, and Marketing ROI', '🎯', 5, 44999.00, 'Analytics', 'Intermediate'),
('Financial Analytics', 'Financial Modeling, Risk Analysis, and Investment Analytics', '💰', 6, 52999.00, 'Analytics', 'Intermediate'),
('Web Analytics & SEO', 'Google Analytics, SEO Tools, Conversion Optimization', '🌐', 4, 36999.00, 'Analytics', 'Beginner'),

-- Cloud & DevOps Courses
('Cloud Computing & DevOps', 'AWS, Azure, Google Cloud Platform, Docker, and Kubernetes', '☁️', 5, 44999.00, 'Cloud & DevOps', 'Intermediate'),
('AWS Solutions Architect', 'AWS Services, Cloud Architecture, and Best Practices', '🏗️', 6, 54999.00, 'Cloud & DevOps', 'Advanced'),
('Azure Cloud Administrator', 'Microsoft Azure, Cloud Management, and Administration', '⚡', 5, 49999.00, 'Cloud & DevOps', 'Intermediate'),
('DevOps Engineering', 'CI/CD, Jenkins, Docker, Kubernetes, and Automation', '🔧', 6, 52999.00, 'Cloud & DevOps', 'Advanced'),
('Google Cloud Platform', 'GCP Services, Cloud Architecture, and Implementation', '🌩️', 5, 48999.00, 'Cloud & DevOps', 'Intermediate'),
('Kubernetes Administration', 'Container Orchestration, K8s Clusters, and Management', '⚓', 4, 42999.00, 'Cloud & DevOps', 'Advanced'),

-- Programming Courses
('Full Stack Python Development', 'Django, Flask, React, PostgreSQL, and RESTful APIs', '🐍', 5, 34999.00, 'Programming', 'Intermediate'),
('Java Full Stack Development', 'Spring Boot, Hibernate, React, and Microservices', '☕', 6, 44999.00, 'Programming', 'Intermediate'),
('JavaScript & React Masterclass', 'Modern JavaScript, React, Redux, and Node.js', '⚛️', 5, 39999.00, 'Programming', 'Intermediate'),
('Python Programming for Beginners', 'Python Fundamentals, OOP, and Problem Solving', '🐍', 3, 24999.00, 'Programming', 'Beginner'),
('MERN Stack Development', 'MongoDB, Express, React, Node.js Full Stack', '🟢', 6, 42999.00, 'Programming', 'Intermediate'),
('C++ Programming & DSA', 'C++ Fundamentals, Data Structures, and Algorithms', '💻', 5, 37999.00, 'Programming', 'Intermediate'),
('.NET Core Development', 'ASP.NET Core, C#, Entity Framework, and Web APIs', '🔷', 5, 41999.00, 'Programming', 'Intermediate'),
('Mobile App Development with Flutter', 'Cross-platform Mobile Apps with Flutter and Dart', '📱', 5, 39999.00, 'Programming', 'Intermediate'),

-- Security Courses
('Cyber Security & Ethical Hacking', 'Network Security, Penetration Testing, and Digital Forensics', '🔐', 7, 54999.00, 'Security', 'Advanced'),
('Ethical Hacking & Penetration Testing', 'Advanced Hacking Techniques, Security Tools, and Testing', '🎭', 8, 59999.00, 'Security', 'Advanced'),
('Network Security Fundamentals', 'Firewalls, VPNs, IDS/IPS, and Network Protection', '🛡️', 5, 44999.00, 'Security', 'Beginner'),
('Cloud Security Specialist', 'Cloud Security Architecture, Compliance, and Best Practices', '🔒', 6, 52999.00, 'Security', 'Advanced'),
('Application Security', 'Secure Coding, OWASP, and Application Protection', '🔓', 5, 47999.00, 'Security', 'Intermediate'),
('Information Security Management', 'Security Policies, Risk Management, and Compliance', '📋', 4, 39999.00, 'Security', 'Intermediate'),

-- Data Engineering Courses
('Data Engineering with Python', 'ETL Pipelines, Data Warehousing, and Big Data Technologies', '⚙️', 6, 52999.00, 'Data Engineering', 'Advanced'),
('Big Data & Hadoop Ecosystem', 'Hadoop, Spark, Hive, and Distributed Computing', '🐘', 7, 56999.00, 'Data Engineering', 'Advanced'),
('Apache Spark & Scala', 'Spark Programming, Real-time Processing, and Optimization', '⚡', 6, 54999.00, 'Data Engineering', 'Advanced'),
('Data Pipeline Engineering', 'Airflow, Data Orchestration, and Workflow Management', '🔄', 5, 49999.00, 'Data Engineering', 'Intermediate'),
('Snowflake Data Warehouse', 'Cloud Data Warehousing, SQL, and Data Management', '❄️', 4, 44999.00, 'Data Engineering', 'Intermediate'),
('Real-time Data Streaming', 'Kafka, Stream Processing, and Event-Driven Architecture', '🌊', 6, 52999.00, 'Data Engineering', 'Advanced'),

-- Marketing Courses
('Digital Marketing Masterclass', 'SEO, SEM, Social Media, Content Marketing, and Analytics', '📱', 4, 32999.00, 'Marketing', 'Beginner'),
('Social Media Marketing', 'Facebook, Instagram, LinkedIn, Twitter Marketing Strategies', '📲', 3, 27999.00, 'Marketing', 'Beginner'),
('Performance Marketing & PPC', 'Google Ads, Facebook Ads, Campaign Optimization', '🎯', 4, 34999.00, 'Marketing', 'Intermediate'),
('Content Marketing & Strategy', 'Content Creation, Blogging, Video Marketing, and Distribution', '✍️', 4, 29999.00, 'Marketing', 'Beginner'),
('Email Marketing & Automation', 'Email Campaigns, Marketing Automation, and CRM', '📧', 3, 24999.00, 'Marketing', 'Beginner'),
('Growth Hacking & Marketing Analytics', 'Growth Strategies, A/B Testing, and Data-Driven Marketing', '🚀', 5, 39999.00, 'Marketing', 'Intermediate'),

-- Blockchain Courses
('Blockchain Technology Fundamentals', 'Blockchain Basics, Cryptocurrencies, and Smart Contracts', '⛓️', 4, 42999.00, 'Blockchain', 'Beginner'),
('Ethereum & Smart Contract Development', 'Solidity Programming, DApps, and Web3 Development', '💎', 6, 54999.00, 'Blockchain', 'Advanced'),
('Cryptocurrency Trading & Investment', 'Crypto Markets, Trading Strategies, and Portfolio Management', '💰', 3, 29999.00, 'Blockchain', 'Beginner'),
('Blockchain for Enterprise', 'Hyperledger, Enterprise Blockchain Solutions, and Use Cases', '🏢', 5, 49999.00, 'Blockchain', 'Intermediate'),
('NFT Development & Marketplace', 'NFT Creation, Smart Contracts, and Marketplace Development', '🎨', 4, 44999.00, 'Blockchain', 'Intermediate'),
('DeFi Development', 'Decentralized Finance, Protocols, and DApp Development', '🏦', 6, 57999.00, 'Blockchain', 'Advanced');

-- Success message
SELECT 'Database setup completed successfully!' AS message;
SELECT COUNT(*) AS total_courses FROM courses;
