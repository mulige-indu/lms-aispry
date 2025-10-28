const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'digitmg_360_academy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Email sending function
async function sendThankYouEmail(to, name) {
  try {
    // Create transporter inside function
    const emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: '🎉 Thank You for Reserving Your Seat at 360DigiTMG!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d5842e 0%, #0a9ec7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #d5842e; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .highlight { color: #d5842e; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Welcome to 360DigiTMG!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name}! 👋</h2>
              <p>Thank you for reserving your seat for our <span class="highlight">FREE Live Class</span>!</p>

              <p>We're excited to have you join us. Here's what happens next:</p>

              <ul>
                <li>📧 You'll receive class details and joining link within 24 hours</li>
                <li>🎯 Our expert trainer will cover industry-relevant topics</li>
                <li>💡 You'll get hands-on experience with real-world projects</li>
                <li>🤝 Network with fellow learners and industry professionals</li>
              </ul>

              <p><strong>What to expect in the live class:</strong></p>
              <ul>
                <li>Introduction to Data Science & AI</li>
                <li>Career opportunities in tech</li>
                <li>Live Q&A session with industry experts</li>
                <li>Special course discounts for attendees</li>
              </ul>

              <p style="text-align: center;">
                <a href="https://www.360digitmg.com" class="button">Explore Our Courses</a>
              </p>

              <p>If you have any questions, feel free to reply to this email or contact us at <a href="mailto:info@360digitmg.com">info@360digitmg.com</a></p>

              <p>Looking forward to seeing you in the class!</p>

              <p><strong>Best regards,</strong><br>
              Team 360DigiTMG<br>
              🌐 <a href="https://www.360digitmg.com">www.360digitmg.com</a></p>
            </div>
            <div class="footer">
              <p>© 2025 360DigiTMG. All rights reserved.</p>
              <p>Empowering careers through industry-leading education.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await emailTransporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

// SMS sending function (supports multiple providers)
async function sendThankYouSMS(phone, name) {
  try {
    // Determine which SMS provider to use based on available API keys
    if (process.env.FAST2SMS_API_KEY && process.env.FAST2SMS_API_KEY !== 'your_api_key_here') {
      return await sendFast2SMS(phone, name);
    } else if (process.env.MSG91_API_KEY && process.env.MSG91_API_KEY !== 'your_api_key_here') {
      return await sendMSG91SMS(phone, name);
    } else if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID !== 'ACxxxxxxxxxxxxxxxxxxxxxxxxxx') {
      return await sendTwilioSMS(phone, name);
    } else {
      console.log('⚠️  No SMS provider configured. Skipping SMS.');
      return { success: false, error: 'No SMS provider configured' };
    }
  } catch (error) {
    console.error('❌ SMS sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Fast2SMS implementation (Popular in India, ₹0.10 per SMS)
async function sendFast2SMS(phone, name) {
  try {
    const message = `Hi ${name}! Thank you for reserving your seat at 360DigiTMG FREE Live Class. Check your email for details. - Team 360DigiTMG`;

    const response = await axios.post('https://www.fast2sms.com/dev/bulkV2', {
      route: 'v3',
      sender_id: '360DMG',
      message: message,
      language: 'english',
      flash: 0,
      numbers: phone
    }, {
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.return === true) {
      console.log('✅ SMS sent successfully via Fast2SMS');
      return { success: true, messageId: response.data.message_id };
    } else {
      console.error('❌ Fast2SMS error:', response.data.message);
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    console.error('❌ Fast2SMS sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// MSG91 implementation (Popular in India, ₹0.15 per SMS)
async function sendMSG91SMS(phone, name) {
  try {
    const message = `Hi ${name}! Thank you for reserving your seat at 360DigiTMG FREE Live Class. Check your email for details. - Team 360DigiTMG`;

    const response = await axios.get('https://api.msg91.com/api/v5/flow/', {
      params: {
        authkey: process.env.MSG91_API_KEY,
        mobile: phone,
        sender: process.env.MSG91_SENDER_ID || '360DMG',
        route: process.env.MSG91_ROUTE || '4',
        message: message
      }
    });

    if (response.data.type === 'success') {
      console.log('✅ SMS sent successfully via MSG91');
      return { success: true, messageId: response.data.message };
    } else {
      console.error('❌ MSG91 error:', response.data.message);
      return { success: false, error: response.data.message };
    }
  } catch (error) {
    console.error('❌ MSG91 sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Twilio implementation (International, ~$0.0079 per SMS)
async function sendTwilioSMS(phone, name) {
  try {
    const message = `Hi ${name}! Thank you for reserving your seat at 360DigiTMG FREE Live Class. Check your email for details. - Team 360DigiTMG`;

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      new URLSearchParams({
        From: fromNumber,
        To: phone,
        Body: message
      }),
      {
        auth: {
          username: accountSid,
          password: authToken
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.data.sid) {
      console.log('✅ SMS sent successfully via Twilio');
      return { success: true, messageId: response.data.sid };
    } else {
      console.error('❌ Twilio error:', response.data);
      return { success: false, error: 'Twilio SMS failed' };
    }
  } catch (error) {
    console.error('❌ Twilio sending failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Please ensure MySQL is running and database exists');
  }
}

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Get student from database
    const [students] = await pool.query(
      'SELECT * FROM students WHERE email = ?',
      [email]
    );

    if (students.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const student = students[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, student.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate simple token (for demo - use JWT in production)
    const token = Buffer.from(`${student.id}:${Date.now()}`).toString('base64');

    console.log('✅ Login successful for:', email);

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token: token,
        studentId: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Signup endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    console.log('Signup attempt for:', email);

    // Validate input
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if email already exists
    const [existing] = await pool.query(
      'SELECT id FROM students WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new student
    const [result] = await pool.query(
      'INSERT INTO students (firstName, lastName, email, password, phone) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, phone]
    );

    // Generate token
    const token = Buffer.from(`${result.insertId}:${Date.now()}`).toString('base64');

    console.log('✅ Signup successful for:', email);

    res.json({
      success: true,
      message: 'Signup successful',
      data: {
        token: token,
        studentId: result.insertId,
        firstName: firstName,
        lastName: lastName,
        email: email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE isActive = true ORDER BY category, name'
    );

    res.json({
      success: true,
      data: courses
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
});

// Get course by ID
app.get('/api/courses/:id', async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE id = ?',
      [req.params.id]
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: courses[0]
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
});

// Enroll in course
app.post('/api/courses/enroll/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Check if already enrolled
    const [existing] = await pool.query(
      'SELECT id FROM enrollments WHERE studentId = ? AND courseId = ?',
      [userId, courseId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create enrollment
    await pool.query(
      'INSERT INTO enrollments (studentId, courseId, status) VALUES (?, ?, ?)',
      [userId, courseId, 'active']
    );

    res.json({
      success: true,
      message: 'Successfully enrolled in course'
    });

  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enroll in course'
    });
  }
});

// Get student's enrolled courses
app.get('/api/courses/my-courses/:userId', async (req, res) => {
  try {
    const [courses] = await pool.query(
      `SELECT c.*, e.enrolledAt, e.status, e.progress
       FROM enrollments e
       JOIN courses c ON e.courseId = c.id
       WHERE e.studentId = ?
       ORDER BY e.enrolledAt DESC`,
      [req.params.userId]
    );

    res.json({
      success: true,
      data: courses
    });

  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrolled courses'
    });
  }
});

// Reserve seat endpoint (Book Free Live Class)
app.post('/api/reserve-seat', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    console.log('📝 Seat reservation attempt for:', email);

    // Validate input
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Save to database
    try {
      await pool.query(
        'INSERT INTO class_registrations (name, email, phone, registeredAt) VALUES (?, ?, ?, NOW())',
        [name, email, phone]
      );
      console.log('✅ Saved to database');
    } catch (dbError) {
      // If table doesn't exist, continue anyway but log the error
      console.warn('⚠️  Database save failed (table might not exist yet):', dbError.message);
    }

    // Send thank you email
    const emailResult = await sendThankYouEmail(email, name);

    // Send thank you SMS
    const smsResult = await sendThankYouSMS(phone, name);

    if (emailResult.success) {
      console.log('✅ Seat reserved successfully for:', email);
      res.json({
        success: true,
        message: 'Seat reserved successfully! Check your email and phone for confirmation.',
        data: {
          name,
          email,
          phone,
          emailSent: true,
          smsSent: smsResult.success
        }
      });
    } else {
      // Even if email fails, still return success for form submission
      res.json({
        success: true,
        message: 'Seat reserved successfully!',
        data: {
          name,
          email,
          phone,
          emailSent: false,
          emailError: emailResult.error,
          smsSent: smsResult.success,
          smsError: smsResult.success ? null : smsResult.error
        }
      });
    }

  } catch (error) {
    console.error('❌ Reserve seat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reserve seat. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log('\n========================================');
  console.log('  360DigiTMG Backend Server');
  console.log('========================================');
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(`API endpoints: http://localhost:${PORT}/api`);
  console.log('========================================\n');

  await testConnection();

  console.log('\nServer is ready! Press Ctrl+C to stop.\n');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...');
  await pool.end();
  process.exit(0);
});
