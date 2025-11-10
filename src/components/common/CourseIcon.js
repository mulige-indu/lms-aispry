// Dynamic Course Icon Component
// This renders SVG Icons based on icon name

import React from 'react';
import {
  DataScienceIcon, AIIcon, CloudIcon, DatabaseIcon, CodeIcon,
  ChartIcon, BrainIcon, BookIcon
} from './SvgIcons';
import './CourseIcon.css';

const CourseIcon = ({ iconName, size = 40, color = '#ffffff', className = '' }) => {
  // Map icon names to SVG components
  const iconMap = {
    DataScienceIcon,
    AIIcon,
    CloudIcon,
    DatabaseIcon,
    CodeIcon,
    ChartIcon,
    BrainIcon,
    BookIcon,
    // Fallback mappings for common names
    FaDatabase: DatabaseIcon,
    FaCode: CodeIcon,
    FaChart: ChartIcon,
    FaBrain: BrainIcon,
    FaCloud: CloudIcon,
    FaGraduationCap: BookIcon,
  };

  // Get the icon component from the map
  const Icon = iconMap[iconName] || BookIcon;

  return <Icon size={size} color={color} className={className} />;
};

export default CourseIcon;
