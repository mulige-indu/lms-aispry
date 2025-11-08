-- Forum Schema Update - Add new fields for enhanced features
-- Execute this after forum-schema.sql

USE digitmg_360_academy;

-- Add new columns to forum_threads table
ALTER TABLE forum_threads
ADD COLUMN question_type ENUM('interview', 'general', 'doubt') DEFAULT 'general' AFTER content,
ADD COLUMN attachment_url VARCHAR(500) DEFAULT NULL AFTER question_type,
ADD COLUMN attachment_name VARCHAR(255) DEFAULT NULL AFTER attachment_url,
ADD COLUMN status ENUM('approved', 'pending', 'rejected') DEFAULT 'approved' AFTER attachment_name,
ADD COLUMN is_answered BOOLEAN DEFAULT FALSE AFTER status;

-- Add indexes for better performance
ALTER TABLE forum_threads
ADD INDEX idx_question_type (question_type),
ADD INDEX idx_status (status),
ADD INDEX idx_is_answered (is_answered);

-- Update existing threads to have approved status
UPDATE forum_threads SET status = 'approved' WHERE status IS NULL;

-- Success message
SELECT 'Forum schema updated successfully with new fields!' AS status;
