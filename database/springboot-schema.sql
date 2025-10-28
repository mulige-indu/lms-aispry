-- Spring Boot Compatible Database Schema for 360DigiTMG Academy
-- Run this SQL in MySQL Workbench to create the Spring Boot compatible database

-- Create database
CREATE DATABASE IF NOT EXISTS `digitmg_360_academy`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `digitmg_360_academy`;

-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `students`;

-- Create students table (Spring Boot uses 'students' instead of 'users')
CREATE TABLE `students` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `dateOfBirth` DATE NULL,
  `gender` VARCHAR(50) NULL,
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
  INDEX `idx_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create courses table with all required fields
CREATE TABLE `courses` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) NULL,
  `durationMonths` INT NULL,
  `price` DECIMAL(10, 2) NULL,
  `category` VARCHAR(100) NULL,
  `level` VARCHAR(20) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_level` (`level`),
  INDEX `idx_isActive` (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create enrollments table
CREATE TABLE `enrollments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `studentId` BIGINT NOT NULL,
  `courseId` BIGINT NOT NULL,
  `status` VARCHAR(20) DEFAULT 'active',
  `progress` INT DEFAULT 0,
  `enrolledAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `completedAt` TIMESTAMP NULL,
  FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  INDEX `idx_studentId` (`studentId`),
  INDEX `idx_courseId` (`courseId`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert comprehensive course data
INSERT INTO `courses` (`name`, `description`, `icon`, `category`, `level`, `durationMonths`, `price`, `isActive`) VALUES
-- Data Science Courses
('Data Science with Python', 'Master Python, Machine Learning, Statistical Analysis, and Data Visualization', '📊', 'Data Science', 'Intermediate', 6, 49999.00, TRUE),
('Advanced Data Science & ML', 'Advanced Machine Learning, Deep Learning, and Neural Networks', '🔬', 'Data Science', 'Advanced', 8, 64999.00, TRUE),
('Data Science Fundamentals', 'Introduction to Data Science, Python Basics, and Statistics', '📚', 'Data Science', 'Beginner', 4, 34999.00, TRUE),
('Applied Data Science', 'Real-world Data Science Projects and Case Studies', '💼', 'Data Science', 'Intermediate', 6, 54999.00, TRUE),
('Data Science with R Programming', 'Statistical Computing, Data Analysis, and Visualization with R', '📐', 'Data Science', 'Intermediate', 5, 44999.00, TRUE),

-- Artificial Intelligence Courses
('Artificial Intelligence & Deep Learning', 'Deep Learning, Neural Networks, Computer Vision, and NLP', '🤖', 'Artificial Intelligence', 'Advanced', 8, 59999.00, TRUE),
('AI Fundamentals', 'Introduction to AI, Machine Learning, and Neural Networks', '🧠', 'Artificial Intelligence', 'Beginner', 5, 42999.00, TRUE),
('Computer Vision & Image Processing', 'OpenCV, Image Recognition, Object Detection, and Face Recognition', '👁️', 'Artificial Intelligence', 'Advanced', 6, 54999.00, TRUE),
('Natural Language Processing', 'Text Analysis, Sentiment Analysis, Chatbots, and Language Models', '💬', 'Artificial Intelligence', 'Advanced', 7, 57999.00, TRUE),
('AI for Business Applications', 'Implementing AI Solutions in Business Environments', '💡', 'Artificial Intelligence', 'Intermediate', 5, 48999.00, TRUE),
('Generative AI & LLMs', 'Large Language Models, GPT, Prompt Engineering, and AI Applications', '✨', 'Artificial Intelligence', 'Advanced', 6, 62999.00, TRUE),

-- Analytics Courses
('Business Analytics with Power BI', 'Excel, Tableau, Power BI, and Business Intelligence Tools', '📈', 'Analytics', 'Beginner', 4, 39999.00, TRUE),
('Data Analytics for Beginners', 'SQL, Excel, Basic Statistics, and Data Visualization', '📉', 'Analytics', 'Beginner', 3, 24999.00, TRUE),
('Advanced Business Analytics', 'Predictive Analytics, Forecasting, and Strategic Decision Making', '📊', 'Analytics', 'Advanced', 6, 49999.00, TRUE),
('Marketing Analytics', 'Customer Analytics, Campaign Analysis, and Marketing ROI', '🎯', 'Analytics', 'Intermediate', 5, 44999.00, TRUE),
('Financial Analytics', 'Financial Modeling, Risk Analysis, and Investment Analytics', '💰', 'Analytics', 'Intermediate', 6, 52999.00, TRUE),
('Web Analytics & SEO', 'Google Analytics, SEO Tools, Conversion Optimization', '🌐', 'Analytics', 'Beginner', 4, 36999.00, TRUE),

-- Cloud & DevOps Courses
('Cloud Computing & DevOps', 'AWS, Azure, Google Cloud Platform, Docker, and Kubernetes', '☁️', 'Cloud & DevOps', 'Intermediate', 5, 44999.00, TRUE),
('AWS Solutions Architect', 'AWS Services, Cloud Architecture, and Best Practices', '🏗️', 'Cloud & DevOps', 'Advanced', 6, 54999.00, TRUE),
('Azure Cloud Administrator', 'Microsoft Azure, Cloud Management, and Administration', '⚡', 'Cloud & DevOps', 'Intermediate', 5, 49999.00, TRUE),
('DevOps Engineering', 'CI/CD, Jenkins, Docker, Kubernetes, and Automation', '🔧', 'Cloud & DevOps', 'Advanced', 6, 52999.00, TRUE),
('Google Cloud Platform', 'GCP Services, Cloud Architecture, and Implementation', '🌩️', 'Cloud & DevOps', 'Intermediate', 5, 48999.00, TRUE),
('Kubernetes Administration', 'Container Orchestration, K8s Clusters, and Management', '⚓', 'Cloud & DevOps', 'Advanced', 4, 42999.00, TRUE),

-- Programming Courses
('Full Stack Python Development', 'Django, Flask, React, PostgreSQL, and RESTful APIs', '🐍', 'Programming', 'Intermediate', 5, 34999.00, TRUE),
('Java Full Stack Development', 'Spring Boot, Hibernate, React, and Microservices', '☕', 'Programming', 'Intermediate', 6, 44999.00, TRUE),
('JavaScript & React Masterclass', 'Modern JavaScript, React, Redux, and Node.js', '⚛️', 'Programming', 'Intermediate', 5, 39999.00, TRUE),
('Python Programming for Beginners', 'Python Fundamentals, OOP, and Problem Solving', '🐍', 'Programming', 'Beginner', 3, 24999.00, TRUE),
('MERN Stack Development', 'MongoDB, Express, React, Node.js Full Stack', '🟢', 'Programming', 'Intermediate', 6, 42999.00, TRUE),
('C++ Programming & DSA', 'C++ Fundamentals, Data Structures, and Algorithms', '💻', 'Programming', 'Intermediate', 5, 37999.00, TRUE),
('.NET Core Development', 'ASP.NET Core, C#, Entity Framework, and Web APIs', '🔷', 'Programming', 'Intermediate', 5, 41999.00, TRUE),
('Mobile App Development with Flutter', 'Cross-platform Mobile Apps with Flutter and Dart', '📱', 'Programming', 'Intermediate', 5, 39999.00, TRUE),

-- Security Courses
('Cyber Security & Ethical Hacking', 'Network Security, Penetration Testing, and Digital Forensics', '🔐', 'Security', 'Advanced', 7, 54999.00, TRUE),
('Ethical Hacking & Penetration Testing', 'Advanced Hacking Techniques, Security Tools, and Testing', '🎭', 'Security', 'Advanced', 8, 59999.00, TRUE),
('Network Security Fundamentals', 'Firewalls, VPNs, IDS/IPS, and Network Protection', '🛡️', 'Security', 'Beginner', 5, 44999.00, TRUE),
('Cloud Security Specialist', 'Cloud Security Architecture, Compliance, and Best Practices', '🔒', 'Security', 'Advanced', 6, 52999.00, TRUE),
('Application Security', 'Secure Coding, OWASP, and Application Protection', '🔓', 'Security', 'Intermediate', 5, 47999.00, TRUE),
('Information Security Management', 'Security Policies, Risk Management, and Compliance', '📋', 'Security', 'Intermediate', 4, 39999.00, TRUE),

-- Data Engineering Courses
('Data Engineering with Python', 'ETL Pipelines, Data Warehousing, and Big Data Technologies', '⚙️', 'Data Engineering', 'Advanced', 6, 52999.00, TRUE),
('Big Data & Hadoop Ecosystem', 'Hadoop, Spark, Hive, and Distributed Computing', '🐘', 'Data Engineering', 'Advanced', 7, 56999.00, TRUE),
('Apache Spark & Scala', 'Spark Programming, Real-time Processing, and Optimization', '⚡', 'Data Engineering', 'Advanced', 6, 54999.00, TRUE),
('Data Pipeline Engineering', 'Airflow, Data Orchestration, and Workflow Management', '🔄', 'Data Engineering', 'Intermediate', 5, 49999.00, TRUE),
('Snowflake Data Warehouse', 'Cloud Data Warehousing, SQL, and Data Management', '❄️', 'Data Engineering', 'Intermediate', 4, 44999.00, TRUE),
('Real-time Data Streaming', 'Kafka, Stream Processing, and Event-Driven Architecture', '🌊', 'Data Engineering', 'Advanced', 6, 52999.00, TRUE),

-- Marketing Courses
('Digital Marketing Masterclass', 'SEO, SEM, Social Media, Content Marketing, and Analytics', '📱', 'Marketing', 'Beginner', 4, 32999.00, TRUE),
('Social Media Marketing', 'Facebook, Instagram, LinkedIn, Twitter Marketing Strategies', '📲', 'Marketing', 'Beginner', 3, 27999.00, TRUE),
('Performance Marketing & PPC', 'Google Ads, Facebook Ads, Campaign Optimization', '🎯', 'Marketing', 'Intermediate', 4, 34999.00, TRUE),
('Content Marketing & Strategy', 'Content Creation, Blogging, Video Marketing, and Distribution', '✍️', 'Marketing', 'Beginner', 4, 29999.00, TRUE),
('Email Marketing & Automation', 'Email Campaigns, Marketing Automation, and CRM', '📧', 'Marketing', 'Beginner', 3, 24999.00, TRUE),
('Growth Hacking & Marketing Analytics', 'Growth Strategies, A/B Testing, and Data-Driven Marketing', '🚀', 'Marketing', 'Intermediate', 5, 39999.00, TRUE),

-- Blockchain Courses
('Blockchain Technology Fundamentals', 'Blockchain Basics, Cryptocurrencies, and Smart Contracts', '⛓️', 'Blockchain', 'Beginner', 4, 42999.00, TRUE),
('Ethereum & Smart Contract Development', 'Solidity Programming, DApps, and Web3 Development', '💎', 'Blockchain', 'Advanced', 6, 54999.00, TRUE),
('Cryptocurrency Trading & Investment', 'Crypto Markets, Trading Strategies, and Portfolio Management', '💰', 'Blockchain', 'Beginner', 3, 29999.00, TRUE),
('Blockchain for Enterprise', 'Hyperledger, Enterprise Blockchain Solutions, and Use Cases', '🏢', 'Blockchain', 'Intermediate', 5, 49999.00, TRUE),
('NFT Development & Marketplace', 'NFT Creation, Smart Contracts, and Marketplace Development', '🎨', 'Blockchain', 'Intermediate', 4, 44999.00, TRUE),
('DeFi Development', 'Decentralized Finance, Protocols, and DApp Development', '🏦', 'Blockchain', 'Advanced', 6, 57999.00, TRUE);

-- Success message
SELECT 'Spring Boot compatible database schema created successfully!' AS message;
SELECT COUNT(*) AS total_courses FROM courses;
