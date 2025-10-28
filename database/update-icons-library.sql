-- Update Course Icons to Use React Icons Library
-- This will use icon names from react-icons that you can render in React

USE digitmg_360_academy;

-- Data Science Courses
UPDATE courses SET icon = 'FaChartLine' WHERE id = 1;  -- Data Science with Python
UPDATE courses SET icon = 'FaBrain' WHERE id = 2;      -- Advanced Data Science & ML
UPDATE courses SET icon = 'FaBook' WHERE id = 3;       -- Data Science Fundamentals
UPDATE courses SET icon = 'FaBriefcase' WHERE id = 4;  -- Applied Data Science
UPDATE courses SET icon = 'FaChartBar' WHERE id = 5;   -- Data Science with R

-- Artificial Intelligence Courses
UPDATE courses SET icon = 'FaRobot' WHERE id = 6;      -- AI & Deep Learning
UPDATE courses SET icon = 'FaLightbulb' WHERE id = 7;  -- AI Fundamentals
UPDATE courses SET icon = 'FaEye' WHERE id = 8;        -- Computer Vision
UPDATE courses SET icon = 'FaComments' WHERE id = 9;   -- NLP
UPDATE courses SET icon = 'FaCog' WHERE id = 10;       -- AI for Business
UPDATE courses SET icon = 'FaMagic' WHERE id = 11;     -- Generative AI & LLMs

-- Analytics Courses
UPDATE courses SET icon = 'FaChartPie' WHERE id = 12;  -- Business Analytics
UPDATE courses SET icon = 'FaTable' WHERE id = 13;     -- Data Analytics
UPDATE courses SET icon = 'FaChartArea' WHERE id = 14; -- Advanced Analytics
UPDATE courses SET icon = 'FaBullhorn' WHERE id = 15;  -- Marketing Analytics
UPDATE courses SET icon = 'FaDollarSign' WHERE id = 16; -- Financial Analytics
UPDATE courses SET icon = 'FaSearchPlus' WHERE id = 17; -- Web Analytics

-- Cloud & DevOps Courses
UPDATE courses SET icon = 'FaCloud' WHERE id = 18;     -- Cloud Computing
UPDATE courses SET icon = 'FaAws' WHERE id = 19;       -- AWS Solutions
UPDATE courses SET icon = 'FaMicrosoft' WHERE id = 20; -- Azure Cloud
UPDATE courses SET icon = 'FaTools' WHERE id = 21;     -- DevOps Engineering
UPDATE courses SET icon = 'FaGoogle' WHERE id = 22;    -- Google Cloud
UPDATE courses SET icon = 'FaShip' WHERE id = 23;      -- Kubernetes

-- Programming Courses
UPDATE courses SET icon = 'FaPython' WHERE id = 24;    -- Full Stack Python
UPDATE courses SET icon = 'FaJava' WHERE id = 25;      -- Java Full Stack
UPDATE courses SET icon = 'FaReact' WHERE id = 26;     -- JavaScript & React
UPDATE courses SET icon = 'FaCode' WHERE id = 27;      -- Python for Beginners
UPDATE courses SET icon = 'FaNodeJs' WHERE id = 28;    -- MERN Stack
UPDATE courses SET icon = 'FaCodeBranch' WHERE id = 29; -- C++ Programming
UPDATE courses SET icon = 'FaWindows' WHERE id = 30;   -- .NET Core
UPDATE courses SET icon = 'FaMobileAlt' WHERE id = 31; -- Flutter

-- Security Courses
UPDATE courses SET icon = 'FaShieldAlt' WHERE id = 32; -- Cyber Security
UPDATE courses SET icon = 'FaUserSecret' WHERE id = 33; -- Ethical Hacking
UPDATE courses SET icon = 'FaNetworkWired' WHERE id = 34; -- Network Security
UPDATE courses SET icon = 'FaLock' WHERE id = 35;      -- Cloud Security
UPDATE courses SET icon = 'FaFileCode' WHERE id = 36;  -- Application Security
UPDATE courses SET icon = 'FaClipboardCheck' WHERE id = 37; -- Info Security

-- Data Engineering Courses
UPDATE courses SET icon = 'FaDatabase' WHERE id = 38;  -- Data Engineering
UPDATE courses SET icon = 'FaServer' WHERE id = 39;    -- Big Data & Hadoop
UPDATE courses SET icon = 'FaBolt' WHERE id = 40;      -- Apache Spark
UPDATE courses SET icon = 'FaProjectDiagram' WHERE id = 41; -- Data Pipeline
UPDATE courses SET icon = 'FaSnowflake' WHERE id = 42; -- Snowflake
UPDATE courses SET icon = 'FaStream' WHERE id = 43;    -- Real-time Streaming

-- Marketing Courses
UPDATE courses SET icon = 'FaBullseye' WHERE id = 44;  -- Digital Marketing
UPDATE courses SET icon = 'FaInstagram' WHERE id = 45; -- Social Media
UPDATE courses SET icon = 'FaAdversal' WHERE id = 46;  -- Performance Marketing
UPDATE courses SET icon = 'FaPencilAlt' WHERE id = 47; -- Content Marketing
UPDATE courses SET icon = 'FaEnvelope' WHERE id = 48;  -- Email Marketing
UPDATE courses SET icon = 'FaRocket' WHERE id = 49;    -- Growth Hacking

-- Blockchain Courses
UPDATE courses SET icon = 'FaLink' WHERE id = 50;      -- Blockchain Fundamentals
UPDATE courses SET icon = 'FaEthereum' WHERE id = 51;  -- Ethereum & Smart Contracts
UPDATE courses SET icon = 'FaBitcoin' WHERE id = 52;   -- Cryptocurrency Trading
UPDATE courses SET icon = 'FaBuilding' WHERE id = 53;  -- Blockchain for Enterprise
UPDATE courses SET icon = 'FaPalette' WHERE id = 54;   -- NFT Development
UPDATE courses SET icon = 'FaUniversity' WHERE id = 55; -- DeFi Development

SELECT 'Icons updated successfully!' AS message;
SELECT COUNT(*) AS total_courses_updated FROM courses;
