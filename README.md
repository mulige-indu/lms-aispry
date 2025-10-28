# 360DigiTMG Academy - Student Management System

A comprehensive full-stack application for managing student registration, authentication, and course enrollment with a modern React frontend and Node.js backend.

## 🚀 Features

- **Student Authentication**: Secure signup and login system with JWT tokens
- **Course Management**: Browse available courses and enroll in programs
- **Student Dashboard**: View enrolled courses and track progress
- **Modern UI**: Responsive design with modal-based authentication
- **Database Integration**: MySQL database with proper schema design
- **Secure Backend**: Password hashing, input validation, and API security

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** package manager
- **MySQL** (v5.7 or higher)
- **Git** (optional, for cloning)

## 🛠️ Installation & Setup

### 1. Clone the Repository (Optional)

```bash
git clone <repository-url>
cd 360digitmg1
```

### 2. Database Setup

#### Install MySQL
- Download and install MySQL from [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
- During installation, remember your root password

#### Create Database
1. Open MySQL Command Line or MySQL Workbench
2. Run the database schema:

```sql
-- Navigate to the database folder and run the schema
mysql -u root -p < database/schema.sql
```

Or manually execute the SQL commands from `database/schema.sql`

### 3. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
1. Copy the `.env` file and update the values:

```bash
cp .env .env.local
```

2. Edit the `.env` file with your actual database credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=360digitmg_academy
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

#### Start the Backend Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Frontend Setup

#### Install Dependencies
```bash
# Navigate back to the root directory
cd ..
npm install
```

#### Install Additional Required Packages
```bash
npm install react-router-dom react-icons
```

#### Start the Frontend Application
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 📁 Project Structure

```
360digitmg1/
├── database/
│   └── schema.sql              # Database schema and sample data
├── server/
│   ├── config/
│   │   └── database.js         # Database connection configuration
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js             # Authentication endpoints
│   │   └── courses.js          # Course management endpoints
│   ├── .env                    # Environment variables (template)
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server setup
├── src/
│   ├── components/
│   │   ├── LoginForm.js        # Login modal component
│   │   ├── SignupForm.js       # Registration modal component
│   │   └── CoursePage.js       # Course dashboard component
│   ├── Home.js                 # Main home page
│   ├── MainNavbar.js           # Navigation with auth integration
│   ├── App.js                  # Main App with routing
│   └── [other components]
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

## 🔧 API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup` - Register new student
- `POST /api/auth/login` - Login student
- `GET /api/auth/profile` - Get student profile (protected)
- `POST /api/auth/logout` - Logout student

### Course Endpoints
- `GET /api/courses` - Get all available courses
- `GET /api/courses/my-courses` - Get enrolled courses (protected)
- `POST /api/courses/enroll/:courseId` - Enroll in a course (protected)
- `GET /api/courses/:courseId` - Get course details

### Health Check
- `GET /api/health` - Server health check

## 💾 Database Schema

The system uses the following main tables:

### Students Table
Stores student information including:
- Personal details (name, email, phone, address)
- Academic background
- Authentication credentials (hashed passwords)
- Account status and login tracking

### Courses Table
Contains course information:
- Course details (name, description, duration)
- Pricing and difficulty levels
- Course codes and status

### Student Enrollments Table
Manages course enrollments:
- Student-course relationships
- Enrollment dates and status
- Progress tracking

## 🎯 Usage Guide

### For Students

1. **Registration**:
   - Click "Sign Up" in the navigation
   - Fill in the 2-step registration form
   - Verify email and complete profile

2. **Login**:
   - Click "Login" in the navigation
   - Enter email and password
   - Access your course dashboard

3. **Course Enrollment**:
   - Browse available courses
   - View course details and pricing
   - Enroll in desired courses
   - Track progress in "My Courses"

### For Administrators

1. **Database Management**:
   - Access MySQL directly or through phpMyAdmin
   - View student registrations and enrollments
   - Manage course offerings

2. **Server Monitoring**:
   - Check server logs for errors
   - Monitor API usage
   - Backup database regularly

## 🔒 Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using express-validator
- **CORS Protection**: Configured for specific client origins
- **SQL Injection Prevention**: Parameterized queries
- **Rate Limiting**: Built-in protection against abuse

## 🚀 Deployment

### Production Environment Variables

Update your `.env` file for production:

```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PASSWORD=your_secure_production_password
JWT_SECRET=your_very_secure_jwt_secret_minimum_32_characters
CLIENT_URL=https://yourdomain.com
```

### Build Frontend for Production

```bash
npm run build
```

### Start Production Server

```bash
cd server
npm start
```

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database `scaler_academy` exists

2. **CORS Errors**:
   - Verify `CLIENT_URL` in server `.env` matches frontend URL
   - Check if both servers are running

3. **JWT Token Issues**:
   - Clear browser localStorage
   - Check JWT_SECRET is consistent
   - Verify token hasn't expired

4. **Port Conflicts**:
   - Change PORT in server `.env` if 5000 is occupied
   - Update API URLs in frontend if backend port changes

### Debugging

1. **Enable Debug Mode**:
   ```bash
   cd server
   npm run dev
   ```

2. **Check Server Logs**:
   - Monitor console output for errors
   - Check database connection status

3. **Database Issues**:
   ```bash
   mysql -u root -p
   USE scaler_academy;
   SHOW TABLES;
   DESCRIBE students;
   ```

## 📝 Development Notes

### Adding New Features

1. **New API Endpoints**:
   - Add routes in `server/routes/`
   - Include authentication middleware if needed
   - Update this README with new endpoints

2. **Database Changes**:
   - Create migration scripts
   - Update schema.sql
   - Test with existing data

3. **Frontend Components**:
   - Follow existing component structure
   - Add CSS files for styling
   - Update routing in App.js

### Testing

- Test all authentication flows
- Verify database operations
- Check responsive design
- Test error handling

## 📞 Support

For technical support or questions:

1. Check the troubleshooting section above
2. Review server and browser console for errors
3. Verify all prerequisites are installed correctly
4. Ensure database is properly configured and running

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🎉 Success Indicators

If everything is set up correctly, you should see:

1. ✅ Frontend running on `http://localhost:3000`
2. ✅ Backend running on `http://localhost:5000`
3. ✅ Database connection successful message in server console
4. ✅ Login/Signup modals working
5. ✅ Course enrollment functionality operational
6. ✅ Student dashboard accessible after login

Happy coding! 🚀