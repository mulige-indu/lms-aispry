// Authentication service - Frontend only with mock data
class AuthService {

  // Mock user database
  getUsersDb() {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }

  saveUsersDb(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Login user
  async login(email, password) {
    try {
      // Clean the input data
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Get users from localStorage
      const users = this.getUsersDb();

      // Find user
      const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword);

      if (user) {
        // Create user object without password
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };

        // Generate mock token
        const token = 'mock-token-' + Date.now();
        this.storeAuthData(token, userData);

        return {
          success: true,
          user: userData,
          token: token,
          message: 'Login successful'
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }
    } catch (error) {
      console.error('AuthService: Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }

  // Register user
  async signup(userData) {
    try {
      const cleanEmail = userData.email.trim().toLowerCase();

      // Get users from localStorage
      const users = this.getUsersDb();

      // Check if user already exists
      if (users.find(u => u.email.toLowerCase() === cleanEmail)) {
        return {
          success: false,
          message: 'Email already registered'
        };
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: cleanEmail,
        password: userData.password,
        phone: userData.phone || '',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      this.saveUsersDb(users);

      // Create user object without password
      const userDataClean = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      };

      // Generate mock token
      const token = 'mock-token-' + Date.now();
      this.storeAuthData(token, userDataClean);

      return {
        success: true,
        user: userDataClean,
        token: token,
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('AuthService: Signup error:', error);
      return {
        success: false,
        message: 'An error occurred during signup'
      };
    }
  }

  // Store authentication data
  storeAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('student', JSON.stringify(user));
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
  }

  // Redirect to courses page
  redirectToCourses() {
    window.location.href = '/courses';
  }
}

export default new AuthService();