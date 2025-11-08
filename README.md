# 360DigiTMG Academy - Learning Management System

A modern React-based Learning Management System (LMS) with a responsive UI for browsing courses, managing enrollments, and participating in discussion forums.

## Features

- **Course Browsing**: Explore available courses with detailed information
- **My Courses**: Track enrolled courses and progress
- **Discussion Forums**: Engage with peers and instructors
- **Modern UI**: Responsive design with smooth animations
- **Local Storage**: Client-side data persistence

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

## Installation & Setup

### 1. Clone the Repository (Optional)

```bash
git clone <repository-url>
cd LMS-aispry
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

The application will open in your browser at `http://localhost:3001`

## Available Scripts

- `npm start` - Starts the development server
- `npm run dev` - Starts the development server (alias)
- `npm run build` - Builds the app for production

## Project Structure

```
LMS-aispry/
├── src/
│   ├── components/
│   │   ├── home/              # Home page components
│   │   ├── courses/           # Course browsing and management
│   │   ├── navbar/            # Navigation components
│   │   └── footer/            # Footer components
│   ├── services/
│   │   ├── authService.js     # Authentication logic
│   │   └── forumService.js    # Forum functionality
│   ├── config.js              # App configuration
│   └── index.js               # Application entry point
├── public/
│   └── index.html             # HTML template
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Features Overview

### Course Management
- Browse available courses with detailed descriptions
- View course pricing and duration
- Track enrolled courses
- Responsive course cards with hover effects

### Discussion Forums
- Browse discussion categories
- Create and reply to threads
- Like and bookmark posts
- Search and filter discussions

### User Interface
- Modern, responsive design
- Smooth animations and transitions
- Mobile-friendly navigation
- Accessible components

## Technology Stack

- **React** 18.3.1 - UI library
- **React Router** 6.26.2 - Client-side routing
- **React Icons** 4.11.0 - Icon library
- **Axios** 1.12.2 - HTTP client
- **Webpack** 5.88.0 - Module bundler

## Development

### Local Storage

The application uses browser localStorage for:
- User authentication state
- Course enrollment data
- Forum posts and interactions
- User preferences

### Adding New Features

1. **New Components**:
   - Create component files in appropriate directories
   - Follow existing component structure
   - Add corresponding CSS for styling

2. **Routing**:
   - Update routing configuration in App.js
   - Add navigation links in navbar components

3. **Services**:
   - Add service methods in `src/services/`
   - Use localStorage for data persistence

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Port 3001 Already in Use**:
   - Stop the process using port 3001
   - Or modify the port in webpack.config.js

2. **Module Not Found Errors**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Build Errors**:
   - Clear webpack cache: `rm -rf node_modules/.cache`
   - Reinstall dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**360DigiTMG Academy** - Empowering learners with modern technology education
