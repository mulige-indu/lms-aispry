-- 360DigiTMG Database Schema
-- Run this SQL in MySQL Workbench to set up the database

-- Create database
CREATE DATABASE IF NOT EXISTS `360digitmg`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `360digitmg`;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `date_of_birth` DATE NULL,
  `gender` ENUM('Male', 'Female', 'Other') NULL,
  `address` TEXT NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country` VARCHAR(100) NULL,
  `pincode` VARCHAR(20) NULL,
  `education_level` VARCHAR(100) NULL,
  `current_role` VARCHAR(100) NULL,
  `experience_years` INT DEFAULT 0,
  `preferred_course` VARCHAR(200) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_phone` (`phone`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create courses table (for future use)
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(50) NULL,
  `duration_months` INT NULL,
  `price` DECIMAL(10, 2) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create enrollments table (for future use)
CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `enrollment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('active', 'completed', 'dropped') DEFAULT 'active',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_course_id` (`course_id`),
  INDEX `idx_enrollment_date` (`enrollment_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample courses
INSERT INTO `courses` (`name`, `description`, `icon`, `duration_months`, `price`) VALUES
('Data Science', 'Master Python, Machine Learning, and Statistical Analysis', '📊', 6, 49999.00),
('Artificial Intelligence', 'Deep Learning, Neural Networks, and AI Applications', '🤖', 8, 59999.00),
('Business Analytics', 'Excel, Tableau, Power BI, and Business Intelligence', '📈', 4, 39999.00),
('Cloud Computing', 'AWS, Azure, Google Cloud Platform and DevOps', '☁️', 5, 44999.00),
('Python Programming', 'Full Stack Python Development and Web Applications', '🐍', 3, 29999.00),
('Cyber Security', 'Ethical Hacking, Network Security, and Digital Forensics', '🔐', 7, 54999.00);

-- Success message
SELECT 'Database schema created successfully!' AS message;
