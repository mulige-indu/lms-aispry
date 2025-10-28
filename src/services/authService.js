// Authentication service for Spring Boot API integration
const API_BASE_URL = 'http://localhost:8080/api';

class AuthService {

  // Login user
  async login(email, password) {
    try {
      // Clean the input data
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      console.log('AuthService: Attempting login for', cleanEmail);
      console.log('AuthService: Password length:', cleanPassword.length);
      console.log('AuthService: Password characters:', cleanPassword.split('').map(c => c.charCodeAt(0)));

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
      });

      console.log('AuthService: Response status:', response.status);

      const data = await response.json();
      console.log('AuthService: Response data:', data);

      if (response.ok && data.success) {
        // Store authentication data
        const user = {
          id: data.data.studentId,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        };
        this.storeAuthData(data.data.token, user);
        return {
          success: true,
          user: user,
          token: data.data.token,
          message: data.message
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('AuthService: Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Register user
  async signup(userData) {
    try {
      console.log('AuthService: Attempting signup for', userData.email);

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      console.log('AuthService: Signup response status:', response.status);

      const data = await response.json();
      console.log('AuthService: Signup response data:', data);

      if (response.ok && data.success) {
        // Store authentication data
        this.storeAuthData(data.data.token, {
          id: data.data.studentId,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        });
        return {
          success: true,
          user: data.data,
          token: data.data.token,
          message: data.message
        };
      } else {
        return {
          success: false,
          message: data.message || 'Signup failed'
        };
      }
    } catch (error) {
      console.error('AuthService: Signup error:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection.'
      };
    }
  }

  // Store authentication data
  storeAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('student', JSON.stringify(user));
    console.log('AuthService: Stored auth data for user:', user.firstName);
  }

  // Get stored user
  getUser() {
    const userStr = localStorage.getItem('student');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.getToken() !== null && this.getUser() !== null;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    console.log('AuthService: User logged out');
  }

  // Redirect to courses page
  redirectToCourses() {
    window.location.href = '/courses';
  }
}

export default new AuthService();