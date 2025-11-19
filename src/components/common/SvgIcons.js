import React from 'react';

// ==================== SOCIAL MEDIA ICONS ====================
export const FacebookIcon = ({ size = 24, color = "#1877F2" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill={color}/>
  </svg>
);

export const TwitterIcon = ({ size = 24, color = "#000000" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill={color}/>
  </svg>
);

export const InstagramIcon = ({ size = 24 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagram-gradient-${size})"/>
    <defs>
      <linearGradient id={`instagram-gradient-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FD5949"/>
        <stop offset="50%" stopColor="#D6249F"/>
        <stop offset="100%" stopColor="#285AEB"/>
      </linearGradient>
    </defs>
  </svg>
);

export const LinkedInIcon = ({ size = 24, color = "#0A66C2" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill={color}/>
  </svg>
);

export const YouTubeIcon = ({ size = 24, color = "#FF0000" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill={color}/>
  </svg>
);

// ==================== COURSE & EDUCATION ICONS ====================
export const DataScienceIcon = ({ size = 48 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#1e88e5"/>
    <circle cx="17" cy="17" r="1.5" fill="#26c6da"/>
    <circle cx="14" cy="14" r="1" fill="#26c6da"/>
    <circle cx="10" cy="11" r="1" fill="#26c6da"/>
  </svg>
);

export const AIIcon = ({ size = 48 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#7e57c2"/>
    <circle cx="8.5" cy="10.5" r="1.5" fill="#ab47bc"/>
    <circle cx="15.5" cy="10.5" r="1.5" fill="#ab47bc"/>
    <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#ab47bc"/>
    <path d="M11 6h2v4h-2z" fill="#ce93d8"/>
  </svg>
);

export const CloudIcon = ({ size = 48, color = "#29b6f6" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" fill={color}/>
    <path d="M8 13h2v4H8zm3-2h2v6h-2zm3 4h2v2h-2z" fill="#81d4fa"/>
  </svg>
);

export const DatabaseIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4.55c-1.3.95-3.58 1.55-6 1.55s-4.7-.6-6-1.55V9.64c1.47.83 3.61 1.36 6 1.36s4.53-.53 6-1.36v2.81zM12 9C8.13 9 6 7.5 6 7s2.13-2 6-2 6 1.5 6 2-2.13 2-6 2z" fill={color}/>
  </svg>
);

export const CodeIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill={color}/>
  </svg>
);

export const ChartIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill={color}/>
  </svg>
);

export const BrainIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M13 3C9.23 3 6.19 5.95 6 9.66l-1.92.58C2.01 10.79 0 13.51 0 16.66V21h6.5v-2H4v-2.34c0-1.77.98-3.37 2.5-4.08l1.5-.7v-2.23c.15-2.48 2.23-4.65 4.8-4.65S17.35 7.17 17.5 9.65v2.23l1.5.7c1.52.71 2.5 2.31 2.5 4.08V19h-2.5v2H25v-4.34c0-3.15-2.01-5.87-4.08-6.42l-1.92-.58C18.81 5.95 15.77 3 13 3zm0 2c2.06 0 3.91 1.31 4.5 3.22.11.33.37.58.7.65l2.15.65c1.43.43 2.48 1.78 2.57 3.33v.05c-.22-.03-.44-.05-.67-.05-1.4 0-2.68.71-3.42 1.86-.13.19-.3.34-.5.42l-.55.23-1-2.35L15 13c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5l1.78.01.95 2.23.58-.24c.21-.09.4-.23.54-.4.41-.6.87-1.04 1.4-1.32-.22 1.07-.93 1.99-1.9 2.46l-.85.4v1.86H10v-1.86l-.85-.4c-.97-.47-1.68-1.39-1.9-2.46.53.28.99.72 1.4 1.32.14.17.33.31.54.4l.58.24.95-2.23L12.5 16c.83 0 1.5-.67 1.5-1.5S13.33 13 12.5 13l-1.78.01-1-2.35-.55-.23c-.2-.08-.37-.23-.5-.42-.74-1.15-2.02-1.86-3.42-1.86-.23 0-.45.02-.67.05v-.05c.09-1.55 1.14-2.9 2.57-3.33l2.15-.65c.33-.07.59-.32.7-.65C9.09 6.31 10.94 5 13 5z" fill={color}/>
  </svg>
);

// ==================== GENERAL UI ICONS ====================
export const SearchIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color}/>
  </svg>
);

export const FilterIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill={color}/>
  </svg>
);

export const CalendarIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill={color}/>
  </svg>
);

export const ClockIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill={color}/>
  </svg>
);

export const BookIcon = ({ size = 24, color = "#5c6bc0" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill={color}/>
  </svg>
);

export const UserIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={color}/>
  </svg>
);

export const CheckIcon = ({ size = 24, color = "#4caf50" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color}/>
  </svg>
);

export const HeartIcon = ({ size = 24, color = "#e91e63" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color}/>
  </svg>
);

export const StarIcon = ({ size = 24, color = "#ffc107" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={color}/>
  </svg>
);

export const ArrowIcon = ({ size = 24, color = "currentColor", direction = "right" }) => {
  const rotations = { up: "270", right: "0", down: "90", left: "180" };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: `rotate(${rotations[direction]}deg)` }}>
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill={color}/>
    </svg>
  );
};

// ==================== NAVIGATION & ACTION ICONS ====================
export const MenuIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color}/>
  </svg>
);

export const CloseIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill={color}/>
  </svg>
);

export const SendIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill={color}/>
  </svg>
);

export const DownloadIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill={color}/>
  </svg>
);

export const EditIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill={color}/>
  </svg>
);

export const DeleteIcon = ({ size = 24, color = "#f44336" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill={color}/>
  </svg>
);

export const SettingsIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill={color}/>
  </svg>
);

// ==================== NAVBAR ICONS ====================
export const CoursesIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill={color}/>
  </svg>
);

export const ForumIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" fill={color}/>
  </svg>
);

export const SupportIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill={color}/>
  </svg>
);

export const BrowseIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color}/>
  </svg>
);

export const MyCoursesIcon = ({ size = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" fill={color}/>
  </svg>
);

// ==================== ADDITIONAL ICONS ====================
export const ShieldIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill={color}/>
  </svg>
);

export const ToolIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill={color}/>
  </svg>
);

export const AwardIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="8" r="7" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

export const UsersIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill={color}/>
  </svg>
);

export const BookOpenIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" fill={color}/>
  </svg>
);

export const TrendingUpIcon = ({ size = 24, color = "#667eea" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill={color}/>
  </svg>
);
