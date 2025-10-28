// Dynamic Course Icon Component
// This renders React Icons based on icon name from database

import React from 'react';
import * as FaIcons from 'react-icons/fa';
import './CourseIcon.css';

const CourseIcon = ({ iconName, size = 40, color = '#ffffff', className = '' }) => {
  // Get the icon component from react-icons/fa
  const Icon = FaIcons[iconName];

  // Fallback to default icon if not found
  if (!Icon) {
    return <FaIcons.FaGraduationCap size={size} color={color} className={className} />;
  }

  return <Icon size={size} color={color} className={className} />;
};

export default CourseIcon;
